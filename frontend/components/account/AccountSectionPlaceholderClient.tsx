"use client";

import { useAuthSession } from "./session";

type Props = {
  title: string;
  subtitle: string;
  emptyMessage: string;
};

export default function AccountSectionPlaceholderClient({
  title,
  subtitle,
  emptyMessage,
}: Props) {
  const { user } = useAuthSession();
  const name = user ? `${user.firstName} ${user.lastName}`.trim() : null;
  const email = user?.email ?? null;

  return (
    <div>
      <h1 className="text-xl text-stone-900">{title}</h1>
      <p className="mt-1 text-sm text-stone-500">{subtitle}</p>

      {email ? (
        <p className="mt-4 text-xs text-stone-500">
          Signed in as {name ? `${name} · ` : ""}
          {email}
        </p>
      ) : null}

      <div className="mt-6 rounded-xl border border-stone-100 bg-stone-50 p-4 text-sm text-stone-600">
        {emptyMessage}
      </div>
    </div>
  );
}
