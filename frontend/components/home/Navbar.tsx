"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Collections", href: "/#collections" },
  { label: "Signature", href: "/#signature" },
  { label: "New Arrivals", href: "/#new" },
  { label: "About", href: "/#about" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition",
        scrolled
          ? "bg-black/70 backdrop-blur border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="container-lux h-16 flex items-center">
        {/* Brand */}
        <Link href="/" className="font-semibold tracking-[0.28em]">
          VERSE
        </Link>

        {/* Links */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-6 sm:gap-10 text-[10px] tracking-[0.35em] text-white/70 uppercase whitespace-nowrap overflow-x-auto">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-white transition"
            >
              {n.label}
            </Link>
          ))}
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center">
          <button className="rounded-full bg-white text-black px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-white/90 transition">
            Sign in
          </button>
        </div>
      </nav>
    </header>
  );
}