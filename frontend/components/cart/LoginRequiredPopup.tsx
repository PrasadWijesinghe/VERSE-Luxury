"use client";

type Props = {
  open: boolean;
  onSignIn: () => void;
  onBackToBag: () => void;
};

export default function LoginRequiredPopup({ open, onSignIn, onBackToBag }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-black/60 px-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
          Checkout
        </div>
        <h2 className="mt-3 text-xl text-stone-900">Sign in required</h2>
        <p className="mt-2 text-sm text-stone-500">
          Please sign in to checkout your items.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onSignIn}
            className="flex-1 rounded-md bg-black px-4 py-2.5 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={onBackToBag}
            className="flex-1 rounded-md border border-stone-200 bg-white px-4 py-2.5 text-xs tracking-[0.35em] uppercase text-stone-700 hover:bg-stone-50 transition"
          >
            Back to bag
          </button>
        </div>
      </div>
    </div>
  );
}
