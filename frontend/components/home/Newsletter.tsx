export default function Newsletter() {
  return (
    <section id="contact" className="relative bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(245,158,11,0.10),rgba(0,0,0,0)_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_35%,rgba(245,158,11,0.06),rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_70%_35%,rgba(245,158,11,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative container-lux py-28 sm:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-amber-700/70" />
            <span className="text-[11px] sm:text-sm uppercase tracking-[0.45em] text-amber-700">
              Exclusive Access
            </span>
            <span className="h-px w-12 bg-amber-700/70" />
          </div>

          <h2 className="mt-10 text-5xl sm:text-7xl leading-none">
            <span className="font-serif">Join the</span>{" "}
            <span className="font-serif italic text-amber-100/90">Circle</span>
          </h2>

          <p className="mt-7 text-base sm:text-lg text-white/55 leading-relaxed">
            Be the first to discover new collections, private events, and
            exclusive offers reserved for our inner circle.
          </p>

          <form className="mt-12 mx-auto max-w-2xl">
            <div className="flex items-center gap-4 border-b border-white/15 pb-4">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-base text-white/75 placeholder:text-white/35 outline-none"
                autoComplete="email"
              />

              <button
                type="button"
                className="shrink-0 inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.45em] text-amber-700 hover:text-amber-600 transition"
              >
                Subscribe <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
