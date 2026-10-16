import type { Metadata } from "next";
import { DocsContentView } from "./DocsContentView";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation, architecture guides, design principles, token implementation, and WCAG 2.2 AA accessibility standards for DSM.",
};

export default function DocsPage() {
  return <DocsContentView />;
}
