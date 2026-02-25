"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { products } from "@/data/products";
import { useAuthSession } from "@/components/account/session";
import { readCart, setCart } from "@/components/cart/cartStore";
import { useCartLines } from "./useCart";
import LoginRequiredPopup from "./LoginRequiredPopup";

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

type StripeConfigResponse = {
  configured?: boolean;
  publishableKey?: string | null;
  error?: string;
};

function CardCheckoutForm(props: {
  items: Array<{ productId: number; quantity: number }>;
  customerEmail: string;
  customerName: string;
  totalLabel: string;
  onSuccess: (paymentIntentId?: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPay = async () => {
    if (processing) return;
    setProcessing(true);
    setError(null);

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe is still loading. Please try again.");
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        throw new Error("Card input not ready.");
      }

      const intentRes = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items: props.items,
          customerEmail: props.customerEmail,
          customerName: props.customerName,
        }),
      });

      const intentData = (await intentRes.json()) as {
        clientSecret?: string | null;
        error?: string;
      };

      if (!intentRes.ok) {
        throw new Error(intentData.error || "Failed to start payment");
      }

      const clientSecret = intentData.clientSecret;
      if (!clientSecret) {
        throw new Error("Missing client secret");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: props.customerName,
            email: props.customerEmail,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }

      if (result.paymentIntent?.status !== "succeeded") {
        throw new Error("Payment not completed");
      }

      props.onSuccess(result.paymentIntent.id);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Payment failed";
      setError(message);
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
        Card Details
      </div>

      <div className="mt-5 text-sm text-stone-600">
        Your card is processed securely by Stripe. If required, Stripe will prompt
        for card authentication (3D Secure / SCA) without leaving this site.
      </div>

      {error ? (
        <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-6 rounded-lg border border-stone-200 bg-white px-4 py-3">
        <CardElement
          options={{
            hidePostalCode: true,
          }}
        />
      </div>

      <button
        type="button"
        onClick={onPay}
        disabled={processing || !stripe || !elements}
        className={[
          "mt-6 w-full rounded-md px-5 py-3 text-xs tracking-[0.35em] uppercase transition",
          processing || !stripe || !elements
            ? "bg-stone-200 text-stone-500 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/90",
        ].join(" ")}
      >
        {processing ? "Processing..." : `Pay ${props.totalLabel}`}
      </button>
    </>
  );
}

export default function PayClient() {
  const router = useRouter();
  const lines = useCartLines();
  const { authed, user } = useAuthSession();
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/stripe/config", { cache: "no-store" });
        const data = (await res.json()) as StripeConfigResponse;

        const key = (data.publishableKey || "").trim();
        if (!key) {
          if (!cancelled) {
            setPublishableKey(null);
            setConfigError(data.error || "Stripe is not configured.");
          }
          return;
        }

        if (!cancelled) {
          setPublishableKey(key);
          setConfigError(null);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load Stripe config";
        if (!cancelled) {
          setPublishableKey(null);
          setConfigError(message);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        if (!product) return null;
        return { product, quantity: line.quantity };
      })
      .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>;
  }, [lines]);

  const currency = items[0]?.product.currency ?? "USD";

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }, [items]);

  const totalLabel = formatMoney(total, currency);
  const stripePromise = useMemo(() => {
    return publishableKey ? loadStripe(publishableKey) : null;
  }, [publishableKey]);

  if (!authed || !user) {
    return (
      <section className="container-lux py-10 sm:py-12">
        <LoginRequiredPopup
          open
          onSignIn={() => router.push("/sign-in")}
          onBackToBag={() => router.push("/bag")}
        />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-lux py-10 sm:py-12">
        <div className="rounded-xl border border-stone-100 bg-white p-8 text-center">
          <div className="text-sm text-stone-700">No items to pay for.</div>
          <button
            type="button"
            onClick={() => router.push("/bag")}
            className="mt-5 rounded-md border border-stone-200 bg-white px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 transition"
          >
            Back to Bag
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-lux py-10 sm:py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Payment
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif">Proceed to Pay</h1>
          <p className="mt-2 text-sm text-stone-500">
            Enter your payment details to complete the order
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          <span aria-hidden>←</span>
          Back to Checkout
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-xl border border-stone-100 bg-white p-6">
          {!stripePromise ? (
            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {configError || "Stripe is not configured."}
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <CardCheckoutForm
                items={lines}
                customerEmail={user.email}
                customerName={`${user.firstName} ${user.lastName}`.trim()}
                totalLabel={totalLabel}
                onSuccess={(paymentIntentId) => {
                  setCart([]);
                  readCart();
                  const qp = paymentIntentId
                    ? `?payment_intent=${encodeURIComponent(paymentIntentId)}`
                    : "";
                  router.push(`/checkout/success${qp}`);
                }}
              />
            </Elements>
          )}
        </div>

        <aside className="rounded-xl border border-stone-100 bg-white p-5 h-fit">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Total
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-stone-700">Amount</span>
            <span className="text-lg text-amber-800">{formatMoney(total, currency)}</span>
          </div>

          <div className="mt-6 text-xs text-stone-500">
            Complete payment in the form.
          </div>
        </aside>
      </div>
    </section>
  );
}
