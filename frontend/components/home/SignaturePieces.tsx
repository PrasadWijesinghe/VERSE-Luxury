import Image from "next/image";
import Link from "next/link";

import { products, type Product } from "@/data/products";

type Piece = {
  key: string;
  tag: string;
  image: string;
  href: string;
  layout: "tall" | "wide";
  title?: string;
  price?: string;
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

const signatureIds = [22, 21, 20] as const;

function isProduct(p: Product | undefined): p is Product {
  return Boolean(p);
}

const pieces: Piece[] = signatureIds
  .map((id) => products.find((p) => p.id === id))
  .filter(isProduct)
  .map((p, idx) => {
    const href = `/product/${p.id}`;
    const tag = p.tag ?? p.category;
    const image = p.images?.[0] ?? "/images/hero/Home.png";

    return {
      key: String(p.id),
      tag,
      image,
      href,
      layout: idx === 2 ? "tall" : "wide",
      title: p.name,
      price: formatPrice(p.price, p.currency),
    } satisfies Piece;
  });

export default function SignaturePieces() {
  const tall = pieces.find((p) => p.layout === "tall")!;
  const wide = pieces.filter((p) => p.layout === "wide");

  return (
    <section id="collections" className="scroll-mt-16 bg-stone-50 text-stone-950">
      <div id="signature" className="scroll-mt-16" />
      <div className="container-lux py-16 sm:py-20">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-stone-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-stone-500">
                Curated Selection
              </span>
            </div>

            <h2 className="mt-6 text-4xl sm:text-6xl leading-none">
              <span className="block font-serif">Signature</span>
              <span className="block font-serif italic">Pieces</span>
            </h2>
          </div>

          <a
            href="/collections"
            className="mt-2 hidden sm:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-stone-500 hover:text-stone-900 transition"
          >
            View all pieces <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
          <Link
            href={tall.href}
            className="group relative overflow-hidden bg-black lg:col-span-1 lg:row-span-2 min-h-130 rounded-sm"
          >
            <Image
              src={tall.image}
              alt={tall.tag}
              fill
              quality={100}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-[1.02] transition duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
            <div className="absolute top-5 left-5">
              <span className="inline-flex bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-white/85">
                {tall.tag}
              </span>
            </div>
          </Link>

          {wide.map((p, idx) => (
            <Link
              key={p.key}
              href={p.href}
              className={[
                "group relative overflow-hidden bg-black rounded-sm",
                "lg:col-span-2",
                idx === 0 ? "lg:row-span-1 min-h-60" : "lg:row-span-1 min-h-60",
              ].join(" ")}
            >
              <Image
                src={p.image}
                alt={p.tag}
                fill
                quality={100}
                sizes="(min-width: 1024px) 67vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/0" />

              <div className="absolute top-5 left-5">
                <span className="inline-flex bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-white/85">
                  {p.tag}
                </span>
              </div>

              {p.title && (
                <div className="absolute left-6 bottom-6">
                  <div className="font-serif text-xl sm:text-2xl text-white/95">
                    {p.title}
                  </div>
                  {p.price && (
                    <div className="mt-2 text-sm text-white/80">{p.price}</div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/collections"
          className="mt-10 inline-flex sm:hidden items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-stone-500 hover:text-stone-900 transition"
        >
          View all pieces <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
