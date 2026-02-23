"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/images/hero/Home.png",
    "/images/hero/Home2.png",
    "/images/hero/Home3.png",
    "/images/hero/Home4.png",
  ] as const;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalMs = 5000;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            aria-hidden
            fill
            priority={index === 0}
            quality={100}
            sizes="100vw"
            className={[
              "object-cover object-[75%_20%]",
              "transition-opacity duration-700 ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="relative min-h-screen pt-16">
        <div className="container-lux h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium leading-none tracking-[0.22em]">
              <span className="block">REDEFINING</span>
              <span className="block mt-3">LUXURY</span>
            </h1>

            <p className="mt-6 text-[10px] sm:text-xs tracking-[0.45em] text-white/75">
              SPRING/SUMMER 2025 COLLECTION
            </p>

            <Link
              href="/collections"
              className="mt-10 inline-flex items-center justify-center gap-3 border border-white/40 px-8 py-4 text-[10px] sm:text-xs tracking-[0.45em] text-white/90 hover:bg-white/10 transition"
            >
              EXPLORE COLLECTION <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}