"use client"
import * as React from "react"
import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"

const containerVariant = {
  hidden: { opacity: 0 },
  show: (stagger: number) => ({
    opacity: 1,
    transition: { staggerChildren: stagger },
  }),
}

const letterAnimation = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: { opacity: 1, filter: "blur(0px)" },
}

const letterAnimationReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [breakpoint])

  return isSmall
}

// Decode the common HTML entities people paste into string literals
// (e.g. text="I&apos;m" / text="AI &amp; ML") and collapse any
// newlines/double-spaces left over from multi-line JSX string literals.
function normalizeText(raw: string) {
  const decoded = raw
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")

  return decoded.replace(/\s+/g, " ").trim()
}

export function BlurredStagger({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isSmallScreen = useIsSmallScreen()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // fire once, never reset
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stagger = isSmallScreen ? 0.008 : 0.015
  const duration = isSmallScreen ? 0.3 : 0.4

  const cleanText = useMemo(() => normalizeText(text), [text])
  const words = useMemo(() => cleanText.split(" "), [cleanText])

  const charVariant = prefersReducedMotion ? letterAnimationReduced : letterAnimation

  let globalIndex = 0

  return (
    <motion.span
      ref={ref}
      variants={containerVariant}
      custom={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
      role="text"
      aria-label={cleanText}
      style={{
        display: "inline",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {/* Hidden from assistive tech: the animated per-letter spans are
          purely visual. aria-label above carries the real text so screen
          readers announce it as one phrase instead of letter-by-letter. */}
      <span aria-hidden="true">
        {words.map((word, wIdx) => (
          <React.Fragment key={wIdx}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char) => {
                const key = globalIndex++
                return (
                  <motion.span
                    key={key}
                    variants={charVariant}
                    transition={{ duration }}
                    style={{ display: "inline-block", willChange: "filter, opacity" }}
                  >
                    {char}
                  </motion.span>
                )
              })}
            </span>
            {wIdx < words.length - 1 && (
              <motion.span
                variants={charVariant}
                transition={{ duration }}
                style={{ display: "inline-block" }}
              >
                {"\u00A0"}
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </span>
    </motion.span>
  )
}