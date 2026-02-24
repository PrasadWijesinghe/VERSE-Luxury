"use client";

import Link from "next/link";
import { useAuthSession } from "./session";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-2 text-xl text-stone-900">{value}</div>
    </div>
  );
}

export default function AccountOverviewClient() {
  const { user } = useAuthSession();
  const firstName = user?.firstName ?? null;
  const email = user?.email ?? null;

  return (
    <div>
      <h1 className="text-xl text-stone-900">
        Welcome back{firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Manage your account and explore your fashion journey
      </p>

      {email ? (
        <p className="mt-3 text-xs text-stone-500">Signed in as {email}</p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value="0" />
        <StatCard label="Wishlist Items" value="0" />
        <StatCard label="Saved Addresses" value="0" />
        <StatCard label="Reward Points" value="0" />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-sm tracking-[0.25em] uppercase text-stone-700">
          Recent Orders
        </h2>
        <Link href="/account/orders" className="text-xs text-stone-500 hover:text-stone-900">
          View All Orders →
        </Link>
      </div>

      <div className="mt-4 rounded-xl border border-stone-100 bg-stone-50 p-4 text-sm text-stone-600">
        No recent orders found for this account yet.
      </div>
    </div>
  );
}
