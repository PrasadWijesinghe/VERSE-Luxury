"use client";

export default function AuthPrimaryButton({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-md bg-black px-4 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
    >
      {label}
    </button>
  );
}
