"use client";

import { useRouter } from "next/navigation";
import { setIsAuthed } from "../account/session";

export default function AuthPrimaryButton({
  label,
}: {
  label: string;
}) {
  const router = useRouter();

  const onClick = () => {
    // Temporary client-side session until real auth is wired
    setIsAuthed(true);
    router.push("/account");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-md bg-black px-4 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
    >
      {label}
    </button>
  );
}
