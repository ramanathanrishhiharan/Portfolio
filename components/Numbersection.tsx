"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { StatCard } from "./StatCard";
import { PhysicsCapsules } from "./PhysicsCapsules";

export function NumbersSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section className="w-full max-w-300 mx-auto px-6 md:px-16 xl:px-20 py-20 font-sans">
      {/* Inner black card */}
      <div className="relative overflow-hidden rounded-xl bg-black text-white">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -bottom-40 left-0 h-130 w-[60%] rounded-full bg-[#B5E64D]/25 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-75 w-[40%] rounded-full bg-white/5 blur-[120px]" />

        {/* Content */}
        <div className="relative px-6 pt-10 sm:px-10 sm:pt-14">
          {/* Header */}
          <div
            ref={headerRef}
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
          >
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-4xl font-[750] leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            >
              Why Businesses
              <br />
              Work With Me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-sm lg:text-right"
            >
              <p className="text-base leading-relaxed text-neutral-400">
                Combining product thinking, modern development, and AI to build
                solutions that help businesses grow.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B5E64D] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95">
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Stat Cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              variant="green"
              target={5}
              suffix="+"
              superscript="Products Built"
              description="Custom websites, web applications, and AI solutions launched for real-world use."
              delay={0}
            />

            <StatCard
              variant="light"
              target={100}
              suffix="%"
              superscript="Project Ownership"
              description="Handling everything from planning and UI design to backend development and deployment."
              delay={0.12}
            />

            <StatCard
              variant="dark"
              target={24}
              suffix="/7"
              superscript="Communication"
              description="Clear updates, fast responses, and collaboration throughout every project."
              delay={0.24}
            />
          </div>
        </div>

        {/* Physics Capsules */}
        <div className="relative mt-2 px-2 pb-10 sm:px-6">
          <PhysicsCapsules />
        </div>
      </div>
    </section>
  );
}
