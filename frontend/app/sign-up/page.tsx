import Image from "next/image";
import Link from "next/link";

const loginImageSrc = "/images/login/SignUP_IN.png";

export const metadata = {
  title: "Create Account | VERSE",
};

export default function SignUpPage() {
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
            Create your account and discover a world of luxury fashion.
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
            <Link
              href="/sign-in"
              className="text-stone-400 hover:text-stone-900 transition"
            >
              Sign in
            </Link>
            <span className="text-stone-900">Create account</span>
          </div>
          <div className="mt-2 h-px w-full bg-stone-200" />

          <h1 className="mt-10 text-2xl text-stone-900">Join VERSE</h1>
          <p className="mt-2 text-sm text-stone-500">
            Create your account and discover a world of luxury fashion.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First"
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last"
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
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
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.28em] uppercase text-stone-500">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-md border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-stone-300"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-stone-600">
              <input
                type="checkbox"
                name="terms"
                className="mt-1 h-4 w-4 rounded border-stone-300"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-stone-900 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-stone-900 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <button
              type="button"
              className="w-full rounded-md bg-black px-4 py-3 text-xs tracking-[0.35em] uppercase text-white hover:bg-black/90 transition"
            >
              Create account
            </button>

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
                Already have an account?{" "}
                <Link href="/sign-in" className="text-stone-900 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
