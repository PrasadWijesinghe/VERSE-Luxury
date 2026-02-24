"use client";

import { useAuthSession } from "./session";

export default function AccountWelcomeClient() {
  const { user } = useAuthSession();
  const firstName = user?.firstName ?? null;

  return (
    <h1 className="text-xl text-stone-900">
      Welcome back{firstName ? `, ${firstName}` : ""}
    </h1>
  );
}
