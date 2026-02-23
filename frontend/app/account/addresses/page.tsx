export const metadata = {
  title: "Saved Addresses | VERSE",
};

function AddressCard({
  title,
  badge,
  lines,
}: {
  title: string;
  badge?: string;
  lines: string[];
}) {
  return (
    <div className="rounded-xl border border-stone-100 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-stone-900">{title}</div>
            {badge ? (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-900">
                {badge}
              </span>
            ) : null}
          </div>
          <div className="mt-2 space-y-1 text-xs text-stone-600">
            {lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-md border border-red-200 bg-white px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AddressesPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl text-stone-900">Saved Addresses</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
          className="rounded-md bg-amber-200/70 px-4 py-2 text-xs text-stone-900 hover:bg-amber-200 transition"
        >
          + Add New Address
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressCard
          title="Home"
          badge="Default"
          lines={[
            "Sophia Chen",
            "2847 Park Avenue",
            "Apt 128",
            "New York, NY 10016",
            "United States",
            "Phone: +1 (555) 234-5678",
          ]}
        />
        <AddressCard
          title="Office"
          lines={[
            "Sophia Chen",
            "450 Lexington Avenue",
            "Floor 28",
            "New York, NY 10107",
            "United States",
            "Phone: +1 (555) 234-5678",
          ]}
        />
        <AddressCard
          title="Parents House"
          lines={[
            "Sophia Chen",
            "1523 Maple Street",
            "San Francisco, CA 94102",
            "United States",
            "Phone: +1 (555) 876-5432",
          ]}
        />
      </div>
    </div>
  );
}
