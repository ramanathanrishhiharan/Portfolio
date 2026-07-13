// components/SmoothScrollProvider.tsx
"use client";

import { useSmoothScroll } from "@/hooks/Usesmoothscroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  return <>{children}</>;
}