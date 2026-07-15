"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BookingMotionGraphic } from "@/components/motiongraphics/Booking";
import { BookingWidget } from "../booking/Widget";

export const BOOK_IMAGE_URL =
  "https://cdn.magicpatterns.com/patterns/generated-images/c54c5c13-106e-4751-8b5f-665ed6aaed34.jpg";
const CONTACT_EMAIL = "hello@rishiharan.dev";

export function BookACallPage() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen w-full items-start bg-[#ffffff] p-3 sm:p-4 lg:items-center">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-0 flex-col overflow-hidden rounded-[30px] bg-white p-7 sm:p-10 lg:min-h-[680px] lg:p-14"
          aria-labelledby="booking-heading"
        >
          <div className="flex flex-none flex-col justify-center text-center lg:flex-1 lg:text-left">
            <div
              className="relative mx-auto mb-6 h-14 w-14 lg:mb-8 lg:h-16 lg:w-16 lg:mx-0"
              aria-hidden="true"
            >
              {!reduceMotion && (
                <motion.span
                  animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-[#B5E64D]/40"
                />
              )}
              <span className="absolute inset-[7px] rounded-full bg-[#B5E64D] shadow-[0_12px_26px_-10px_rgba(132,178,41,0.9)]" />
            </div>

            <h1
              id="booking-heading"
              className="m-0 text-[37px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#0a0a0a] sm:text-[50px] lg:text-[58px]"
            >
              A good call starts with a good question.
            </h1>
            <p className="mx-auto mt-5 max-w-[475px] text-[16px] font-medium leading-relaxed text-[#5b5959] sm:text-[17px] lg:mx-0 lg:text-[19px]">
              Bring the messy brief, the half-formed idea, or the thing
              that&apos;s not quite working. We&apos;ll make the next move
              clearer together.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:mt-9 lg:justify-start">
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                whileTap={reduceMotion ? undefined : { scale: 0.98, y: 1 }}
                className="group relative inline-flex w-full items-center justify-between rounded-full bg-[#e6ebf2] py-2 pl-6 pr-2 text-left text-[16px] font-bold text-[#0a0a0a] outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/40 active:translate-y-0.5 sm:w-auto sm:min-w-[188px]"
                style={{
                  boxShadow:
                    "0 0 30px 4px rgba(181,230,77,0.35), -8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[4px] rounded-full transition-shadow duration-150 group-active:[box-shadow:inset_3px_3px_8px_rgba(163,177,198,0.5),inset_-3px_-3px_8px_rgba(255,255,255,0.9)]"
                />
                <span className="relative">Book a call</span>
                <span className="relative ml-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[#B5E64D] px-2 text-[14px] font-extrabold text-[#0a0a0a] shadow-[-3px_-3px_8px_rgba(255,255,255,0.6),3px_3px_8px_rgba(132,178,41,0.5)] transition-transform duration-200 group-hover:translate-x-0.5">
                  GO
                </span>
              </motion.button>
              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/15 px-5 py-3.5 text-[16px] font-bold text-[#0a0a0a] transition-colors hover:bg-[#F3F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a] sm:w-auto"
              >
                Email instead
              </motion.a>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-white/80 bg-[#E3E7F0] bg-[url('/book.jpg')] bg-cover bg-center shadow-[-4px_-4px_10px_rgba(255,255,255,0.25),8px_10px_20px_rgba(113,124,146,0.15)] sm:min-h-[560px] lg:min-h-[680px] lg:border-0 lg:shadow-none"
          aria-label="Animated availability illustration"
        >
          <BookingMotionGraphic imageUrl={BOOK_IMAGE_URL} />
        </motion.section>
      </div>

      {/* Custom booking modal — replaces the Cal.com embed popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[30px] bg-white p-7 sm:p-9"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#e6ebf2] text-slate-500"
              >
                ✕
              </button>
              <h2 className="mb-6 text-[24px] font-semibold tracking-[-0.02em] text-[#0a0a0a]">
                Pick a time
              </h2>
              <BookingWidget />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}