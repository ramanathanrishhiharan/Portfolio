"use client";

import React from "react";
import { StarIcon } from "lucide-react";
import { BlurredStagger } from "./blurtext";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Rishi built our entire website from scratch. Clean, fast, and exactly what we envisioned. Knew exactly what to do without us having to explain twice.",
    name: "PrimeLeed Team",
    role: "Education Consultancy, UK",
  },
  {
    quote:
      "He took our messy requirements and turned them into a real product. The attention to detail on both the design and the code was genuinely impressive.",
    name: "Alex R.",
    role: "Startup Founder",
  },
  {
    quote:
      "We needed someone who could handle the full stack — design, backend, deployment. Rishi did all of it, and did it well.",
    name: "Sam K.",
    role: "Product Manager",
  },
  {
    quote:
      "Delivered faster than expected, asked the right questions, and the codebase was actually readable. Rare combination.",
    name: "Lena M.",
    role: "Tech Lead",
  },
  {
    quote:
      "He understood the business goal, not just the technical brief. That made the whole process smooth and the output actually useful.",
    name: "Emily T.",
    role: "E-commerce Owner",
  },
];

const CARD_SHADOW = {
  boxShadow: "-2px 12px 22.3px 2px rgba(0,0,0,0.25)",
};

function Stars() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className="w-4 h-4 text-orange-500 fill-orange-500"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Card({ quote, name, role }: Testimonial) {
  return (
    <article
      className="bg-white rounded-2xl p-6 flex flex-col"
      style={CARD_SHADOW}
    >
      <Stars />
      <p
        className="italic text-[#5b5959] leading-relaxed text-[15px] flex-1"
        style={{ fontFamily: "var(--font-primary)" }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6">
        <p
          className="font-semibold text-[#0a0a0a] text-[15px]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {name}
        </p>
        <p
          className="text-[13px] text-[#9b9b9b] mt-0.5"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {role}
        </p>
      </div>
    </article>
  );
}

const positions = [
  "lg:absolute lg:top-24 lg:left-0 lg:w-[320px] lg:-rotate-[6deg]",
  "lg:absolute lg:top-0 lg:left-[270px] lg:w-[310px] lg:-rotate-[3deg]",
  "lg:absolute lg:top-16 lg:left-[540px] lg:w-[320px] lg:rotate-[5deg] lg:z-0",
  "lg:absolute lg:top-52 lg:left-[155px] lg:w-[310px] lg:rotate-[3deg] lg:z-20",
  "lg:absolute lg:top-44 lg:left-[430px] lg:w-[320px] lg:-rotate-[2deg] lg:z-30",
];

export function Testimonials() {
  return (
    <section
      className="w-full max-w-300 mx-auto px-6 md:px-16 xl:px-20 py-20 overflow-hidden"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Header — centered */}
      {/* Header — centered on desktop, left-aligned on mobile */}
      <div className="flex flex-col items-start text-left lg:items-center lg:text-center gap-3 mb-14">
        <h2
          className="text-[42px] md:text-[48px] font-bold leading-[1.1] text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <BlurredStagger text="What clients actually say." />
        </h2>
        <p
          className="text-[18px] text-[#5b5959] leading-relaxed max-w-85"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <BlurredStagger text="Real feedback from people I've built real things with." />
        </p>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-5 lg:hidden">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} {...t} />
        ))}
      </div>

      {/* Desktop: scattered absolute layout */}
      <div className="hidden lg:flex justify-center">
        <div className="relative h-145 w-215">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={positions[i]}>
              <Card {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
