"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import { products } from "./data";

// Neumorphic shadow tokens — same language as KeyButton / SlotButton / Navbar /
// Hero card / ProblemSection icons / DeliversSection pills / ProjectsSection /
// ProductsHero cards.
const SHADOW_CONVEX =
  "-8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)";
const SHADOW_CONCAVE =
  "inset 3px 3px 8px rgba(163,177,198,0.5), inset -3px -3px 8px rgba(255,255,255,0.9)";
const SHADOW_GLOW =
  "0 0 20px 4px rgba(181,230,77,0.45), -3px -3px 8px rgba(255,255,255,0.9), 4px 4px 10px rgba(163,177,198,0.5)";

export default function ProductsGrid() {
  return (
    <section id="lineup" className="w-full px-3 sm:px-4 py-20 sm:py-28">
      <div className="w-full max-w-350 mx-auto px-5 sm:px-10 md:px-16 xl:px-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2
            className="text-[32px] sm:text-[42px] font-semibold text-[#0a0a0a] m-0"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            The lineup
          </h2>
          <p
            className="text-[18px] text-[#5b5959] font-medium max-w-100"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Everything here is something I built, actually use, and kept around
            because it worked.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group relative rounded-[28px] bg-[#e6ebf2] p-6 flex flex-col justify-between min-h-72 overflow-hidden"
              style={{ boxShadow: SHADOW_CONVEX }}
            >
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundColor: product.accent }}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        product.status === "Live"
                          ? "#B5E64D"
                          : "#e9eef4",
                      color:
                        product.status === "Live"
                          ? "#0a0a0a"
                          : product.status === "Beta"
                            ? "#8a6d1e"
                            : "#5b5959",
                      boxShadow:
                        product.status === "Live" ? SHADOW_GLOW : SHADOW_CONCAVE,
                    }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        product.status === "Live"
                          ? "bg-[#0a0a0a] animate-pulse"
                          : product.status === "Beta"
                            ? "bg-[#D9A22D]"
                            : "bg-[#9a9a94]"
                      }`}
                    />
                    {product.status}
                  </span>
                </div>

                <h3
                  className="text-[24px] font-bold text-[#0a0a0a] m-0"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[18px] text-[#0a0a0a] font-medium mt-2 leading-snug"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {product.tagline}
                </p>
                <p
                  className="text-[16px] text-[#5b5959] mt-3 leading-relaxed"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {product.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[13px] font-semibold text-[#5b6b45] bg-[#e9eef4] px-2.5 py-1 rounded-full"
                      style={{ boxShadow: SHADOW_CONCAVE }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center gap-3 mt-6">
                {product.liveUrl ? (
                  <Link
                    href={product.liveUrl}
                    className="inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white px-5 py-2.5 rounded-full font-bold text-[15px] transition-colors duration-300 hover:bg-[#B5E64D] hover:text-[#0a0a0a]"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    Try it
                    <MdArrowOutward size={16} />
                  </Link>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#e9eef4] text-[#8a8a94] px-5 py-2.5 rounded-full font-bold text-[15px] cursor-not-allowed"
                    style={{ fontFamily: "var(--font-primary)", boxShadow: SHADOW_CONCAVE }}
                    title="Not available yet"
                  >
                    Not live yet
                  </span>
                )}
                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#e6ebf2] text-[#0a0a0a] transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
                    style={{ boxShadow: SHADOW_CONVEX }}
                    aria-label={`${product.name} on GitHub`}
                  >
                    <FiGithub size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}