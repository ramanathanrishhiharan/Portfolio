"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDemoStep, CalendarDemoSteps } from "./CalenderSteps";
type BookingMotionGraphicProps = {
  imageUrl: string;
};
export function BookingMotionGraphic(_: BookingMotionGraphicProps) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<CalendarDemoStep>(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setStep((current) => ((current + 1) % 3) as CalendarDemoStep);
    }, 2900);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#ffffff] p-5 [perspective:1200px] sm:p-7 lg:bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [3, -7, 3],
                rotateX: [3, 5, 3],
                rotateY: [-6, -2, -6],
              }
        }
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto w-full max-w-[355px] sm:max-w-[430px] lg:max-w-[540px]"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [0.94, 1.08, 0.94],
                  opacity: [0.34, 0.18, 0.34],
                }
          }
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-9 left-[11%] right-[11%] h-12 rounded-[100%] bg-[#74819A] blur-xl sm:-bottom-11 sm:left-[9%] sm:right-[9%] sm:h-16 sm:blur-2xl"
        />

        <div className="absolute inset-x-4 bottom-[-12px] top-4 rounded-[26px] bg-[#B8C1D1] shadow-[0_22px_30px_-16px_rgba(80,94,119,0.65)] [transform:translateZ(-24px)] sm:inset-x-5 sm:bottom-[-16px] sm:top-5 sm:rounded-[33px]" />
        <div className="absolute inset-x-3 bottom-[-8px] top-2 rounded-[26px] bg-[#D0D7E2] [transform:translateZ(-13px)] sm:inset-x-4 sm:bottom-[-10px] sm:top-3 sm:rounded-[33px]" />
        <div className="absolute inset-x-2.5 bottom-[-4px] top-1 rounded-[26px] bg-[#F0F3F8] [transform:translateZ(-6px)] sm:inset-x-3 sm:bottom-[-5px] sm:top-2 sm:rounded-[33px]" />

        <section className="relative overflow-hidden rounded-[26px] border border-white/95 bg-[#E7EBF3] text-[#202633] shadow-[-6px_-6px_14px_rgba(255,255,255,0.4),15px_18px_28px_rgba(105,119,146,0.34),inset_1px_1px_2px_rgba(255,255,255,0.6)] sm:rounded-[34px] sm:shadow-[-8px_-8px_16px_rgba(255,255,255,0.45),19px_22px_35px_rgba(105,119,146,0.38),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
          <div className="absolute left-[9%] top-[-35px] h-28 w-32 rounded-full bg-white/40 blur-2xl sm:h-32 sm:w-40" />

          <div className="relative flex min-h-[82px] items-center justify-between border-b border-[#C8D0DE]/60 bg-[#E2E7F0]/80 px-4 pt-3 shadow-[inset_0_-5px_10px_rgba(142,154,178,0.12)] sm:min-h-[99px] sm:px-7 sm:pt-4">
            <div className="relative">
              <p className="text-[9px] font-bold tracking-[0.15em] text-[#667286] sm:text-[10px] sm:tracking-[0.17em]">
                INTRO CALL
              </p>
              <p className="mt-1 text-[15px] font-semibold tracking-[-0.03em] text-[#2A3343] sm:text-[18px]">
                Make space for the good stuff.
              </p>
            </div>
            <div className="relative flex gap-1.5">
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  animate={{
                    width: index === step ? 19 : 5,
                    backgroundColor: index <= step ? "#9FCB3D" : "#BBC4D3",
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="h-1.5 rounded-full shadow-[inset_1px_1px_1px_rgba(255,255,255,0.8),1px_1px_2px_rgba(108,123,149,0.24)]"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 -mt-2.5 flex justify-around px-8 sm:-mt-3 sm:px-10">
            {[0, 1, 2, 3].map((ring) => (
              <span
                key={ring}
                className="h-6 w-3 rounded-full border border-[#C7D0DF] bg-[#F1F4F9] shadow-[-3px_-3px_6px_rgba(255,255,255,0.95),3px_4px_7px_rgba(111,126,153,0.37),inset_1px_1px_2px_rgba(255,255,255,1)] sm:h-7 sm:w-3.5"
              />
            ))}
          </div>

          <div className="relative min-h-[242px] bg-[#E7EBF3] px-4 pb-4 pt-3 sm:min-h-[294px] sm:px-7 sm:pb-6">
            <AnimatePresence mode="wait" initial={false}>
              <CalendarDemoSteps
                key={step}
                step={step}
                reduceMotion={reduceMotion}
              />
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
