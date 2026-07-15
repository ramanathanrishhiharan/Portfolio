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
    slug: "hr-personal-brand-guide",
    title: "HR Personal Brand Growth Guide",
    description:
      "A practical guide to help HR professionals build authority on LinkedIn, create valuable content, grow their network, and attract better career opportunities.",
    type: "link",
    category: "HR",
    href: "/free_resources/hr-personal-brand-guide",
    thumbnail: "/hr43.png",
    meta: "Guide",
    accent: "#B5E64D",
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(resources.map((r) => r.category))),
];
