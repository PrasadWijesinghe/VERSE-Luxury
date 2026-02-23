import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { products } from "@/data/products";

const PER_PAGE = 12;

type CategoryKey = "all" | "dresses" | "outerwear" | "knitwear" | "accessories";

const categories: Array<{ key: CategoryKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "dresses", label: "Dresses" },
  { key: "outerwear", label: "Outerwear" },
  { key: "knitwear", label: "Knitwear" },
  { key: "accessories", label: "Accessories" },
];

function categoryToProductCategories(key: CategoryKey): string[] | "__all__" {
  switch (key) {
    case "all":
      return "__all__";
    case "dresses":
      return ["Dresses"];
    case "outerwear":
      return ["Outerwear"];
    case "knitwear":
      return ["Knitwear"];
    case "accessories":
      return ["Accessories", "Bags", "Jewelry", "Shoes"];
  }
}

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

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category } = await searchParams;

  const activeCategory = (String(category ?? "all").toLowerCase() as CategoryKey) || "all";
  const knownCategory = categories.some((c) => c.key === activeCategory)
    ? activeCategory
    : "all";

  const categoryFilter = categoryToProductCategories(knownCategory);
  const filtered =
    categoryFilter === "__all__"
      ? products
      : products.filter((p) => categoryFilter.includes(p.category));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = clamp(Number(page ?? 1) || 1, 1, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  const makeHref = (nextPage: number) => {
    const q = new URLSearchParams();
    if (knownCategory !== "all") q.set("category", knownCategory);
    if (nextPage > 1) q.set("page", String(nextPage));
    const qs = q.toString();
    return qs ? `/collections?${qs}` : "/collections";
  };

  return (
    <main className="min-h-screen bg-white text-stone-950">
      <Navbar />
      <div className="pt-16">
        {/* Category strip */}
        <div className="border-b border-stone-200 bg-white">
          <div className="container-lux py-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((c) => {
                const isActive = c.key === knownCategory;
                const href =
                  c.key === "all" ? "/collections" : `/collections?category=${c.key}`;

                return (
                  <Link
                    key={c.key}
                    href={href}
                    className={[
                      "shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.35em] border transition",
                      isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400",
                    ].join(" ")}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </div>

            <div className="shrink-0 inline-flex items-center gap-3 border border-stone-200 px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                Sort:
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-900">
                Featured
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="container-lux py-10 sm:py-12">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            {filtered.length} pieces
          </div>

          {pageItems.length === 0 ? (
            <div className="mt-10 text-sm text-stone-600">No products found.</div>
          ) : (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {pageItems.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-4/5 overflow-hidden bg-black/5">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover group-hover:scale-[1.02] transition duration-700"
                    />
                    {p.tag ? (
                      <span className="absolute top-4 left-4 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.4em] text-white/85">
                        {p.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                      {p.category}
                    </div>
                    <div className="mt-2 text-sm text-stone-900">{p.name}</div>
                    <div className="mt-2 text-sm text-amber-700">
                      {formatPrice(p.price, p.currency)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <Link
              href={makeHref(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={[
                "px-4 py-2 border text-[10px] uppercase tracking-[0.35em] transition",
                currentPage <= 1
                  ? "pointer-events-none border-stone-200 text-stone-300"
                  : "border-stone-300 text-stone-700 hover:border-stone-500",
              ].join(" ")}
            >
              Prev
            </Link>

            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Page {currentPage} of {totalPages}
            </div>

            <Link
              href={makeHref(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              className={[
                "px-4 py-2 border text-[10px] uppercase tracking-[0.35em] transition",
                currentPage >= totalPages
                  ? "pointer-events-none border-stone-200 text-stone-300"
                  : "border-stone-300 text-stone-700 hover:border-stone-500",
              ].join(" ")}
            >
              Next
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
