import {
  MdStorefront,
  MdBolt,
  MdCode,
  MdTrackChanges,
  MdCancel,
  MdLocationOn,
  MdBarChart,
} from "react-icons/md"
import { SiOpenai } from "react-icons/si"
import { FaRocket } from "react-icons/fa"
import type { IconType } from "react-icons"
import { BlurredStagger } from "./blurtext"

// ─── Types ───────────────────────────────────────────────────────────────────

interface PillProps {
  icon: IconType
  label: string
  size?: "normal" | "featured"
}

// ─── Pill component ───────────────────────────────────────────────────────────
// Each pill = green circle icon + label text inside a light rounded rectangle

function Pill({ icon: Icon, label, size = "normal" }: PillProps) {
  const isFeatured = size === "featured"

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-full bg-[#f0f0f0] font-semibold text-[#0a0a0a] select-none",
        // Featured (middle row): slightly larger padding + text
        isFeatured
          ? "px-5 py-3 text-[20px] md:text-[22px]"
          : "px-4 py-2.5 text-[18px] md:text-[20px]",
      ].join(" ")}
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Green circle with white icon */}
      <span
        className={[
          "rounded-full bg-[#B5E64D] flex items-center justify-center shrink-0",
          isFeatured ? "w-11 h-11" : "w-10 h-10",
        ].join(" ")}
      >
        <Icon size={isFeatured ? 24 : 20} color="#0a0a0a" />
      </span>
      {label}
    </div>
  )
}

// ─── Row wrapper — middle row gets a forward nudge via translateX ─────────────

function PillRow({
  children,
  featured = false,
}: {
  children: React.ReactNode
  featured?: boolean
}) {
  return (
    <div
      className={[
        "flex flex-wrap gap-3 md:gap-4",
        // Desktop: centre all rows. On featured row push it forward slightly.
        "md:justify-center",
        // Mobile: left-align per spec
        "justify-start",
        featured ? "md:translate-x-6" : "",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function DeliversSection() {
  return (
    <section
      className="w-full max-w-[1200px] mx-auto px-6 md:px-16 xl:px-20 py-20 flex flex-col gap-10"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Headline */}
      <h2
        className="text-[42px] md:text-[64px] font-bold leading-[1.1] text-[#0a0a0a] text-left md:text-center"
      >
        <BlurredStagger text="The developer" />
        <br />
        <BlurredStagger text="that delivers" />
        
      </h2>

      {/* ── Pills grid ── */}
      <div className="flex flex-col gap-4 md:gap-5">

        {/* Row 1 — normal */}
        <PillRow>
          <Pill icon={MdStorefront}  label="Business First" />
          <Pill icon={MdBolt}        label="Ships Fast" />
          <Pill icon={MdCode}        label="Clean Code" />
        </PillRow>

        {/* Row 2 — featured (pushed forward, slightly larger) */}
        <PillRow featured>
          <Pill icon={MdTrackChanges} label="Product Thinker" size="featured" />
          <Pill icon={MdCancel}       label="No Bloat"        size="featured" />
          <Pill icon={MdLocationOn}   label="On-site & Remote" size="featured" />
        </PillRow>

        {/* Row 3 — normal */}
        <PillRow>
          <Pill icon={SiOpenai}   label="AI-Ready" />
          <Pill icon={MdBarChart} label="SEO Aware" />
          <Pill icon={FaRocket}   label="Startup Minded" />
        </PillRow>

      </div>

      {/* Footer paragraph */}
      <p className="text-[18px] text-[#5b5959] leading-relaxed text-left md:text-center max-w-[560px] mx-auto">
        <BlurredStagger text="This works because I don&apos;t just build what you ask for,
        " /><br/>
        <BlurredStagger text="I build what your business actually needs." />
        
      </p>
    </section>
  )
}