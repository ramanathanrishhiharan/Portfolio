// components/booking/SlotButton.tsx
"use client";
import React from "react";

type SlotButtonProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  /** "default" = time-slot sizing, "compact" = tighter day-pill sizing */
  size?: "default" | "compact";
};

// Same neumorphic language as KeyButton, resized/flattened for a text label
// (time slot, day, etc.) instead of an icon square.
export function SlotButton({
  label,
  selected = false,
  disabled = false,
  onClick,
  size = "default",
}: SlotButtonProps) {
  const sizeClasses =
    size === "compact"
      ? "h-11 min-w-0 rounded-xl px-3.5"
      : "h-14 min-w-[92px] rounded-2xl px-4";
  const innerRadius = size === "compact" ? "rounded-[10px]" : "rounded-[14px]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={
        "group relative bg-[#e6ebf2] outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/40 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0.5 " +
        sizeClasses
      }
      style={{
        boxShadow: selected
          ? "0 0 30px 6px rgba(181,230,77,0.45), -8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)"
          : "-8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)",
      }}
    >
      {/* inner recessed face */}
      <span
        className={
          "pointer-events-none absolute inset-[6px] bg-[#e9eef4] transition-shadow duration-150 group-active:[box-shadow:inset_3px_3px_8px_rgba(163,177,198,0.5),inset_-3px_-3px_8px_rgba(255,255,255,0.9)] " +
          innerRadius
        }
        style={{
          boxShadow:
            "-3px -3px 8px rgba(255,255,255,0.9), 3px 3px 8px rgba(163,177,198,0.4)",
        }}
      />
      <span
        className={
          "relative text-[14px] font-bold tabular-nums transition-colors " +
          (selected ? "text-[#0a0a0a]" : "text-slate-500")
        }
      >
        {label}
      </span>
    </button>
  );
}