"use client";

import HeroSection from "@/components/mobile/Herosection";
import AboutSection from "@/components/mobile/Aboutsection";
import CTASection from "@/components/mobile/Ctasection";
import { useSmoothScroll } from "@/hooks/Usesmoothscroll";

export default function Home() {
  useSmoothScroll();

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <CTASection />
    </main>
  );
}
