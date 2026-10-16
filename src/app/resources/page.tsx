import type { Metadata } from "next";
import { ResourceExplorer } from "@/components/discovery/ResourceExplorer";

export const metadata: Metadata = {
  title: "Resources Directory",
  description:
    "Explore DSM's verified design system resources: token definitions, layout templates, typography scales, iconography stroke rules, and starter boilerplates.",
};

export default function ResourcesPage() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="pb-6 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>DSM / RESOURCE DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F2] mb-3">
            Design System Specifications & Boilerplates
          </h1>
          <p className="text-base text-[#A7A7A1] max-w-2xl leading-relaxed">
            Searchable repository of architectural resources, design token packages, and implementation guides formatted for modern product teams.
          </p>
        </div>
      </div>

      {/* Embedded Full Resource Explorer */}
      <ResourceExplorer showAllLink={false} />
    </div>
  );
}
