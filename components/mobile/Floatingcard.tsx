"use client";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  className?: string;
  style?: React.CSSProperties;
  depth?: number; // 0-1, how strongly it reacts to mouse tilt (higher = floats more)
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  delay?: number;
  children: ReactNode;
}

/**
 * A single "ledger" card that drifts gently with the cursor.
 * Depth controls how far it travels relative to the mouse position,
 * so cards closer to the "camera" feel lighter/faster than background ones.
 */
export default function FloatingCard({
  className = "",
  style,
  depth = 0.5,
  mouseX,
  mouseY,
  delay = 0,
  children,
}: FloatingCardProps) {
  const rawX = useTransform(mouseX, [-1, 1], [-14 * depth, 14 * depth]);
  const rawY = useTransform(mouseY, [-1, 1], [-10 * depth, 10 * depth]);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  return (
    <motion.div
      data-parallax-card
      style={{ ...style, x, y }}
      initial={{ opacity: 0, y: (style?.top ? 30 : -30), scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_45px_-15px_rgba(14,17,22,0.35)] px-4 py-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}