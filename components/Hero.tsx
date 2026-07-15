"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdLocationOn, MdVerified } from "react-icons/md";
import { BlurredStagger } from "./blurtext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared neumorphic shadow tokens — same convex/concave/glow language as
// KeyButton / SlotButton / Navbar so this card matches the rest of the UI.
const SHADOW_CONVEX =
  "-10px -10px 22px rgba(255,255,255,0.95), 12px 12px 26px rgba(163,177,198,0.55)";
const SHADOW_CONCAVE =
  "inset 4px 4px 10px rgba(163,177,198,0.5), inset -4px -4px 10px rgba(255,255,255,0.9)";
const SHADOW_GLOW =
  "0 0 30px 6px rgba(181,230,77,0.4), -6px -6px 14px rgba(255,255,255,0.9), 8px 8px 18px rgba(163,177,198,0.5)";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useRef<((value: number) => void) | null>(null);
  const rotateY = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 90, opacity: 0, scale: 0.94, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.to(card, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      rotateX.current = gsap.quickTo(card, "rotateX", {
        duration: 0.6,
        ease: "power3",
      });
      rotateY.current = gsap.quickTo(card, "rotateY", {
        duration: 0.6,
        ease: "power3",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rotateX.current || !rotateY.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.current(px * 10);
    rotateX.current(-py * 10);
  };

  const handleMouseLeave = () => {
    rotateX.current?.(0);
    rotateY.current?.(0);
  };

  return (
    <section id="home" className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="relative w-full min-h-[92vh] rounded-[28px] sm:rounded-[36px] overflow-hidden">
        <Image
          src="/herosky.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        <div className="w-full max-w-350 mx-auto px-5 sm:px-10 md:px-16 xl:px-20 pt-24 sm:pt-32 md:pt-40 pb-14 flex flex-col items-center text-center">
          <h1
            className="text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.15] text-[#0a0a0a] m-0 max-w-[1400px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <BlurredStagger text="Get a website that actually turns visitors into paying customers." />
          </h1>

          <p
            className="text-[18px] sm:text-[19px] font-medium leading-relaxed text-[#4a4a4a] mt-5 max-w-[1400px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <BlurredStagger text="Without months of back and forth, a generic template, or a developer who disappears the moment it's live." />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-7"
          >
            <div className="flex items-center gap-2">
              <MdVerified size={20} color="#6B9E1E" />
              <span
                className="text-[18px]  text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                2 live client products shipped
              </span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#0a0a0a]/25" />
            <div className="flex items-center gap-2">
              <MdLocationOn size={20} color="#6B9E1E" />
              <span
                className="text-[18px]  text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Sri Lanka + Remote
              </span>
            </div>
          </motion.div>

          <motion.a
            href="#work"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 bg-[#B5E64D] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-[18px] transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            See the work →
          </motion.a>

          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mt-16 sm:mt-20 w-full max-w-140 rounded-3xl bg-[#e6ebf2] p-6 sm:p-7 text-left"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
              boxShadow: SHADOW_CONVEX,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-[18px] font-bold text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                PrimeLeed
              </span>
              <span className="flex items-center gap-1.5 text-[18px] font-semibold text-[#6B9E1E]">
                <span className="w-2 h-2 rounded-full bg-[#6B9E1E] animate-pulse" />
                Live now
              </span>
            </div>

            <p
              className="text-[18px] text-[#5b5b5b] font-medium mt-1 mb-5"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              From cold visitor to enrolled student. Tracked, in real time.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div
                className="rounded-2xl bg-[#e9eef4] p-4"
                style={{ boxShadow: SHADOW_CONCAVE }}
              >
                <p className="text-[18px] text-[#5b6b45] font-semibold m-0">
                  New leads
                </p>
                <p className="text-[28px] font-bold text-[#0a0a0a] m-0">12</p>
              </div>
              <div
                className="rounded-2xl bg-[#e9eef4] p-4"
                style={{ boxShadow: SHADOW_CONCAVE }}
              >
                <p className="text-[18px] text-[#5b6b45] font-semibold m-0">
                  In chat
                </p>
                <p className="text-[28px] font-bold text-[#0a0a0a] m-0">10</p>
              </div>
              <div
                className="rounded-2xl p-4"
                style={{ background: "#B5E64D", boxShadow: SHADOW_GLOW }}
              >
                <p className="text-[18px] text-[#3d4a2b] font-semibold m-0">
                  Closed
                </p>
                <p className="text-[28px] font-bold text-[#0a0a0a] m-0">1</p>
              </div>
            </div>

            <div
              className="mt-4 flex items-start gap-3 rounded-2xl bg-[#e9eef4] p-4"
              style={{ boxShadow: SHADOW_CONCAVE }}
            >
              <div
                className="w-10 h-10 shrink-0 rounded-full bg-[#e6ebf2] text-[#0a0a0a] flex items-center justify-center text-[18px] font-bold"
                style={{ boxShadow: SHADOW_CONVEX }}
              >
                A
              </div>
              <div className="min-w-0">
                <p className="text-[18px] font-semibold text-[#0a0a0a] m-0">
                  Aisha: Just applied, when do I hear back?
                </p>
                <p className="text-[18px] text-[#6B9E1E] font-semibold m-0 mt-0.5">
                  Replied in 4 minutes
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className="text-[18px] text-[#0a0a0a] font-semibold"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Trusted by 2,000+ students
              </span>
              <span className="text-[18px] font-bold text-[#6B9E1E]">
                5.0 ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}