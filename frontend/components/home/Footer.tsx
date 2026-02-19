export default function Footer() {
  return (
    <footer className="bg-stone-100 text-stone-900">
      <div className="container-lux py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="text-2xl font-medium tracking-[0.28em]">VERSE</div>
            <p className="mt-6 text-base text-stone-500 max-w-sm leading-relaxed">
              Redefining luxury through timeless elegance, uncompromising
              quality, and the art of modern sophistication.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <SocialBtn label="Instagram" text="IG" />
              <SocialBtn label="Facebook" text="F" />
              <SocialBtn label="YouTube" text="YT" />
              <SocialBtn label="X" text="X" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <Col
                title="Shop"
                links={[
                  { label: "New Arrivals", href: "/#new" },
                  { label: "Women", href: "#" },
                  { label: "Men", href: "#" },
                  { label: "Accessories", href: "#" },
                  { label: "Haute Couture", href: "#" },
                ]}
              />

              <Col
                title="Maison"
                links={[
                  { label: "Our Heritage", href: "#about" },
                  { label: "Sustainability", href: "#" },
                  { label: "Craftsmanship", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Press", href: "#" },
                ]}
              />

              <Col
                title="Client Care"
                links={[
                  { label: "Contact Us", href: "#contact" },
                  { label: "Shipping & Returns", href: "#" },
                  { label: "Size Guide", href: "#" },
                  { label: "Track Order", href: "#" },
                  { label: "FAQ", href: "#" },
                ]}
              />

              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-stone-700">
                  Visit Us
                </div>
                <div className="mt-6 space-y-4 text-base text-stone-500 leading-relaxed">
                  <div>
                    742 Fifth Avenue
                    <br />
                    New York, NY 10019
                  </div>
                  <div>
                    Mon — Sat: 10am — 8pm
                    <br />
                    <a href="mailto:hello@verse.com" className="text-amber-700 hover:text-amber-600 transition">
                      hello@verse.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="container-lux py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>© {new Date().getFullYear()} VERSE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-stone-800 transition" href="#">
              Privacy
            </a>
            <span className="text-stone-300">|</span>
            <a className="hover:text-stone-800 transition" href="#">
              Terms
            </a>
            <span className="text-stone-300">|</span>
            <a className="hover:text-stone-800 transition" href="#">
              Cookies
            </a>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Powered by Readdy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.35em] text-stone-700">
        {title}
      </div>
      <ul className="mt-6 space-y-4 text-base text-stone-500">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-stone-900 transition">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialBtn({ label, text }: { label: string; text: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="h-10 w-10 grid place-items-center border border-stone-300 text-xs tracking-[0.2em] text-stone-600 hover:text-stone-900 hover:border-stone-400 transition"
    >
      {text}
    </a>
  );
}