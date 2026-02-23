"use client";

import Image from "next/image";

import { products } from "@/data/products";
import { cartActions } from "@/components/cart/useCart";

export default function WishlistClient() {
  const items = products.slice(0, 8);

  return (
    <div>
      <h1 className="text-xl text-stone-900">My Wishlist</h1>
      <p className="mt-1 text-sm text-stone-500">Your saved favorites</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p, index) => {
          const outOfStock = index === 2;
          return (
            <div
              key={p.id}
              className="rounded-xl border border-stone-100 bg-white overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-stone-50">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                <button
                  type="button"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 transition"
                  aria-label="Remove"
                >
                  ×
                </button>

                {outOfStock ? (
                  <div className="absolute inset-0 grid place-items-center bg-black/30">
                    <span className="rounded-full bg-white px-3 py-1 text-xs text-stone-800">
                      Out of Stock
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="p-3">
                <div className="text-sm text-stone-900 line-clamp-1">{p.name}</div>
                <div className="mt-1 text-xs text-amber-800">${p.price.toFixed(0)}</div>

                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    if (!outOfStock) cartActions.addToCart(p.id, 1);
                  }}
                  className={[
                    "mt-3 w-full rounded-md px-3 py-2 text-xs transition",
                    outOfStock
                      ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                      : "bg-amber-200/70 text-stone-900 hover:bg-amber-200",
                  ].join(" ")}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
