import { notFound } from "next/navigation";

import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { products } from "@/data/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isFinite(id)) notFound();

  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <ProductDetailClient product={product} related={related} />
        <Footer />
      </div>
    </main>
  );
}
