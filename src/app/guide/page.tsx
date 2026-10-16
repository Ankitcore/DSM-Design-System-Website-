import type { Metadata } from "next";
import { GuideView } from "./GuideView";

export const metadata: Metadata = {
  title: "How to Use DSM & Platform Overview",
  description:
    "Learn what the DSM design system is about, how to explore its UI components and design tokens, and discover all global keyboard shortcuts.",
};

export default function GuidePage() {
  return <GuideView />;
}
