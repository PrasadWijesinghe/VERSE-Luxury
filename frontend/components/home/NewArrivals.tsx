"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

import { products as allProducts } from "@/data/products";

type Arrival = {
  id: number;
  name: string;
  price: string;
  tag?: string;
  image: string;
};

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

export default function NewArrivals() {
  const products: Arrival[] = useMemo(() => {
    return allProducts.slice(0, 8).map((p) => ({
      id: p.id,
      name: p.name,
      price: formatPrice(p.price, p.currency),
      tag: p.tag,
      image: p.images[0],
    }));
  }, []);

  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByOne = (direction: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;

    const cardWidth = el.querySelector<HTMLElement>("[data-arrival-card]")
      ?.offsetWidth;
    const gap = 24;
    const delta = (cardWidth ?? el.clientWidth) + gap;

    el.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });
  };

  return (
    <section id="new" className="scroll-mt-16 bg-stone-50 text-stone-950">
      <div className="container-lux py-16 sm:py-20">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-stone-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-stone-500">
                Just Arrived
              </span>
            </div>

            <h2 className="mt-6 text-4xl sm:text-6xl leading-none">
              <span className="block font-serif">New</span>
              <span className="block font-serif italic">Arrivals</span>
            </h2>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByOne("left")}
              className="h-10 w-10 grid place-items-center border border-stone-300 text-stone-700 hover:bg-stone-100 transition"
              aria-label="Scroll left"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByOne("right")}
              className="h-10 w-10 grid place-items-center border border-stone-300 text-stone-700 hover:bg-stone-100 transition"
              aria-label="Scroll right"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-12 flex gap-6 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
        >
          {products.map((p) => (
            <article
              key={p.id}
              data-arrival-card
              className="shrink-0 w-72 sm:w-80 lg:w-96"
            >
              <Link href={`/product/${p.id}`} className="group block">
                <div className="relative h-96 w-full overflow-hidden bg-black">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    quality={100}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
                    className="object-cover group-hover:scale-[1.02] transition duration-700"
                  />
                  {p.tag && (
                    <span className="absolute top-5 left-5 bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-white/85">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <div className="text-sm text-stone-900">{p.name}</div>
                  <div className="mt-2 text-sm text-amber-700">{p.price}</div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}