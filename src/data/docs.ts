import { DocSection } from "@/types";

export const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn how to install, configure, and integrate DSM into your Next.js and React applications.",
    subsections: [
      {
        id: "installation",
        title: "Installation & Setup",
        content:
          "DSM is packaged as a token-first architecture designed to integrate cleanly with modern Next.js and Tailwind CSS codebases. You can clone the starter kit or copy the centralized tokens directly into your project.",
        code: `# Clone or install DSM starter dependencies
npm install lucide-react
npm install @tailwindcss/postcss tailwindcss`,
      },
      {
        id: "tokens-import",
        title: "Importing CSS Tokens",
        content:
          "Include DSM root variables in your global stylesheet. This establishes standard background shades (#171717, #202020), text values (#F5F5F2, #A7A7A1), mint green (#43C58B), warm orange (#FF8045), golden yellow (#FFC94A), and borders (#353535).",
        code: `/* In your globals.css */
@import "tailwindcss";

:root {
  --dsm-bg: #171717;
  --dsm-bg-secondary: #202020;
  --dsm-bg-card: #242424;
  --dsm-text: #F5F5F2;
  --dsm-text-muted: #A7A7A1;
  --dsm-mint: #43C58B;
  --dsm-orange: #FF8045;
  --dsm-yellow: #FFC94A;
  --dsm-border: #353535;
}`,
      },
    ],
  },
  {
    id: "principles",
    title: "Design Principles",
    description: "The core design tenets guiding every decision, layout, and component in DSM.",
    subsections: [
      {
        id: "editorial-discipline",
        title: "1. Editorial Discipline",
        content:
          "DSM adopts an editorial aesthetic rooted in print design traditions: high-contrast typography, strict geometric alignment, deliberate whitespace, and fine grid structures. We avoid generic SaaS gradients, oversaturated floating cards, and artificial decorative flair.",
      },
      {
        id: "token-driven",
        title: "2. Token-Driven Consistency",
        content:
          "No hardcoded colors or ad-hoc margins. Every visual attribute is derived from an audited token scale. Changes propagate predictably across components, themes, and screen sizes.",
      },
      {
        id: "practical-accessibility",
        title: "3. Accessibility as Architecture",
        content:
          "Accessibility is not a cosmetic patch applied at the end. Focus states, high contrast ratios (WCAG 2.2 AA compliant), keyboard loops, and native HTML semantics are engineered into every primitive from day one.",
      },
    ],
  },
  {
    id: "tokens",
    title: "Design Tokens",
    description: "Detailed specification of DSM's atomic design variables.",
    subsections: [
      {
        id: "color-system",
        title: "Color System Specification",
        content:
          "The palette utilizes a deep #171717 canvas that eliminates harsh pure-black eye strain while preserving deep contrast. Key accents include #43C58B (mint), #FF8045 (warm orange), and #FFC94A (golden yellow). Purple gradients and decorative glows are strictly avoided.",
        code: `// Tailwind CSS token mapping
{
  "colors": {
    "dsm-bg": "#171717",
    "dsm-bg-secondary": "#202020",
    "dsm-text": "#F5F5F2",
    "dsm-text-muted": "#A7A7A1",
    "dsm-mint": "#43C58B",
    "dsm-orange": "#FF8045",
    "dsm-yellow": "#FFC94A",
    "dsm-border": "#353535"
  }
}`,
      },
      {
        id: "spacing-rhythm",
        title: "Spacing & Vertical Rhythm",
        content:
          "Spacing follows a 4px base modular scale. Component internal paddings use 8px, 12px, and 16px. Section vertical separation uses 48px, 64px, and 96px for deliberate editorial pacing.",
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility Standards (WCAG 2.2 AA)",
    description: "Practical compliance guidelines for developers and designers implementing DSM.",
    subsections: [
      {
        id: "keyboard-navigation",
        title: "Keyboard Traversal & Focus Rings",
        content:
          "Every interactive element is reachable via standard Tab navigation and operable via Enter or Space. Focus rings use an offset 2px solid mint outline (#43C58B) with high visibility on both light and dark backgrounds.",
      },
      {
        id: "screen-readers",
        title: "Screen Reader Contracts & ARIA",
        content:
          "Native HTML elements (<button>, <a>, <input>, <nav>, <header>, <main>) are preferred over generic <div> tags with ARIA overlays. Dynamic states use aria-expanded, aria-controls, and aria-live where appropriate.",
      },
      {
        id: "contrast-verification",
        title: "Contrast Ratio Audit",
        content:
          "Primary text (#F5F5F2) achieves 13.8:1 contrast on #171717 (surpassing the 4.5:1 WCAG AA and 7:1 AAA thresholds). Secondary text (#A7A7A1) achieves 6.8:1 contrast. Mint (#43C58B) achieves 8.4:1 contrast.",
      },
    ],
  },
  {
    id: "contributing",
    title: "Contributing Guidelines",
    description: "How to propose new components, suggest token refinements, and report bugs.",
    subsections: [
      {
        id: "component-criteria",
        title: "Criteria for New Components",
        content:
          "Before submitting a component, verify: 1) It solves a recurring pattern across at least three distinct layouts; 2) It supports keyboard navigation; 3) It has strict TypeScript prop types; 4) It supports dark canvas rendering without hardcoded styles.",
      },
      {
        id: "pull-request-workflow",
        title: "Pull Request & Review Process",
        content:
          "Open an issue detailing the use case, component API proposal, and accessibility considerations before creating a pull request. Include automated unit and type checks with your contribution.",
      },
    ],
  },
];
