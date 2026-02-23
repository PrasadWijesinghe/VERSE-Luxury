"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { products } from "@/data/products";
import { useCartLines } from "./useCart";

type Address = {
  title: string;
  badge?: string;
  lines: string[];
};

const addresses: Address[] = [
  {
    title: "Shipping Address",
    badge: "Default",
    lines: [
      "Sophia Chen",
      "2847 Park Avenue, Apt 128",
      "New York, NY 10016",
      "United States",
      "Phone: +1 (555) 234-5678",
    ],
  },
  {
    title: "Billing Address",
    lines: [
      "Sophia Chen",
      "450 Lexington Avenue, Floor 28",
      "New York, NY 10107",
      "United States",
    ],
  },
];

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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-stone-600">{label}</span>
      <span className="text-stone-900">{value}</span>
    </div>
  );
}

export default function CheckoutClient() {
  const router = useRouter();
  const lines = useCartLines();

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

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <section className="container-lux py-10 sm:py-12">
        <div className="rounded-xl border border-stone-100 bg-white p-8 text-center">
          <div className="text-sm text-stone-700">Your bag is empty.</div>
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
            Checkout
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif">Order Summary</h1>
          <p className="mt-2 text-sm text-stone-500">
            Review your order and delivery details
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/bag")}
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          Close
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          {/* Order */}
          <div className="rounded-xl border border-stone-100 bg-white p-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Items
            </div>

            <div className="mt-5 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="relative h-20 w-14 shrink-0 overflow-hidden bg-black/5">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-stone-900">{product.name}</div>
                        <div className="mt-1 text-xs text-stone-500">
                          Qty: {quantity}
                        </div>
                      </div>
                      <div className="text-sm text-amber-800">
                        {formatMoney(product.price * quantity, product.currency)}
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-stone-500">
                      {formatMoney(product.price, product.currency)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="rounded-xl border border-stone-100 bg-white p-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Addresses
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((a) => (
                <div key={a.title} className="rounded-xl border border-stone-100 p-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-stone-900">{a.title}</div>
                    {a.badge ? (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-900">
                        {a.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-stone-600">
                    {a.lines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="rounded-xl border border-stone-100 bg-white p-5 h-fit">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Summary
          </div>

          <div className="mt-5 space-y-3">
            <SummaryRow label="Subtotal" value={formatMoney(subtotal, currency)} />
            <SummaryRow label="Shipping" value="—" />
          </div>

          <div className="mt-5 h-px bg-stone-200" />

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-stone-700">Total</span>
            <span className="text-lg text-amber-800">
              {formatMoney(subtotal, currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => router.push("/checkout/pay")}
            className="mt-6 w-full rounded-md bg-black px-5 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
          >
            Proceed to Pay
          </button>
        </aside>
      </div>
    </section>
  );
}
