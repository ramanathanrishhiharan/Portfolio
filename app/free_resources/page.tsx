import type { Metadata } from "next";
import ResourcesHero from "@/components/resources/Hero";
import ResourcesGrid from "@/components/resources/ResourcesGrid";
import ResourcesCTA from "@/components/resources/ResourcesCTA";

export const metadata: Metadata = {
  title: "Free Resources | Rishiharan",
  description:
    "Free templates, checklists, and scripts for freelancers and developers, built by Rishiharan and shared with no signup required.",
};

export default function ResourcesPage() {
  return (
    <main className="w-full">
      <ResourcesHero />
      <ResourcesGrid />
      <ResourcesCTA />
    </main>
  );
}