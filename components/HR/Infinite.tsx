'use client'
import React, { useRef, useState, ComponentType } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import {
  CalendarCheckIcon,
  CreditCardIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  ClockIcon,
  UsersIcon,
  ZapIcon,
  BadgeCheckIcon,
} from 'lucide-react'

type Outcome = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  text: string
}

const OUTCOMES: Outcome[] = [
  { icon: CreditCardIcon, text: 'Paid before the call' },
  { icon: CalendarCheckIcon, text: 'A calendar that fills itself' },
  { icon: MessageCircleIcon, text: 'DMs that turn into clients' },
  { icon: TrendingUpIcon, text: 'Followers that finally convert' },
  { icon: ClockIcon, text: 'No more chasing payments' },
  { icon: UsersIcon, text: 'Warm leads on autopilot' },
  { icon: ZapIcon, text: 'Booked in under a minute' },
  { icon: BadgeCheckIcon, text: 'Consultations you get paid for' },
]

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-4 pr-4">
      {OUTCOMES.map(({ icon: Icon, text }, i) => (
        <div
          key={`${text}-${i}`}
          className="flex shrink-0 items-center gap-3 rounded-full border border-(--color-border) bg-background px-6 py-3.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-accent)">
            <Icon className="h-4 w-4 text-foreground" strokeWidth={2.25} />
          </span>
          <span className="whitespace-nowrap text-base font-semibold text-foreground">
            {text}
          </span>
        </div>
      ))}
    </div>
  )
}

export function OutcomesMarquee() {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const baseVelocity = -40 // px per second, negative = scrolls left

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return

    const trackWidth = trackRef.current.getBoundingClientRect().width
    let newX = x.get() + (baseVelocity * delta) / 1000

    // Wrap seamlessly once we've scrolled past one full track width
    if (newX <= -trackWidth) {
      newX += trackWidth
    }

    x.set(newX)
  })

  return (
    <section className="w-full overflow-hidden bg-[#ffffff] py-6">
      <div
        className="relative flex w-full"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div className="flex items-center" style={{ x }}>
          <div ref={trackRef} className="flex shrink-0 items-center">
            <Track />
          </div>
          <Track ariaHidden />
        </motion.div>
      </div>
    </section>
  )
}