"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { products } from "@/data/products";
import { readCart, setCart } from "./cartStore";
import { useCartLines } from "./useCart";

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

export default function PayClient() {
  const router = useRouter();
  const lines = useCartLines();
  const [processing, setProcessing] = useState(false);

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

  const onPayNow = async () => {
    if (processing) return;
    setProcessing(true);

    // simulate a successful payment
    setCart([]);

    // In case other tabs/windows are open
    readCart();

    router.push("/account/orders");
  };

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
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          Close
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-xl border border-stone-100 bg-white p-6">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Card Details
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Cardholder name
              </label>
              <input
                placeholder="Sophia Chen"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Card number
              </label>
              <input
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                  Expiry
                </label>
                <input
                  placeholder="MM/YY"
                  className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                  CVV
                </label>
                <input
                  inputMode="numeric"
                  placeholder="123"
                  className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-stone-100 bg-white p-5 h-fit">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Total
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-stone-700">Amount</span>
            <span className="text-lg text-amber-800">{formatMoney(total, currency)}</span>
          </div>

          <button
            type="button"
            onClick={onPayNow}
            disabled={processing}
            className={[
              "mt-6 w-full rounded-md px-5 py-3 text-xs tracking-[0.35em] uppercase transition",
              processing
                ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-black/90",
            ].join(" ")}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </aside>
      </div>
    </section>
  );
}
