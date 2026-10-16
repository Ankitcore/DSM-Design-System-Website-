import type { Metadata } from "next";
import { ComponentLibraryView } from "./ComponentLibraryView";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore DSM's production UI component catalog. Interactive examples, accessibility contracts, TypeScript prop tables, and copyable implementation snippets.",
};

export default function ComponentsPage() {
  return <ComponentLibraryView />;
}
