import Link from "next/link";
import { mockUser } from "@/components/account/mockUser";

export const metadata = {
  title: "Account Overview | VERSE",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-2 text-xl text-stone-900">{value}</div>
    </div>
  );
}

export default function AccountOverviewPage() {
  return (
    <div>
      <h1 className="text-xl text-stone-900">
        Welcome back, {mockUser.firstName}
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Manage your account and explore your fashion journey
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={String(mockUser.stats.orders)} />
        <StatCard
          label="Wishlist Items"
          value={String(mockUser.stats.wishlistItems)}
        />
        <StatCard
          label="Saved Addresses"
          value={String(mockUser.stats.savedAddresses)}
        />
        <StatCard
          label="Reward Points"
          value={String(mockUser.stats.rewardPoints)}
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-sm tracking-[0.25em] uppercase text-stone-700">
          Recent Orders
        </h2>
        <Link href="/account/orders" className="text-xs text-stone-500 hover:text-stone-900">
          View All Orders →
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-stone-100 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-stone-900">Order ORD-2024-1847</div>
              <div className="mt-1 text-xs text-stone-500">January 15, 2024</div>
              <div className="mt-3 text-sm text-stone-700">
                Silk Evening Gown <span className="text-stone-400">· Qty 1</span>
              </div>
              <div className="mt-1 text-sm text-stone-700">
                Pearl Drop Earrings <span className="text-stone-400">· Qty 1</span>
              </div>
              <div className="mt-3 text-xs text-stone-500">Total: $3570</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] text-emerald-700">
                Delivered
              </span>
              <Link href="/account/orders" className="text-xs text-stone-500 hover:text-stone-900">
                Track Order →
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-stone-900">Order ORD-2024-1823</div>
              <div className="mt-1 text-xs text-stone-500">January 8, 2024</div>
              <div className="mt-3 text-sm text-stone-700">
                Cashmere Coat <span className="text-stone-400">· Qty 1</span>
              </div>
              <div className="mt-3 text-xs text-stone-500">Total: $3200</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] text-sky-700">
                In Transit
              </span>
              <Link href="/account/orders" className="text-xs text-stone-500 hover:text-stone-900">
                Track Order →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
