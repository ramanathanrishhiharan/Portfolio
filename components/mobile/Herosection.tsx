"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FloatingCard from "./Floatingcard";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse tilt, normalized -1..1 from section center
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  // Scroll parallax: sky drifts slowest, phone drifts a little, cards drift a bit more.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to("[data-parallax-sky]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(phoneWrapRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to("[data-parallax-card]", {
          yPercent: -16,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#EAF4FC]"
    >
      {/* Sky background */}
      <div data-parallax-sky className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/sky.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20 text-center sm:flex-1 sm:pt-32">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-brand text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-[#10131A] sm:text-7xl sm:leading-[1.05] lg:text-6xl">
            Run the business.
            <br className="hidden sm:block" />
            Not the spreadsheet.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-balance text-base text-[#3C4450]/80 sm:text-xl">
            Apix handles bookings, invoices, and clients for photographers, so
            the only thing you&apos;re chasing is light, not late payments.
          </p>
          <motion.a
            href="https://github.com/ramanathanrishhiharan/apix/releases/download/Apix/apix-v1.0.0.apk"
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B5E64D] px-7 py-3.5 font-brand text-sm font-semibold text-[#10131A] shadow-[0_10px_30px_-8px_rgba(181,230,77,0.7)] transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(181,230,77,0.85)]"
          >
            Download for Android
          </motion.a>
        </motion.div>

        {/* Phone anchored to the bottom edge of the sky, + floating cards */}
        <div className="mt-8 flex w-full items-center justify-center sm:mt-10 sm:flex-1 sm:items-end">
          <div
            ref={phoneWrapRef}
            className="relative h-[54vh] max-h-[860px] min-h-[360px] w-[260px] sm:h-[80vh] sm:min-h-0 sm:w-[400px] md:w-[460px] lg:w-[500px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative h-full w-full"
            >
              <Image
                src="/mobilehero.png"
                alt="Apix app showing today's bookings, revenue and outstanding payments"
                fill
                priority
                className="object-contain object-bottom"
              />
            </motion.div>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.9}
              delay={0.5}
              className="left-[-44px] top-[6%] w-28 sm:left-[-132px] sm:top-[8%] sm:w-44"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Collection rate
              </p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-brand text-xl font-semibold text-[#10131A]">
                  92%
                </span>
                <span className="rounded-full bg-[#B5E64D]/25 px-2 py-0.5 text-[10px] font-semibold text-[#3E5B12]">
                  +6%
                </span>
              </div>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.6}
              delay={0.65}
              className="right-[-48px] top-[18%] w-32 sm:right-[-136px] sm:top-[22%] sm:w-48"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                New booking
              </p>
              <p className="mt-1 font-brand text-sm font-semibold text-[#10131A]">
                Golden hour shoot
              </p>
              <p className="text-xs text-[#6B7280]">
                Confirmed &middot; Sat 6:15pm
              </p>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={1.1}
              delay={0.8}
              className="left-[-36px] bottom-[20%] w-24 sm:left-[-112px] sm:bottom-[22%] sm:w-40"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Outstanding
              </p>
              <p className="mt-1 font-brand text-lg font-semibold text-[#B5502E]">
                $1,000
              </p>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.7}
              delay={0.95}
              className="right-[-40px] bottom-[6%] w-28 sm:right-[-124px] sm:w-44"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Invoices sent
              </p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-brand text-xl font-semibold text-[#10131A]">
                  3
                </span>
                <span className="text-xs text-[#6B7280]">this week</span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}