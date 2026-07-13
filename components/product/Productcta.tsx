"use client";
import { motion } from "motion/react";

export default function ProductsCTA() {
  return (
    <section className="w-full px-3 sm:px-4 pb-20 sm:pb-28">
      <div className="w-full max-w-350 mx-auto px-5 sm:px-10 md:px-16 xl:px-20">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#0a0a0a] px-8 sm:px-16 py-16 sm:py-24 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#B5E64D] opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#B5E64D] opacity-10 blur-3xl" />

          <h2
            className="relative text-[30px] sm:text-[42px] font-semibold text-white m-0 max-w-160 mx-auto leading-[1.2]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Got an idea I should build next?
          </h2>
          <p
            className="relative text-[18px] text-white/60 font-medium mt-4 max-w-120 mx-auto"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Half the products above exist because someone said exactly that
            sentence to me.
          </p>

          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative mt-9 inline-flex items-center gap-2 bg-[#B5E64D] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-[18px] transition-colors duration-300 hover:bg-white"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Let&apos;s talk ✳
          </motion.a>
        </div>
      </div>
    </section>
  );
}
