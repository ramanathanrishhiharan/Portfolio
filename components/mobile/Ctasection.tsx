"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import FloatingCard from "./Floatingcard";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse tilt for the floating report cards
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

  // Scroll parallax: sky drifts slower than the phone
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to("[data-parallax-sky-footer]", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.fromTo(
          phoneRef.current,
          { yPercent: 6 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }, sectionRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#EAF4FC] px-6 pt-28 sm:pt-36"
    >
      <div
        data-parallax-sky-footer
        className="absolute inset-0 -z-10 scale-110"
      >
        <Image src="/sky.png" alt="" fill className="object-cover object-center" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:flex-1">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-brand text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[#10131A] sm:text-6xl sm:leading-tight"
        >
          Your next shoot is already booked.
          <br className="hidden sm:block" />
          Your business software isn&apos;t.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-5 max-w-lg text-balance text-base text-[#3C4450]/80 sm:text-xl"
        >
          Free, no Play Store required, ready in under a minute.
        </motion.p>

        <motion.a
          href="https://github.com/ramanathanrishhiharan/apix/releases/download/Apix/apix-v1.0.0.apk"
          download
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B5E64D] px-7 py-3.5 font-brand text-sm font-semibold text-[#10131A] shadow-[0_10px_30px_-8px_rgba(181,230,77,0.7)] transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(181,230,77,0.85)]"
        >
          Download for Android
        </motion.a>

        {/* Phone anchored to the bottom edge of the sky, + floating report cards */}
        <div className="mt-8 flex w-full items-center justify-center sm:mt-10 sm:flex-1 sm:items-end">
          <div
            ref={phoneRef}
            className="relative h-[54vh] max-h-[860px] min-h-[360px] w-[260px] sm:h-[80vh] sm:min-h-0 sm:w-[380px] md:w-[440px] lg:w-[480px]"
          >
            <Image
              src="/footermobile.png"
              alt="Apix payment reports showing total revenue and outstanding balance"
              fill
              className="object-contain object-bottom"
            />

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.8}
              delay={0.4}
              className="left-[-40px] top-[8%] w-28 sm:left-[-124px] sm:top-[10%] sm:w-44"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Total revenue
              </p>
              <p className="mt-1 font-brand text-lg font-semibold text-[#10131A]">
                Rs 150.5k
              </p>
              <p className="text-xs text-[#6B7280]">Lifetime</p>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.55}
              delay={0.55}
              className="right-[-44px] top-[22%] w-32 sm:right-[-128px] sm:top-[26%] sm:w-48"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Outstanding
              </p>
              <p className="mt-1 font-brand text-lg font-semibold text-[#B5502E]">
                Rs 139.5k
              </p>
              <p className="text-xs text-[#6B7280]">To collect</p>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={1}
              delay={0.7}
              className="left-[-32px] bottom-[22%] w-24 sm:left-[-108px] sm:bottom-[24%] sm:w-40"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Total bookings
              </p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-brand text-xl font-semibold text-[#10131A]">
                  4
                </span>
                <span className="text-xs text-[#6B7280]">this month: 0</span>
              </div>
            </FloatingCard>

            <FloatingCard
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.65}
              delay={0.85}
              className="right-[-36px] bottom-[8%] w-28 sm:right-[-120px] sm:w-44"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Collection rate
              </p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-brand text-xl font-semibold text-[#10131A]">
                  7%
                </span>
                <span className="h-1.5 w-14 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <span className="block h-full w-[7%] rounded-full bg-[#B5E64D]" />
                </span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}