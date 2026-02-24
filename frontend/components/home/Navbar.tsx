"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getInitials } from "../account/mockUser";
import { clearAuthSession, useAuthSession } from "../account/session";

const nav = [
  { label: "Signature", href: "/#signature" },
  { label: "New Arrivals", href: "/#new" },
  { label: "About", href: "/#about" },
  { label: "Newsletter", href: "/#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authed, user } = useAuthSession();
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isHome = pathname === "/";
  const isOpaque = scrolled || !isHome;

  const initials = useMemo(
    () => getInitials(user?.firstName ?? "", user?.lastName ?? ""),
    [user?.firstName, user?.lastName]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      const el = menuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const onLogout = () => {
    clearAuthSession();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition",
        isOpaque
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
          {authed && user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="h-10 w-10 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition flex items-center justify-center"
                aria-haspopup="menu"
                aria-label="Account menu"
              >
                {initials}
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-44 rounded-xl border border-white/10 bg-black/80 backdrop-blur p-2"
                >
                  <Link
                    role="menuitem"
                    href="/account"
                    className="block rounded-lg px-3 py-2 text-xs tracking-[0.18em] uppercase text-white/80 hover:text-white hover:bg-white/10 transition"
                  >
                    Account
                  </Link>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={onLogout}
                    className="w-full text-left rounded-lg px-3 py-2 text-xs tracking-[0.18em] uppercase text-white/80 hover:text-white hover:bg-white/10 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full bg-white text-black px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-white/90 transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}