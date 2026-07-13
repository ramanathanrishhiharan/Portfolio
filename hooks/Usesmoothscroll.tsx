"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Buttery smooth scrolling for the whole page.
 * Requires: pnpm add lenis
 *
 * Mount this ONCE, in the root layout — not per-page. Lenis owns scroll
 * for the whole document; creating/destroying it on every route mount
 * is what caused the "lands mid-page" bug (a stale instance from the
 * previous page could outlive its cleanup, see below).
 */
export function useSmoothScroll() {
  const pathname = usePathname();

  // One Lenis instance for the app's lifetime.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: any;
    let rafId: number;
    let cancelled = false; // guards against the async race below

    (async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // If the effect was already cleaned up before this import resolved
      // (e.g. fast navigation / React StrictMode double-invoke), bail out
      // instead of creating an instance nobody will ever destroy.
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      gsap.ticker.lagSmoothing(0);

      // expose for the route-change effect below
      (window as any).__lenis = lenis;
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      if ((window as any).__lenis === lenis) delete (window as any).__lenis;
    };
  }, []);

  // Reset Lenis's own scroll position on every route change. Native
  // window.scrollTo does nothing here — Lenis drives scroll itself, so
  // resetting scrollTop doesn't move what's actually on screen.
  useEffect(() => {
    const lenis = (window as any).__lenis;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);
}