"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { products } from "@/data/products";
import { AUTH_TOKEN_KEY, useAuthSession } from "@/components/account/session";
import { useCartLines } from "./useCart";
import LoginRequiredPopup from "./LoginRequiredPopup";

type UserAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function addressToLines(address: UserAddress): string[] {
  const cityLine = [address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(", ")
    .replace(", ,", ",")
    .trim();

  const lines = [
    address.fullName,
    address.line1,
    address.line2,
    cityLine,
    address.country,
    address.phone ? `Phone: ${address.phone}` : null,
  ].filter(Boolean) as string[];

  return lines;
}

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-stone-600">{label}</span>
      <span className="text-stone-900">{value}</span>
    </div>
  );
}

export default function CheckoutClient() {
  const router = useRouter();
  const lines = useCartLines();
  const { authed, user } = useAuthSession();
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const [address, setAddress] = useState<UserAddress | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState(false);

  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!authed || !user) return;

    (async () => {
      setAddressLoading(true);
      setAddressError(null);

      try {
        const token = getTokenFromStorage();
        if (!token) {
          setAddress(null);
          setEditingAddress(true);
          setFullName(`${user.firstName} ${user.lastName}`.trim());
          return;
        }

        const res = await fetch(`${API_BASE}/api/users/me/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = (await res.json()) as { address?: UserAddress | null; message?: string };
        if (!res.ok) {
          throw new Error(data.message || "Failed to load address");
        }

        if (cancelled) return;

        const a = data.address ?? null;
        setAddress(a);
        if (a) {
          setEditingAddress(false);
          setFullName(a.fullName);
          setLine1(a.line1);
          setLine2(a.line2 ?? "");
          setCity(a.city);
          setState(a.state ?? "");
          setPostalCode(a.postalCode);
          setCountry(a.country);
          setPhone(a.phone ?? "");
        } else {
          setEditingAddress(true);
          setFullName(`${user.firstName} ${user.lastName}`.trim());
        }
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Failed to load address";
        setAddressError(msg);
        setAddress(null);
        setEditingAddress(true);
        setFullName(`${user.firstName} ${user.lastName}`.trim());
      } finally {
        if (!cancelled) setAddressLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authed, user]);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        if (!product) return null;
        return { product, quantity: line.quantity };
      })
      .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>;
  }, [lines]);

  const currency = items[0]?.product.currency ?? "USD";

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }, [items]);

  if (!authed || !user) {
    return (
      <section className="container-lux py-10 sm:py-12">
        <LoginRequiredPopup
          open
          onSignIn={() => router.push("/sign-in")}
          onBackToBag={() => router.push("/bag")}
        />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-lux py-10 sm:py-12">
        <div className="rounded-xl border border-stone-100 bg-white p-8 text-center">
          <div className="text-sm text-stone-700">Your bag is empty.</div>
          <button
            type="button"
            onClick={() => router.push("/bag")}
            className="mt-5 rounded-md border border-stone-200 bg-white px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 transition"
          >
            Back to Bag
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-lux py-10 sm:py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Checkout
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-serif">Order Summary</h1>
          <p className="mt-2 text-sm text-stone-500">
            Review your order and delivery details
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/bag")}
          className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
        >
          <span aria-hidden>←</span>
          Back to Bag
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          {/* Order */}
          <div className="rounded-xl border border-stone-100 bg-white p-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Items
            </div>

            <div className="mt-5 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="relative h-20 w-14 shrink-0 overflow-hidden bg-black/5">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-stone-900">{product.name}</div>
                        <div className="mt-1 text-xs text-stone-500">
                          Qty: {quantity}
                        </div>
                      </div>
                      <div className="text-sm text-amber-800">
                        {formatMoney(product.price * quantity, product.currency)}
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-stone-500">
                      {formatMoney(product.price, product.currency)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="rounded-xl border border-stone-100 bg-white p-5">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Addresses
            </div>

            <div className="mt-5">
              {addressLoading ? (
                <div className="text-sm text-stone-600">Loading address…</div>
              ) : null}

              {addressError ? (
                <div className="mt-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {addressError}
                </div>
              ) : null}

              {address && !editingAddress ? (
                <div className="rounded-xl border border-stone-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-stone-900">Shipping Address</div>
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-900">
                        Default
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingAddress(true)}
                      className="rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-stone-600">
                    {addressToLines(address).map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-stone-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-stone-900">Shipping Address</div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="checkout_fullName"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Full name
                      </label>
                      <input
                        id="checkout_fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="checkout_line1"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Address line 1
                      </label>
                      <input
                        id="checkout_line1"
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="checkout_line2"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Address line 2 (optional)
                      </label>
                      <input
                        id="checkout_line2"
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout_city"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        City
                      </label>
                      <input
                        id="checkout_city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout_state"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        State (optional)
                      </label>
                      <input
                        id="checkout_state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout_postalCode"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Postal code
                      </label>
                      <input
                        id="checkout_postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout_country"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Country
                      </label>
                      <input
                        id="checkout_country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="checkout_phone"
                        className="block text-[11px] tracking-[0.28em] uppercase text-stone-500"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="checkout_phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      disabled={savingAddress}
                      onClick={async () => {
                        if (savingAddress) return;
                        setSavingAddress(true);
                        setAddressError(null);

                        try {
                          const token = getTokenFromStorage();
                          if (!token) {
                            throw new Error("Missing auth token. Please sign in again.");
                          }

                          const payload: UserAddress = {
                            fullName: fullName.trim(),
                            line1: line1.trim(),
                            line2: line2.trim() || undefined,
                            city: city.trim(),
                            state: state.trim() || undefined,
                            postalCode: postalCode.trim(),
                            country: country.trim(),
                            phone: phone.trim() || undefined,
                          };

                          const res = await fetch(`${API_BASE}/api/users/me/address`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ address: payload }),
                          });

                          const data = (await res.json()) as {
                            address?: UserAddress | null;
                            message?: string;
                          };

                          if (!res.ok) {
                            throw new Error(data.message || "Failed to save address");
                          }

                          const saved = data.address ?? null;
                          setAddress(saved);
                          setEditingAddress(false);
                        } catch (e) {
                          const msg = e instanceof Error ? e.message : "Failed to save address";
                          setAddressError(msg);
                        } finally {
                          setSavingAddress(false);
                        }
                      }}
                      className={[
                        "w-full sm:w-auto rounded-md px-5 py-3 text-xs tracking-[0.35em] uppercase transition",
                        savingAddress
                          ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                          : "bg-black text-white hover:bg-black/90",
                      ].join(" ")}
                    >
                      {savingAddress ? "Saving..." : "Save Address"}
                    </button>

                    {address ? (
                      <button
                        type="button"
                        onClick={() => setEditingAddress(false)}
                        className="w-full sm:w-auto rounded-md border border-stone-200 bg-white px-5 py-3 text-xs tracking-[0.35em] uppercase text-stone-700 hover:bg-stone-50 transition"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="rounded-xl border border-stone-100 bg-white p-5 h-fit">
          <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
            Summary
          </div>

          <div className="mt-5 space-y-3">
            <SummaryRow label="Subtotal" value={formatMoney(subtotal, currency)} />
            <SummaryRow label="Shipping" value="—" />
          </div>

          <div className="mt-5 h-px bg-stone-200" />

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-stone-700">Total</span>
            <span className="text-lg text-amber-800">
              {formatMoney(subtotal, currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!authed || !user) {
                setLoginPopupOpen(true);
                return;
              }
              router.push("/checkout/pay");
            }}
            className="mt-6 w-full rounded-md bg-black px-5 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
          >
            Proceed to Pay
          </button>
        </aside>
      </div>

      <LoginRequiredPopup
        open={loginPopupOpen}
        onSignIn={() => {
          setLoginPopupOpen(false);
          router.push("/sign-in");
        }}
        onBackToBag={() => {
          setLoginPopupOpen(false);
          router.push("/bag");
        }}
      />
    </section>
  );
}
