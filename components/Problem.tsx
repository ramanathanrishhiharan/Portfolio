import { FaRocket, FaReact, FaGlobe, FaLaptopCode } from "react-icons/fa"
import { SiClaude, SiSquare } from "react-icons/si"
import { BlurredStagger } from "./blurtext"

// Corrected shadow: x:-2, y:12, blur:22.3, spread:2, black 25%
const SHADOW = {
  boxShadow: "-2px 12px 22.3px 2px rgba(0,0,0,0.25)",
}

function IconBox({
  children,
  rotate = 0,
  small = false,
}: {
  children: React.ReactNode
  rotate?: number
  small?: boolean
}) {
  return (
    <div
      className={`${
        small ? "w-16 h-16 rounded-xl" : "w-22 h-22 rounded-2xl"
      } bg-white flex items-center justify-center shrink-0`}
      style={{
        ...SHADOW,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Ghost() {
  return <div className="w-22 h-22 shrink-0" aria-hidden />
}

const problems = [
  {
    quote: '"Getting traffic but no customers?"',
    answer: "I’ll turn your website into a conversion engine.",
  },
  {
    quote: '“Can’t find a tool that fits your workflow?”',
    answer: "I build exactly what you need.",
  },
  {
    quote: '"Want AI in your product but not sure how?"',
    answer: "I’ll integrate AI where it actually adds value.",
  },
]

const mobileRows = [
  {
    icon: <FaRocket size={24} color="#E8453C" />,
    rotate: -6,
    quote: '"Getting traffic but no customers?"',
    answer: "I’ll turn your website into a conversion engine.",
  },
  {
    icon: <FaLaptopCode size={24} color="#2563EB" />,
    rotate: 5,
    quote: '“Can’t find a tool that fits your workflow?”',
    answer: "I build exactly what you need.",
  },
  {
    icon: <SiClaude size={24} color="#D97706" />,
    rotate: -4,
    quote: '"Want AI in your product but not sure how?"',
    answer: "I’ll integrate AI where it actually adds value.",
  },
  {
    icon: <FaGlobe size={24} color="#2563EB" />,
    rotate: 6,
    quote: '"Have an idea but don’t know where to start?"',
    answer: "I’ll turn it into a clear, buildable product.",
  },
]

export default function ProblemSection() {
  return (
    <section
      className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16 py-16 md:py-32 flex flex-col items-center gap-10 md:gap-16"
      style={{ fontFamily: "var(--font-primary)" }}
    >

      {/* ══════════════════════════════════════
          MOBILE LAYOUT (below md)
          Left-aligned headline + icon-paired rows
          ══════════════════════════════════════ */}
      <div className="flex md:hidden flex-col gap-6 w-full">
        <h2 className="text-[30px] font-bold leading-[1.15] text-[#0a0a0a]">
           <BlurredStagger text="I don&apos;t just write code." />
          <br />
          <BlurredStagger text="I solve problems." />
          
        </h2>

        {mobileRows.map(({ icon, rotate, quote, answer }) => (
          <div key={answer} className="flex items-start gap-4">
            <IconBox small rotate={rotate}>
              {icon}
            </IconBox>
            <div className="flex flex-col gap-1 pt-1">
              <p className="text-[18px] text-[#5b5959] leading-snug">{quote}</p>
              <p className="text-[18px] font-semibold text-[#0a0a0a]">{answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          DESKTOP TOP CLUSTER (md and up)
          ══════════════════════════════════════ */}
      <div className="hidden md:flex flex-col items-center gap-10">
        <div className="flex items-end justify-center gap-10">
          <Ghost />
          <IconBox rotate={-6}>
            <FaRocket size={56} color="#E8453C" />
          </IconBox>
          <Ghost />
        </div>

        <div className="flex items-center justify-center gap-20 md:gap-56">
          <IconBox rotate={-8}>
            <FaLaptopCode size={50} color="#2563EB" />
          </IconBox>

          <div className="w-55 text-center flex flex-col gap-2">
            <p className="text-[18px] text-[#5b5959] leading-snug">
              &ldquo;Have an idea but <br />
              don’t know where to start?
            </p>
            <p className="text-[18px] font-semibold text-[#0a0a0a]">
              I’ll turn it into a clear, buildable product.
            </p>
          </div>

          <IconBox rotate={8}>
            <FaReact size={58} color="#61DAFB" />
          </IconBox>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP BIG HEADLINE (md and up)
          ══════════════════════════════════════ */}
      <h2 className="hidden md:block text-[42px] md:text-[64px] font-bold leading-[1.1] text-[#0a0a0a] text-center">
        <BlurredStagger text="I don&apos;t just write code." /><br />
        <BlurredStagger text="I solve problems." />
        
      </h2>

      {/* ══════════════════════════════════════
          DESKTOP THREE PROBLEM STATEMENTS (md and up)
          ══════════════════════════════════════ */}
      <div className="hidden md:grid grid-cols-3 gap-10 w-full max-w-215 text-center">
        {problems.map(({ quote, answer }) => (
          <div key={answer} className="flex flex-col gap-2">
            <p className="text-[18px] text-[#5b5959] leading-snug">{quote}</p>
            <p className="text-[18px] font-semibold text-[#0a0a0a]">{answer}</p>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          DESKTOP BOTTOM CLUSTER (md and up)
          ══════════════════════════════════════ */}
      <div className="hidden md:flex flex-col items-center gap-10">
        <div className="flex items-center justify-center gap-20 md:gap-56">
          <IconBox rotate={-6}>
            <FaGlobe size={56} color="#2563EB" />
          </IconBox>

          <div className="w-22 h-22 shrink-0" aria-hidden />

          <IconBox rotate={6}>
            <SiClaude size={56} color="#D97706" />
          </IconBox>
        </div>

        <div className="flex items-center justify-center gap-10">
          <Ghost />
          <IconBox rotate={-4}>
            <SiSquare size={56} color="#22C55E" />
          </IconBox>
          <Ghost />
        </div>
      </div>

    </section>
  )
}