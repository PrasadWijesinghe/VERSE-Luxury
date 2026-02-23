"use client";

import { useEffect } from "react";

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  const id = decodeURIComponent(hash.slice(1));
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ScrollToHash() {
  useEffect(() => {
    const onHashChange = () => {
      requestAnimationFrame(scrollToHash);
    };

    // Initial load (including cross-page navigation to /#section)
    requestAnimationFrame(scrollToHash);

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
