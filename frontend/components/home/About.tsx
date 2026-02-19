import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="grid min-h-screen md:grid-cols-2">
        <div className="relative min-h-90 md:min-h-screen">
          <Image
            src="/images/about/About.jpg"
            alt="About VERSE"
            fill
            priority
            quality={100}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/0 via-black/0 to-black/60" />
        </div>

        <div className="bg-linear-to-b from-neutral-950 to-neutral-900">
          <div className="container-lux h-full flex items-center">
            <div className="w-full max-w-xl py-14 sm:py-20">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-700/80" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-white/70">
                  The Maison
                </span>
              </div>

              <h2 className="mt-8 text-4xl sm:text-6xl leading-none">
                <span className="block font-serif">Crafted for</span>
                <span className="block font-serif italic text-amber-100/90">
                  Eternity
                </span>
              </h2>

              <p className="mt-8 text-sm sm:text-base text-white/65 leading-relaxed">
                Founded on the principles of timeless elegance and
                uncompromising quality, VERSE represents the pinnacle of luxury
                fashion. Each piece in our collection is meticulously crafted by
                master artisans, blending traditional techniques with
                contemporary vision to create garments that transcend trends and
                define sophistication.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-serif text-amber-100/90">
                    15+
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.45em] text-white/55">
                    Years
                  </div>
                </div>

                <div className="text-center border-l border-r border-white/10 px-3">
                  <div className="text-2xl sm:text-3xl font-serif text-amber-100/90">
                    200+
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.45em] text-white/55">
                    Artisans
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-serif text-amber-100/90">
                    50K+
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.45em] text-white/55">
                    Patrons
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-amber-700 hover:text-amber-600 transition"
              >
                Discover our heritage <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
