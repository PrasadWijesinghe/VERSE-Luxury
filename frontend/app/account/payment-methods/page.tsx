export const metadata = {
  title: "Payment Methods | VERSE",
};

function PaymentCard({
  brand,
  last4,
  name,
  expiry,
  badge,
}: {
  brand: string;
  last4: string;
  name: string;
  expiry: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-stone-100 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-stone-900">{brand}</div>
            <div className="text-xs text-stone-400">•••• {last4}</div>
            {badge ? (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-900">
                {badge}
              </span>
            ) : null}
          </div>
          <div className="mt-2 text-xs text-stone-600">Cardholder: {name}</div>
          <div className="mt-1 text-xs text-stone-600">Expires: {expiry}</div>
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
          Remove
        </button>
      </div>
    </div>
  );
}

export default function PaymentMethodsPage() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl text-stone-900">Payment Methods</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your saved payment methods
          </p>
        </div>

        <button
          type="button"
          className="rounded-md bg-amber-200/70 px-4 py-2 text-xs text-stone-900 hover:bg-amber-200 transition"
        >
          + Add New Card
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <PaymentCard
          brand="Visa"
          last4="4242"
          name="Sophia Chen"
          expiry="12/2026"
          badge="Default"
        />
        <PaymentCard
          brand="Mastercard"
          last4="8888"
          name="Sophia Chen"
          expiry="08/2025"
        />
        <PaymentCard brand="Amex" last4="1005" name="Sophia Chen" expiry="03/2027" />
      </div>
    </div>
  );
}
