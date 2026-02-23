"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/data/products";
import { cartActions } from "@/components/cart/useCart";

function formatPrice(price: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price}`;
  }
}

function labelize(key: string) {
  const spaced = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-2">
      <div className="text-amber-700 text-sm" aria-label={`Rating ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden>
            {i < full ? "★" : "☆"}
          </span>
        ))}
      </div>
      <span className="text-xs text-stone-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const images = product.images ?? [];
  const [activeImage, setActiveImage] = useState(images[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const detailsEntries = useMemo(() => {
    const entries = Object.entries(product.details ?? {}) as Array<
      [string, string | undefined]
    >;
    return entries.filter(([, v]) => typeof v === "string" && v.length > 0) as Array<
      [string, string]
    >;
  }, [product.details]);

  const dimensionEntries = useMemo(() => {
    const entries = Object.entries(product.dimensions ?? {}) as Array<
      [string, string | undefined]
    >;
    return entries.filter(([, v]) => typeof v === "string" && v.length > 0) as Array<
      [string, string]
    >;
  }, [product.dimensions]);

  return (
    <div className="bg-stone-50 text-stone-950">
      <section className="container-lux py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[96px_1fr_420px]">
          {/* Thumbnails */}
          <div className="order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">
              {images.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={[
                    "relative h-20 w-16 shrink-0 overflow-hidden border transition",
                    src === activeImage
                      ? "border-stone-900"
                      : "border-stone-200 hover:border-stone-400",
                  ].join(" ")}
                  aria-label="Select product image"
                >
                  <Image src={src} alt={product.name} fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Main image */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full overflow-hidden bg-black/5 aspect-4/5">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-sm text-stone-500">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Purchase panel */}
          <aside className="order-3">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              {product.category}
              {product.tag ? ` • ${product.tag}` : ""}
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl leading-tight">
              <span className="font-serif">{product.name}</span>
            </h1>

            <div className="mt-4 flex items-end justify-between gap-6">
              <div className="text-lg text-amber-700">
                {formatPrice(product.price, product.currency)}
              </div>
              <div className="text-right">
                <Stars rating={product.rating ?? 0} />
                <div className="mt-1 text-xs text-stone-500">
                  {product.reviewsCount ?? 0} reviews
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {/* Color */}
              {product.colors?.length ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-stone-600">
                      Color
                    </div>
                    <div className="text-xs text-stone-500">{selectedColor}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={[
                          "px-3 py-2 border text-xs transition",
                          c === selectedColor
                            ? "border-stone-900 text-stone-900"
                            : "border-stone-200 text-stone-600 hover:border-stone-400",
                        ].join(" ")}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Size */}
              {product.sizes?.length ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-stone-600">
                      Size
                    </div>
                    <div className="text-xs text-stone-500">{selectedSize}</div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={[
                          "py-2 border text-xs transition",
                          s === selectedSize
                            ? "border-stone-900 text-stone-900"
                            : "border-stone-200 text-stone-600 hover:border-stone-400",
                        ].join(" ")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Quantity */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-stone-600">
                  Quantity
                </div>
                <div className="mt-3 inline-flex items-center border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    className="h-10 w-10 grid place-items-center text-stone-700 hover:bg-stone-100 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => cartActions.addToCart(product.id, quantity)}
                  className="h-12 bg-black text-white text-xs uppercase tracking-[0.35em] hover:bg-black/90 transition"
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  className="h-12 border border-stone-300 text-xs uppercase tracking-[0.35em] text-stone-700 hover:border-stone-500 transition"
                >
                  Wishlist
                </button>
              </div>

              <div className="text-xs text-stone-500 leading-relaxed">
                <div>SKU: {product.sku}</div>
                <div className="mt-1">In stock: {product.stock}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Description + info */}
      <section className="bg-stone-100/60 border-y border-stone-200">
        <div className="container-lux py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                About the piece
              </div>
              <p className="mt-6 text-base text-stone-700 leading-relaxed">
                {product.description?.trim()}
              </p>

              {product.care?.length ? (
                <div className="mt-8">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                    Care
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-stone-600">
                    {product.care.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                Technical details
              </div>
              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {detailsEntries.map(([k, v]) => (
                  <div key={k} className="border-b border-stone-200 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-stone-500">
                      {labelize(k)}
                    </dt>
                    <dd className="mt-2 text-sm text-stone-700">{v}</dd>
                  </div>
                ))}

                {dimensionEntries.map(([k, v]) => (
                  <div key={k} className="border-b border-stone-200 pb-4">
                    <dt className="text-xs uppercase tracking-[0.25em] text-stone-500">
                      {labelize(k)}
                    </dt>
                    <dd className="mt-2 text-sm text-stone-700">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* The Look */}
      <section className="container-lux py-16">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Styling
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl font-serif">The Look</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.slice(0, 5).map((src) => (
            <div key={src} className="relative aspect-4/5 overflow-hidden bg-black/5">
              <Image src={src} alt={product.name} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* You may also like */}
      <section className="bg-stone-50">
        <div className="container-lux py-16">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Discover more
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-serif">You May Also Like</h2>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group block">
                <div className="relative aspect-4/5 overflow-hidden bg-black/5">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover group-hover:scale-[1.02] transition duration-700"
                  />
                  {p.tag ? (
                    <span className="absolute top-4 left-4 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.4em] text-white/85">
                      {p.tag}
                    </span>
                  ) : null}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-stone-900">{p.name}</div>
                  <div className="mt-2 text-sm text-amber-700">
                    {formatPrice(p.price, p.currency)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
