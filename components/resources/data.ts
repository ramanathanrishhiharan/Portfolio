export type ResourceType = "pdf" | "doc" | "link";

export type Resource = {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  thumbnail?: string;
  meta: string;
  accent: string;
};

export const resources: Resource[] = [
  {
    slug: "hr-policy-template",
    title: "HR Policy Template",
    description:
      "A ready-to-use HR policy document covering the essentials, leave, conduct, and onboarding, so you're not starting from a blank page.",
    type: "link",
    category: "HR",
    href: "/free_resources/for_HR",
    thumbnail: "/hr.png",
    meta: "Link",
    accent: "#B5E64D",
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(resources.map((r) => r.category))),
];