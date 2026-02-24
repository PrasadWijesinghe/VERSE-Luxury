"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LAST_COLLECTIONS_URL_KEY = "verse_last_collections_url";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Remember last collections URL so Bag "Close" can return there.
    if (pathname === "/collections") {
      try {
        const qs = window.location.search || "";
        window.sessionStorage.setItem(
          LAST_COLLECTIONS_URL_KEY,
          `${pathname}${qs}`
        );
      } catch {
        // ignore
      }
    }
  }, [pathname]);

  return null;
}

export { LAST_COLLECTIONS_URL_KEY };
