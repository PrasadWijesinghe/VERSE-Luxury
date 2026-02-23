export const metadata = {
  title: "My Orders | VERSE",
};

function OrderCard({
  id,
  placed,
  status,
  statusTone,
  total,
  items,
}: {
  id: string;
  placed: string;
  status: string;
  statusTone: "emerald" | "sky";
  total: string;
  items: Array<{ name: string; qty: number; price: string }>;
}) {
  const toneClass =
    statusTone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-sky-50 text-sky-700";

  return (
    <div className="rounded-xl border border-stone-100 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-stone-900">Order {id}</div>
          <div className="mt-1 text-xs text-stone-500">Placed on {placed}</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <div key={item.name} className="rounded-lg bg-stone-50 p-3">
                <div className="text-sm text-stone-800">{item.name}</div>
                <div className="mt-1 text-xs text-stone-500">
                  Quantity: {item.qty}
                </div>
                <div className="mt-1 text-xs text-amber-800">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-stone-500">Total: {total}</div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={["rounded-full px-3 py-1 text-[11px]", toneClass].join(" ")}>
            {status}
          </span>
          <button
            type="button"
            className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
          >
            View Details
          </button>
          <button
            type="button"
            className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 hover:bg-amber-100/60 transition"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-xl text-stone-900">My Orders</h1>
      <p className="mt-1 text-sm text-stone-500">Track and manage your orders</p>

      <div className="mt-6 space-y-4">
        <OrderCard
          id="ORD-2024-1847"
          placed="January 15, 2024"
          status="Delivered"
          statusTone="emerald"
          total="$3570"
          items={[
            { name: "Silk Evening Gown", qty: 1, price: "$2890" },
            { name: "Pearl Drop Earrings", qty: 1, price: "$680" },
          ]}
        />

        <OrderCard
          id="ORD-2024-1823"
          placed="January 8, 2024"
          status="In Transit"
          statusTone="sky"
          total="$3200"
          items={[{ name: "Cashmere Coat", qty: 1, price: "$3200" }]}
        />

        <OrderCard
          id="ORD-2024-1789"
          placed="December 28, 2023"
          status="Delivered"
          statusTone="emerald"
          total="$1850"
          items={[{ name: "Leather Handbag", qty: 1, price: "$1850" }]}
        />
      </div>
    </div>
  );
}
