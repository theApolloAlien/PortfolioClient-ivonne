"use client";

import * as React from "react";
import Lenis from "lenis";

/* SmoothScroll — global Lenis smooth scrolling + anchor-link handling.
   Disabled entirely under prefers-reduced-motion (native scroll takes over).
   Lenis scrolls the real document, so the sections' scrollY / getBoundingClientRect
   readouts (hero parallax, bloom scrub, nav) keep working unchanged. */

const NAV_OFFSET = -88; // leave room for the fixed nav (matches scroll-padding-top)

export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    // Expose the instance for local dev and for QA captures (?qa in the URL).
    if (process.env.NODE_ENV !== "production" || window.location.search.includes("qa")) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href") || "";
      if (hash === "#" || hash.length < 2) {
        e.preventDefault();
        return;
      }
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
