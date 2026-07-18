"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset window scroll position to top instantly on route change
    window.scrollTo(0, 0);

    // Short timeout fallback to handle asynchronous rendering/hydration delays
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
