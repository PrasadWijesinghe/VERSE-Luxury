"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { getInitials } from "./mockUser";
import { clearAuthSession, useAuthSession } from "./session";

const navItems = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Wishlist", href: "/account/wishlist" },
  { label: "Payment Methods", href: "/account/payment-methods" },
  { label: "Personal Information", href: "/account/personal-info" },
] as const;

export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { authed, user } = useAuthSession();

  useEffect(() => {
    if (!authed) {
      router.replace("/sign-in");
      return;
    }
    if (authed && !user) {
      clearAuthSession();
      router.replace("/sign-in");
    }
  }, [authed, user, router]);

  const initials = useMemo(
    () => getInitials(user?.firstName ?? "", user?.lastName ?? ""),
    [user?.firstName, user?.lastName]
  );

  const onLogout = () => {
    clearAuthSession();
    router.replace("/sign-in");
  };

  if (!authed || !user) {
    // Keep markup consistent between SSR and first client render
    return <main className="min-h-screen bg-stone-50" />;
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="container-lux py-8">
        <Link
          href="/"
          className="inline-block font-semibold tracking-[0.28em] text-stone-900"
        >
          VERSE
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="rounded-xl bg-white border border-stone-100 p-5">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-amber-200/70 text-stone-900 flex items-center justify-center font-medium">
                {initials}
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium text-stone-900">
                    {user.firstName} {user.lastName}
                </div>
                  <div className="text-xs text-stone-500">{user.email}</div>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-[11px] text-amber-900">
                  Member
              </div>
            </div>

            <nav className="mt-6 space-y-1 text-sm">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "block rounded-lg px-3 py-2 transition",
                      active
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={onLogout}
                className="w-full text-left rounded-lg px-3 py-2 transition text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              >
                Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <section className="rounded-xl bg-white border border-stone-100 p-6">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
