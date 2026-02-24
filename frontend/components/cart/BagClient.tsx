"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { products } from "@/data/products";
import { useAuthSession } from "@/components/account/session";
import { LAST_COLLECTIONS_URL_KEY } from "@/components/RouteTracker";
import { cartActions, useCartLines } from "./useCart";
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

export default function BagClient() {
  const router = useRouter();
  const lines = useCartLines();
  const { authed, user } = useAuthSession();
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        if (!product) return null;
        return { product, quantity: line.quantity };
      })
      .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>;
  }, [lines]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }, [items]);

  const currency = items[0]?.product.currency ?? "USD";

  return (
    <section className="container-lux py-10 sm:py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Shopping Bag
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif">Your Bag</h1>
          <p className="mt-2 text-sm text-stone-500">
            {items.length} item{items.length === 1 ? "" : "s"} in your bag
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            try {
              const href = window.sessionStorage.getItem(LAST_COLLECTIONS_URL_KEY);
              router.push(href || "/collections");
            } catch {
              router.push("/collections");
            }
          }}
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          Close
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-stone-100 bg-white p-8 text-center">
          <div className="text-sm text-stone-700">Your bag is empty.</div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => {
              return (
                <div
                  key={product.id}
                  className="rounded-xl border border-stone-100 bg-white p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-black/5">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm text-stone-900">{product.name}</div>
                          <div className="mt-2 text-xs text-stone-500">
                            {formatMoney(product.price, product.currency)}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => cartActions.removeFromCart(product.id)}
                          className="h-8 w-8 rounded-md border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                          aria-label="Remove item"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center border border-stone-200">
                          <button
                            type="button"
                            onClick={() =>
                              cartActions.updateQuantity(product.id, Math.max(1, quantity - 1))
                            }
                            className="h-10 w-10 grid place-items-center text-stone-700 hover:bg-stone-100 transition"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <div className="h-10 w-12 grid place-items-center text-sm text-stone-900">
                            {quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              cartActions.updateQuantity(product.id, Math.min(99, quantity + 1))
                            }
                            className="h-10 w-10 grid place-items-center text-stone-700 hover:bg-stone-100 transition"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm text-amber-800">
                          {formatMoney(product.price * quantity, product.currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="rounded-xl border border-stone-100 bg-white p-5 h-fit">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Summary
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="text-stone-900">{formatMoney(subtotal, currency)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-stone-600">Shipping</span>
              <span className="text-stone-900">—</span>
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
              onClick={() => {
                if (!authed || !user) {
                  setLoginPopupOpen(true);
                  return;
                }
                router.push("/checkout");
              }}
              className="mt-6 w-full rounded-md bg-black px-5 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}

      <LoginRequiredPopup
        open={loginPopupOpen}
        onSignIn={() => {
          setLoginPopupOpen(false);
          router.push("/sign-in");
        }}
        onBackToBag={() => setLoginPopupOpen(false)}
      />
    </section>
  );
}
