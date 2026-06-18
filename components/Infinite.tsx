"use client"

import React, { Fragment } from "react"

const MARQUEE_ITEMS = Array.from({ length: 12 })

function MarqueeContent({
  text,
  asteriskColor,
}: {
  text: string
  asteriskColor: string
}) {
  return (
    <div className="flex items-center shrink-0">
      {MARQUEE_ITEMS.map((_, i) => (
        <Fragment key={i}>
          <span className="mx-3 md:mx-5 text-xl md:text-3xl font-bold tracking-tight">
            {text}
          </span>
          <span className="mx-3 md:mx-5 text-lg md:text-2xl" style={{ color: asteriskColor }}>
            ✳
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export function CrossingMarquee() {
  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-[#ffffff] h-[220px] md:h-[260px]"
    >
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .band-ltr { animation: marquee-ltr 55s linear infinite; }
        .band-rtl { animation: marquee-rtl 45s linear infinite; }
        .band-ltr:hover, .band-rtl:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .band-ltr, .band-rtl { animation: none; }
        }

        .band-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200vw;
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
        }

        .band-wrap--dark {
          background: #0a0a0a;
          color: #ffffff;
          z-index: 10;
          transform: translate(-50%, -50%) rotate(-5deg);
        }

        .band-wrap--green {
          background: #B5E64D;
          color: #0a0a0a;
          z-index: 20;
          transform: translate(-50%, -50%) rotate(5deg);
          box-shadow: 0 6px 30px rgba(0,0,0,0.28);
        }
      `}</style>

      {/* Dark band */}
      <div className="band-wrap band-wrap--dark py-3 md:py-5 shadow-lg">
        <div className="band-ltr flex w-max">
          <MarqueeContent text="Let's Connect" asteriskColor="#B5E64D" />
          <MarqueeContent text="Let's Connect" asteriskColor="#B5E64D" />
        </div>
      </div>

      {/* Green band */}
      <div className="band-wrap band-wrap--green py-3 md:py-5">
        <div className="band-rtl flex w-max">
          <MarqueeContent text="Let's Connect" asteriskColor="#0a0a0a" />
          <MarqueeContent text="Let's Connect" asteriskColor="#0a0a0a" />
        </div>
      </div>
    </section>
  )
}

export default CrossingMarquee