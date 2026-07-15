import Hero from "@/components/Hero";
import CrossingMarquee from "@/components/Infinite";
import ProblemSection from "@/components/Problem";
import ProjectsSection from "@/components/Projects";
import DeliversSection from "@/components/Deliver";
import { NumbersSection } from "@/components/Numbersection";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/Contact";
import { BookACallPage } from "@/components/motiongraphics/bookpage";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ProjectsSection />
      <DeliversSection />
      <NumbersSection />
      <Testimonials />

      {/* <CrossingMarquee /> */}
      {/* <ContactSection /> */}
       <BookACallPage />
    </>
  );
}
