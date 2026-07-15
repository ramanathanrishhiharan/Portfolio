"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdBolt, MdOutlineAllInclusive } from "react-icons/md";
import { BlurredStagger } from "../blurtext";
import { products } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Neumorphic shadow tokens — same language as KeyButton / SlotButton / Navbar /
// Hero card / ProblemSection icons / DeliversSection pills / ProjectsSection cards.
const SHADOW_CONVEX =
  "-8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)";
const SHADOW_CONCAVE =
  "inset 3px 3px 8px rgba(163,177,198,0.5), inset -3px -3px 8px rgba(255,255,255,0.9)";

// The three cards shown fanned out in the hero. Keep this to 3, the fan
// is tuned for that count.
const featured = products.slice(0, 3);

// Desktop spread: wide cards, wide offsets.
const FAN_ROTATION_DESKTOP = [-9, 0, 9];
const FAN_OFFSET_X_DESKTOP = [-88, 0, 88];

// Mobile spread: cards are narrower (w-40 = 160px vs w-64/w-72), so the
// offset has to shrink to match or the outer cards run off the viewport.
const FAN_ROTATION_MOBILE = [-6, 0, 6];
const FAN_OFFSET_X_MOBILE = [-46, 0, 46];

function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isSmall;
}

export default function ProductsHero() {
  const deckRef = useRef<HTMLDivElement>(null);
  const rotateX = useRef<((value: number) => void) | null>(null);
  const rotateY = useRef<((value: number) => void) | null>(null);
  const isSmallScreen = useIsSmallScreen();

  const FAN_ROTATION = isSmallScreen
    ? FAN_ROTATION_MOBILE
    : FAN_ROTATION_DESKTOP;
  const FAN_OFFSET_X = isSmallScreen
    ? FAN_OFFSET_X_MOBILE
    : FAN_OFFSET_X_DESKTOP;

  useEffect(() => {
    if (!deckRef.current) return;
    const deck = deckRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        deck,
        { y: 90, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: deck,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.to(deck, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: deck,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      rotateX.current = gsap.quickTo(deck, "rotateX", {
        duration: 0.6,
        ease: "power3",
      });
      rotateY.current = gsap.quickTo(deck, "rotateY", {
        duration: 0.6,
        ease: "power3",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!deckRef.current || !rotateX.current || !rotateY.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.current(px * 8);
    rotateX.current(-py * 8);
  };

  const handleMouseLeave = () => {
    rotateX.current?.(0);
    rotateY.current?.(0);
  };

  return (
    <section id="home" className="w-full px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="relative w-full min-h-[92vh] rounded-[28px] sm:rounded-[36px] overflow-hidden">
        <Image
          src="/products.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        <div className="w-full max-w-350 mx-auto px-5 sm:px-10 md:px-16 xl:px-20 pt-24 sm:pt-32 md:pt-40 pb-14 flex flex-col items-center text-center">
          <h1
            className="text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.15] text-[#0a0a0a] m-0 max-w-350"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <BlurredStagger text="Free tools built to fix a problem, not to look good in a portfolio." />
          </h1>
          <p
            className="text-[18px] sm:text-[19px] font-medium leading-relaxed text-[#4a4a4a] mt-5 max-w-350"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <BlurredStagger text="No email gate, no waitlist, no 'coming soon.' Everything below is live right now and costs you nothing." />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-7"
          >
            <div className="flex items-center gap-2">
              <MdBolt size={20} color="#6B9E1E" />
              <span
                className="text-[18px] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {products.length} tools shipped, zero subscriptions
              </span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#0a0a0a]/25" />
            <div className="flex items-center gap-2">
              <MdOutlineAllInclusive size={20} color="#6B9E1E" />
              <span
                className="text-[18px] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Free forever, updated whenever something breaks
              </span>
            </div>
          </motion.div>

          <motion.a
            href="#lineup"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 bg-[#B5E64D] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-[18px] transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            See the lineup →
          </motion.a>

          {/* Signature element: a fanned deck of the featured products instead
             of a single dashboard card. Multiple products, so the hero shows
             a hand of cards, not one flagship screenshot. */}
          <div
            ref={deckRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mt-20 sm:mt-24 w-full max-w-140 h-44 sm:h-55 md:h-60"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {featured.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ rotate: FAN_ROTATION[i], x: FAN_OFFSET_X[i] }}
                whileHover={{
                  rotate: 0,
                  y: -18,
                  scale: 1.04,
                  zIndex: 10,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute left-1/2 top-0 w-40 sm:w-64 md:w-72 -translate-x-1/2 rounded-2xl sm:rounded-3xl bg-[#e6ebf2] p-3.5 sm:p-5 text-left cursor-default"
                style={{
                  x: FAN_OFFSET_X[i],
                  zIndex: i === 1 ? 5 : 2,
                  boxShadow: SHADOW_CONVEX,
                }}
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-1">
                  <span
                    className="text-[14px] sm:text-[18px] font-bold text-[#0a0a0a] truncate"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {product.name}
                  </span>
                  <span className="flex items-center gap-1 shrink-0 text-[11px] sm:text-[13px] font-semibold text-[#6B9E1E]">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#6B9E1E] animate-pulse" />
                    {product.status}
                  </span>
                </div>
                <p
                  className="hidden sm:block text-[15px] text-[#5b5b5b] font-medium leading-snug"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {product.tagline}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-4">
                  {product.stack.slice(0, isSmallScreen ? 1 : 2).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] sm:text-[12px] font-semibold text-[#5b6b45] bg-[#e9eef4] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                      style={{ boxShadow: SHADOW_CONCAVE }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}