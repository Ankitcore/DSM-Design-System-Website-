export type ResourceCategory =
  | "All"
  | "Foundations"
  | "Component Specs"
  | "Design Tokens"
  | "Layout Templates"
  | "Iconography"
  | "Accessibility Guides"
  | "Starter Kits";

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  topic: string;
  description: string;
  isOpenSource: boolean;
  version: string;
  downloadFormat?: string;
  specLink?: string;
  tags: string[];
  lastUpdated: string;
}

export type ComponentCategory =
  | "Actions"
  | "Forms"
  | "Feedback"
  | "Navigation"
  | "Layout";

export interface ComponentItem {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  usage: string;
  accessibilityNotes: string;
  propsList: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
  codeSnippet: string;
}

export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  role: string;
  contrastOnDark: string;
}

export interface TypographyToken {
  level: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  usage: string;
  sample: string;
}

export interface SpacingToken {
  name: string;
  sizePx: string;
  rem: string;
  usage: string;
}

export interface DocSection {
  id: string;
  title: string;
  description: string;
  subsections: {
    id: string;
    title: string;
    content: string;
    code?: string;
  }[];
}
