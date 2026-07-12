"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "See today's bookings the second you open the app",
    span: false,
  },
  {
    title: "Generate an invoice in under a minute",
    span: false,
  },
  {
    title: "Never double-book a shoot again",
    span: true,
  },
];

export default function AboutSection() {
  return (
    <section className="relative bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 md:gap-20">
        {/* Phone image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto h-[520px] w-[300px] sm:h-[560px] sm:w-[320px]"
        >
          <Image
            src="/aboutmobile.png"
            alt="Apix calendar view with revenue and outstanding payments"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Copy + features */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-brand text-3xl font-semibold leading-tight tracking-tight text-[#10131A] sm:text-4xl"
          >
            Built for how photographers
            <br className="hidden sm:block" /> actually work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-lg text-balance text-base text-[#3C4450]/80 sm:text-lg"
          >
            Not a bloated studio management platform with forty features
            you&apos;ll never open. Apix does three things: bookings,
            invoices, clients. And it does them fast, from your phone,
            between shoots.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
                className={`rounded-2xl bg-[#F1F2F4] p-6 ${
                  f.span ? "sm:col-span-2" : ""
                }`}
              >
                <p className="font-brand text-lg font-semibold leading-snug text-[#10131A]">
                  {f.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}