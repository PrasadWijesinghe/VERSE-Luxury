"use client";

import { useRouter } from "next/navigation";

export default function CheckoutSuccessClient() {
  const router = useRouter();

  return (
    <section className="container-lux py-10 sm:py-12">
      <div className="rounded-xl border border-stone-100 bg-white p-8 text-center">
        <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
          Order
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-serif">Order Confirmed</h1>
        <p className="mt-2 text-sm text-stone-600">
          Your order has been placed successfully. We're preparing it for you.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/collections")}
            className="w-full sm:w-auto rounded-md bg-black px-5 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto rounded-md border border-stone-200 bg-white px-5 py-3 text-xs tracking-[0.35em] uppercase text-stone-700 hover:bg-stone-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
