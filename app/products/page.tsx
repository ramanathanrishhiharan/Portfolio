import type { Metadata } from "next";
import ProductsHero from "@/components/product/Hero";
import ProductsGrid from "@/components/product/Productgrid";
import ProductsCTA from "@/components/product/Productcta";
import { ContactSection } from "@/components/Contact";
import { BookACallPage } from "@/components/motiongraphics/bookpage";

export const metadata: Metadata = {
  title: "Free Products | Rishiharan",
  description:
    "Free apps and web tools built by Rishiharan. Live, usable, and free, no sign-up required.",
};

export default function ProductsPage() {
  return (
    <main className="w-full">
      <ProductsHero />
      <ProductsGrid />
      <BookACallPage />
    </main>
  );
}