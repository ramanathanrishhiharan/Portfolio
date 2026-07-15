"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { MdArrowOutward } from "react-icons/md";
import { FiFileText, FiFile, FiLink } from "react-icons/fi";
import { resources, categories, type Resource } from "./data";

function TypeIcon({ type, size = 14 }: { type: Resource["type"]; size?: number }) {
  if (type === "pdf") return <FiFileText size={size} />;
  if (type === "doc") return <FiFile size={size} />;
  return <FiLink size={size} />;
}

function actionLabel(type: Resource["type"]) {
  if (type === "pdf") return "View PDF";
  if (type === "doc") return "Open Doc";
  return "Open link";
}

export default function ResourcesGrid() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? resources : resources.filter((r) => r.category === active);

  return (
    <section id="library" className="w-full px-3 sm:px-4 py-20 sm:py-28">
      <div className="w-full max-w-350 mx-auto px-5 sm:px-10 md:px-16 xl:px-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2
            className="text-[32px] sm:text-[42px] font-semibold text-[#0a0a0a] m-0"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            The library
          </h2>
          <p
            className="text-[18px] text-[#5b5959] font-medium max-w-100"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Everything here is something I made for my own work first, then
            cleaned up enough to share.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.length > 2 &&
            categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[15px] font-bold px-4 py-2 rounded-full transition-colors duration-300 ${
                  active === cat
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-[#f0f0ec] text-[#5b5959] hover:bg-[#e5e5df]"
                }`}
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {cat}
              </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((resource, i) => (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease: "easeOut" }}
              className="group relative rounded-[28px] bg-[#f7f7f5] overflow-hidden flex flex-col"
            >
              <div className="relative h-40 w-full overflow-hidden">
                {resource.thumbnail ? (
                  <Image
                    src={resource.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${resource.accent}, #ffffff)`,
                    }}
                  >
                    <TypeIcon type={resource.type} size={40} />
                  </div>
                )}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0a0a0a] bg-white/90 px-2.5 py-1 rounded-full">
                  <TypeIcon type={resource.type} size={12} />
                  {resource.meta}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-[20px] font-bold text-[#0a0a0a] m-0 leading-snug"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {resource.title}
                </h3>
                <p
                  className="text-[16px] text-[#5b5959] mt-2 leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {resource.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#0a0a0a] hover:text-[#4d6b1e] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {actionLabel(resource.type)}
                    <MdArrowOutward size={16} />
                  </a>
                  {resource.secondaryHref && (
                    <a
                      href={resource.secondaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#5b6b45] hover:text-[#4d6b1e] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {resource.secondaryLabel ?? "Open link"}
                      <MdArrowOutward size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visible.length === 0 && (
          <p
            className="text-[18px] text-[#5b5959] text-center py-16"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Nothing here yet.
          </p>
        )}
      </div>
    </section>
  );
}