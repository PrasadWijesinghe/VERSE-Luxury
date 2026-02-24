"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import AuthPrimaryButton from "@/components/auth/AuthPrimaryButton";
import { setAuthSession } from "@/components/account/session";

type LoginResponse = {
  user: { id: string; firstName: string; lastName: string; email: string };
  token: string | null;
};

const loginImageSrc = "/images/Login/SignUP_IN.png";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignInClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as LoginResponse & { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Login failed");
        return;
      }

      setAuthSession({ token: data.token ?? null, user: data.user });
      router.push("/");
    } catch {
      setError("Network error. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 lg:grid lg:grid-cols-2 lg:h-screen lg:overflow-hidden">
      {/* Visual panel */}
      <section className="relative hidden lg:block lg:h-screen">
        <Image
          src={loginImageSrc}
          alt="VERSE editorial"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

        <div className="absolute inset-x-0 top-0 p-8 flex items-center justify-between text-white">
          <Link href="/" className="font-semibold tracking-[0.28em]">
            VERSE
          </Link>
          <Link
            href="/"
            className="text-[10px] tracking-[0.35em] uppercase text-white/80 hover:text-white transition"
          >
            &larr; Back to store
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-10">
          <p className="text-white text-4xl leading-tight">
            <span className="block font-medium">Where Elegance</span>
            <span className="block text-amber-200">Meets You</span>
          </p>
          <p className="mt-4 max-w-md text-white/80 text-sm leading-relaxed">
            Join the world of VERSE. Unlock exclusive collections, personalized
            styling, and members-only privileges.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-[11px] text-white/70">
            <span className="tracking-[0.28em] uppercase">Exclusive access</span>
            <span className="tracking-[0.28em] uppercase">VIP benefits</span>
            <span className="tracking-[0.28em] uppercase">Welcome gift</span>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:h-screen lg:overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link href="/" className="font-semibold tracking-[0.28em]">
              VERSE
            </Link>
            <Link
              href="/"
              className="text-[10px] tracking-[0.35em] uppercase text-stone-500 hover:text-stone-900 transition"
            >
              &larr; Back to store
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-xs tracking-[0.25em] uppercase">
            <span className="text-stone-900">Sign in</span>
            <Link
              href="/sign-up"
              className="text-stone-400 hover:text-stone-900 transition"
            >
              Create account
            </Link>
          </div>
          <div className="mt-2 h-px w-full bg-stone-200" />

          <h1 className="mt-10 text-2xl text-stone-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-stone-500">
            Sign in to access your account, wishlist, and exclusive offers.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-stone-600">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-stone-300"
                />
                Remember me
              </label>
              <a href="#" className="text-stone-500 hover:text-stone-900">
                Forgot password?
              </a>
            </div>

            {error ? <p className="text-sm text-stone-600">{error}</p> : null}

            <AuthPrimaryButton label={submitting ? "Signing in..." : "Sign in"} disabled={submitting} />

            <div className="pt-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition"
                >
                  Apple
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-stone-500">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-stone-900 hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
