'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
type Variant = 'green' | 'light' | 'dark'
interface StatCardProps {
  target: number
  decimals?: number
  suffix?: string
  superscript: string
  description: string
  variant: Variant
  delay?: number
}
const variantStyles: Record<
  Variant,
  {
    bg: string
    text: string
    sub: string
    border: string
    shadow: string
  }
> = {
  // Same highlight-on-top / shadow-below depth language used across the site
  // (KeyButton / SlotButton / Navbar / cards), re-tuned for this dark section:
  // a soft white sheen along the top edge plus a real drop shadow into the
  // black background, instead of the light-surface neumorphic pairing.
  green: {
    bg: 'bg-[#B5E64D]',
    text: 'text-neutral-900',
    sub: 'text-neutral-800/80',
    border: 'border-transparent',
    shadow:
      '0 16px 40px -12px rgba(181,230,77,0.5), inset 0 1px 0 rgba(255,255,255,0.5)',
  },
  light: {
    bg: 'bg-neutral-100',
    text: 'text-neutral-900',
    sub: 'text-neutral-600',
    border: 'border-transparent',
    shadow:
      '0 16px 36px -14px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.6)',
  },
  dark: {
    bg: 'bg-neutral-900',
    text: 'text-white',
    sub: 'text-neutral-400',
    border: 'border-white/10',
    shadow:
      '0 12px 30px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
}
export function StatCard({
  target,
  decimals = 0,
  suffix = '',
  superscript,
  description,
  variant,
  delay = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')
  const styles = variantStyles[variant]
  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.4,
      delay: delay + 0.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, target, decimals, delay, count])
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 28,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative rounded-2xl border ${styles.border} ${styles.bg} p-6 sm:p-7 overflow-hidden`}
      style={{ boxShadow: styles.shadow }}
    >
      <div className="flex items-start gap-1">
        <span
          className={`font-extrabold tracking-tight leading-none ${styles.text} text-5xl sm:text-6xl`}
        >
          {display}
          {suffix}
        </span>
        <span
          className={`font-bold ${styles.text} text-base sm:text-lg leading-tight mt-1 max-w-[7rem]`}
        >
          {superscript}
        </span>
      </div>
      <p className={`mt-8 text-sm font-medium leading-snug ${styles.sub}`}>
        {description}
      </p>
    </motion.div>
  )
}