"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookingMotionGraphic } from "@/components/motiongraphics/Booking";
const BOOKING_URL = "https://cal.com/rishiharan/intro-call";
const CONTACT_EMAIL = "hello@rishiharan.dev";
export const BOOK_IMAGE_URL =
  "https://cdn.magicpatterns.com/patterns/generated-images/c54c5c13-106e-4751-8b5f-665ed6aaed34.jpg";
export function BookACallPage() {
  const reduceMotion = useReducedMotion();
  return (
    <main className="flex min-h-screen w-full items-start bg-[#ffffff] p-3 sm:p-4 lg:items-center">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
        <motion.section
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
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
                  animate={{
                    scale: [1, 1.45, 1],
                    opacity: [0.45, 0, 0.45],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
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
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="group inline-flex w-full items-center justify-between rounded-full bg-[#0a0a0a] py-2 pl-5 pr-2 text-left text-[16px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a] sm:w-auto sm:min-w-[188px]"
              >
                <span>Book a call</span>
                <span className="ml-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[#B5E64D] px-2 text-[14px] font-extrabold text-[#0a0a0a] transition-transform duration-200 group-hover:translate-x-0.5">
                  GO
                </span>
              </motion.a>
              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/15 px-5 py-3.5 text-[16px] font-bold text-[#0a0a0a] transition-colors hover:bg-[#F3F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a] sm:w-auto"
              >
                Email instead
              </motion.a>
            </div>
          </div>

     
        </motion.section>

        <motion.section
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.98,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-white/80 bg-[#E3E7F0] bg-[url('/book.jpg')] bg-cover bg-center shadow-[-4px_-4px_10px_rgba(255,255,255,0.25),8px_10px_20px_rgba(113,124,146,0.15)] sm:min-h-[560px] lg:min-h-[680px] lg:border-0 lg:shadow-none"
          aria-label="Animated availability illustration"
        >
          <BookingMotionGraphic imageUrl={BOOK_IMAGE_URL} />
        </motion.section>
      </div>
    </main>
  );
}
