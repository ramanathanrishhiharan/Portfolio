export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "Live" | "Beta" | "In Progress";
  liveUrl?: string;
  githubUrl?: string;
  accent: string; // tailwind-safe hex used for the card's tint
};

// Replace the placeholder entries with your real products.
// `slug` must match the folder name in app/products/[slug]
export const products: Product[] = [
  {
    slug: "apix",
    name: "Apix",
    tagline: "A camera app that doesn't try to do everything badly.",
    description:
      "Built for Android with Expo. Fast capture, clean UI, no fifteen filters you'll never use.",
    stack: ["Expo", "React Native"],
    status: "Live",
    liveUrl: "/products/apix",
    githubUrl: "https://github.com/ramanathanrishhiharan",
    accent: "#B5E64D",
  },
  {
    slug: "freelanceos",
    name: "FreelanceOS",
    tagline: "One dashboard for the freelance chaos nobody warns you about.",
    description:
      "Clients, invoices, and tasks in one place instead of six tabs and a notes app.",
    stack: ["Next.js", "TypeScript", "TanStack Query"],
    status: "In Progress",
    liveUrl: "",
    githubUrl: "https://github.com/ramanathanrishhiharan",
    accent: "#EFF7E3",
  },
];
