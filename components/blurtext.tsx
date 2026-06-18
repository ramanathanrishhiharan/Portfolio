"use client"
import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.015 },
  },
}

const letterAnimation = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show:   { opacity: 1, filter: "blur(0px)" },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // fire once, never reset
        }
      },
      { threshold: 0.1,rootMargin: "0px 0px -25% 0px"  }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
      style={{ display: "inline" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterAnimation}
          transition={{ duration: 0.4 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}