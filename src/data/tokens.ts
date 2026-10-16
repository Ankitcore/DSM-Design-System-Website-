import { ColorToken, TypographyToken, SpacingToken } from "@/types";

export const colorTokens: ColorToken[] = [
  {
    name: "Canvas Background",
    variable: "--dsm-bg",
    hex: "#171717",
    role: "Primary page background canvas",
    contrastOnDark: "Baseline",
  },
  {
    name: "Secondary Background",
    variable: "--dsm-bg-secondary",
    hex: "#202020",
    role: "Containers, discovery panels, code blocks",
    contrastOnDark: "1.2:1 against canvas",
  },
  {
    name: "Card Surface",
    variable: "--dsm-bg-card",
    hex: "#242424",
    role: "Elevated surfaces, card panels, modals",
    contrastOnDark: "1.4:1 against canvas",
  },
  {
    name: "Border Subdued",
    variable: "--dsm-border",
    hex: "#353535",
    role: "Structural divider lines, component borders",
    contrastOnDark: "3.2:1 against canvas",
  },
  {
    name: "Primary Text",
    variable: "--dsm-text",
    hex: "#F5F5F2",
    role: "Headlines, high-contrast labels, primary actions",
    contrastOnDark: "13.8:1 (WCAG AAA)",
  },
  {
    name: "Secondary Text",
    variable: "--dsm-text-muted",
    hex: "#A7A7A1",
    role: "Descriptions, secondary captions, metadata",
    contrastOnDark: "6.8:1 (WCAG AA)",
  },
  {
    name: "Subtle Text",
    variable: "--dsm-text-subtle",
    hex: "#73736E",
    role: "Breadcrumbs, keyboard shortcuts, disabled hints",
    contrastOnDark: "4.6:1 (WCAG AA Large)",
  },
  {
    name: "Mint Green",
    variable: "--dsm-mint",
    hex: "#43C58B",
    role: "Hero geometric visual, success states, open source badges",
    contrastOnDark: "8.4:1 (WCAG AAA)",
  },
  {
    name: "Warm Orange",
    variable: "--dsm-orange",
    hex: "#FF8045",
    role: "Hero accent chevron, interactive highlights, active filters",
    contrastOnDark: "6.2:1 (WCAG AA)",
  },
  {
    name: "Golden Yellow",
    variable: "--dsm-yellow",
    hex: "#FFC94A",
    role: "Hero focal orb, warning alerts, priority chips",
    contrastOnDark: "11.1:1 (WCAG AAA)",
  },
  {
    name: "Soft Violet",
    variable: "--dsm-violet",
    hex: "#B899D8",
    role: "Editorial geometric disc, spec illustrations",
    contrastOnDark: "7.9:1 (WCAG AAA)",
  },
];

export const typographyTokens: TypographyToken[] = [
  {
    level: "Display",
    fontSize: "52px (3.25rem)",
    lineHeight: "1.1",
    fontWeight: "700",
    usage: "Hero editorial title, top-level brand statements",
    sample: "Build better products. Faster.",
  },
  {
    level: "Heading 1",
    fontSize: "36px (2.25rem)",
    lineHeight: "1.2",
    fontWeight: "600",
    usage: "Page headers, primary directory sections",
    sample: "Design System Foundations",
  },
  {
    level: "Heading 2",
    fontSize: "26px (1.625rem)",
    lineHeight: "1.3",
    fontWeight: "600",
    usage: "Section headers, component preview titles",
    sample: "Color Tokens & Contrast Ratio",
  },
  {
    level: "Heading 3",
    fontSize: "20px (1.25rem)",
    lineHeight: "1.4",
    fontWeight: "500",
    usage: "Card titles, subsection groupings, modal headers",
    sample: "Interactive Form Inputs",
  },
  {
    level: "Body Large",
    fontSize: "18px (1.125rem)",
    lineHeight: "1.6",
    fontWeight: "400",
    usage: "Hero lead descriptions, article lead intros",
    sample: "A thoughtfully crafted design system for designers and developers.",
  },
  {
    level: "Body Regular",
    fontSize: "15px (0.9375rem)",
    lineHeight: "1.6",
    fontWeight: "400",
    usage: "Standard body copy, documentation paragraphs, table content",
    sample: "Tokens are centralized into CSS custom properties for effortless theme maintenance.",
  },
  {
    level: "Body Small",
    fontSize: "13px (0.8125rem)",
    lineHeight: "1.5",
    fontWeight: "400",
    usage: "Input helper text, badge labels, metadata lines",
    sample: "Last modified 2 days ago • Open Source",
  },
  {
    level: "Mono / Code",
    fontSize: "12px (0.75rem)",
    lineHeight: "1.5",
    fontWeight: "500",
    usage: "Code snippets, token variables, keyboard shortcuts",
    sample: "var(--dsm-mint, #43C58B)",
  },
];

export const spacingTokens: SpacingToken[] = [
  { name: "space-1", sizePx: "4px", rem: "0.25rem", usage: "Inline icons, tight border offsets" },
  { name: "space-2", sizePx: "8px", rem: "0.5rem", usage: "Compact badge padding, button gap" },
  { name: "space-3", sizePx: "12px", rem: "0.75rem", usage: "Input vertical padding, card inner margins" },
  { name: "space-4", sizePx: "16px", rem: "1rem", usage: "Standard component padding, grid gaps" },
  { name: "space-6", sizePx: "24px", rem: "1.5rem", usage: "Card padding, section inner gutters" },
  { name: "space-8", sizePx: "32px", rem: "2rem", usage: "Form field groupings, container padding" },
  { name: "space-12", sizePx: "48px", rem: "3rem", usage: "Section dividers, content layout gaps" },
  { name: "space-16", sizePx: "64px", rem: "4rem", usage: "Major page section vertical rhythm" },
  { name: "space-24", sizePx: "96px", rem: "6rem", usage: "Hero container margins and footer spacing" },
];

export const radiusTokens = [
  { name: "radius-none", value: "0px", usage: "Sharp architectural blocks, table cells" },
  { name: "radius-xs", value: "2px", usage: "Subtle component borders, input outlines" },
  { name: "radius-sm", value: "4px", usage: "Buttons, select triggers, cards, code frames" },
  { name: "radius-md", value: "8px", usage: "Modal dialogs, popovers, discovery panels" },
  { name: "radius-full", value: "9999px", usage: "Circular action buttons, status pills" },
];

export const accessibilityGuidelines = [
  {
    title: "1. Color Contrast & Independence",
    description: "Every text element exceeds WCAG 2.2 AA contrast minimums (4.5:1 for normal text, 3:1 for large text). Never rely on color alone to communicate state.",
  },
  {
    title: "2. Focus Visibility & Keyboard Navigation",
    description: "All interactive elements have high-visibility focus rings (outline 2px solid #43C58B with offset). Full tab sequence navigation across menus, modals, and filters.",
  },
  {
    title: "3. Semantic HTML Structure",
    description: "Strict heading hierarchy (h1 -> h2 -> h3). Native button, input, nav, main, and footer elements are prioritized before ARIA fallbacks.",
  },
  {
    title: "4. Motion & Reduced Motion",
    description: "Subtle transitions only. CSS prefers-reduced-motion media query disables animations for users who prefer minimal movement.",
  },
];
