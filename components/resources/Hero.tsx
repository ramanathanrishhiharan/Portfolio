"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdBolt, MdOutlineFolderOpen } from "react-icons/md";
import { FiFileText, FiFile, FiLink } from "react-icons/fi";
import { BlurredStagger } from "../blurtext";
import { resources, type Resource } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = resources.slice(0, 3);

function getFanValues(count: number) {
  if (count <= 1) return { rotation: [0], offsetX: [0] };
  if (count === 2) return { rotation: [-7, 7], offsetX: [-56, 56] };
  return { rotation: [-9, 0, 9], offsetX: [-88, 0, 88] };
}

const { rotation: FAN_ROTATION, offsetX: FAN_OFFSET_X } = getFanValues(featured.length);

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

function TypeIcon({ type, size = 16 }: { type: Resource["type"]; size?: number }) {
  if (type === "pdf") return <FiFileText size={size} />;
  if (type === "doc") return <FiFile size={size} />;
  return <FiLink size={size} />;
}

export default function ResourcesHero() {
  const deckRef = useRef<HTMLDivElement>(null);
  const rotateX = useRef<((value: number) => void) | null>(null);
  const rotateY = useRef<((value: number) => void) | null>(null);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    if (!deckRef.current || isSmallScreen) return;
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
      rotateX.current = gsap.quickTo(deck, "rotateX", { duration: 0.6, ease: "power3" });
      rotateY.current = gsap.quickTo(deck, "rotateY", { duration: 0.6, ease: "power3" });
    });
    return () => ctx.revert();
  }, [isSmallScreen]);

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
          src="/resources.jpg"
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
            <BlurredStagger text="Things I made once and now just give away." />
          </h1>
          <p
            className="text-[18px] sm:text-[19px] font-medium leading-relaxed text-[#4a4a4a] mt-5 max-w-350"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <BlurredStagger text="Templates, checklists, and scripts I actually use on client work. No email required, no gated PDF trick, just the files." />
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
                {resources.length} free resources, growing slowly
              </span>
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#0a0a0a]/25" />
            <div className="flex items-center gap-2">
              <MdOutlineFolderOpen size={20} color="#6B9E1E" />
              <span
                className="text-[18px] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                PDFs, docs, and templates, no signup
              </span>
            </div>
          </motion.div>

          <motion.a
            href="#library"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 bg-[#B5E64D] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-[18px] transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Browse the library →
          </motion.a>

          {isSmallScreen ? (
            <div
              className="w-full mt-16 -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {featured.map((resource) => (
                <div
                  key={resource.slug}
                  className="shrink-0 w-64 snap-start rounded-3xl bg-white shadow-2xl p-5 text-left"
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span
                      className="text-[18px] font-bold text-[#0a0a0a] truncate"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {resource.title}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5b6b45] bg-[#EFF7E3] px-2.5 py-1 rounded-full">
                    <TypeIcon type={resource.type} size={13} />
                    {resource.meta}
                  </span>
                  <p
                    className="text-[15px] text-[#5b5b5b] font-medium leading-snug mt-3"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {resource.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={deckRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mt-24 w-full max-w-140 h-55 md:h-60"
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {featured.map((resource, i) => (
                <motion.div
                  key={resource.slug}
                  initial={{ rotate: FAN_ROTATION[i], x: FAN_OFFSET_X[i] }}
                  whileHover={{ rotate: 0, y: -18, scale: 1.04, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute left-1/2 top-0 w-64 md:w-72 -translate-x-1/2 rounded-3xl bg-white shadow-2xl p-5 text-left cursor-default"
                  style={{ x: FAN_OFFSET_X[i], zIndex: i === 1 ? 5 : 2 }}
                >
                  <span
                    className="text-[18px] font-bold text-[#0a0a0a]"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {resource.title}
                  </span>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5b6b45] bg-[#EFF7E3] px-2.5 py-1 rounded-full">
                      <TypeIcon type={resource.type} size={13} />
                      {resource.meta}
                    </span>
                  </div>
                  <p
                    className="text-[15px] text-[#5b5b5b] font-medium leading-snug mt-3"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {resource.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}