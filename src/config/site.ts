export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const siteConfig = {
  name: "DSM.",
  brandName: "DSM",
  fullName: "Design System for Modern Products",
  tagline: "Build better products. Faster.",
  description:
    "A thoughtfully crafted design system and UI resource library that helps designers and developers create consistent digital experiences through reusable components, clear design foundations, and practical documentation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dsm-design-system.local",
  links: {
    github: "https://github.com/dsm-design-system",
  },
  mainNav: [
    {
      title: "Resources",
      href: "/resources",
      description: "Searchable directory of design specs, kits, and tokens",
    },
    {
      title: "Components",
      href: "/components",
      description: "Accessible, interactive UI building blocks",
    },
    {
      title: "Documentation",
      href: "/docs",
      description: "Guides, design foundations, and implementation specs",
    },
    {
      title: "About",
      href: "/about",
      description: "Brand principles, architecture, and design rationale",
    },
  ] satisfies NavItem[],
  footerNav: {
    product: [
      { title: "Components", href: "/components" },
      { title: "Resources", href: "/resources" },
      { title: "Documentation", href: "/docs" },
      { title: "Design Foundations", href: "/#foundations" },
    ],
    company: [
      { title: "About DSM", href: "/about" },
      { title: "Design Principles", href: "/docs#principles" },
      { title: "Accessibility Standard", href: "/docs#accessibility" },
      { title: "Contributing", href: "/docs#contributing" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms & Conditions", href: "/terms" },
    ],
  },
  currentYear: new Date().getFullYear(),
};
