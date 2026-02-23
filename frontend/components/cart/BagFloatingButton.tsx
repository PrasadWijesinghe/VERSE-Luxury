"use client";

import Link from "next/link";

import { useCartCount } from "./useCart";

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7 9V7a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 9h12l-1.1 12H7.1L6 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BagFloatingButton() {
  const count = useCartCount();
  if (count <= 0) return null;

  return (
    <Link
      href="/bag"
      className="fixed right-5 bottom-5 z-[60] h-12 w-12 rounded-full bg-black text-white shadow-sm grid place-items-center hover:bg-black/90 transition"
      aria-label="Open bag"
    >
      <BagIcon className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-amber-200 text-stone-900 text-[11px] grid place-items-center">
        {count > 99 ? "99+" : count}
      </span>
    </Link>
  );
}
