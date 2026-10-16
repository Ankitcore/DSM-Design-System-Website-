"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, SlidersHorizontal, ArrowUpRight, RotateCcw, Copy, Check } from "lucide-react";
import { resourcesData, resourceCategories } from "@/data/resources";
import { ResourceCategory, ResourceItem } from "@/types";
import { useToast } from "@/components/ui/ToastContext";

interface ResourceExplorerProps {
  initialLimit?: number;
  showAllLink?: boolean;
}

export const ResourceExplorer: React.FC<ResourceExplorerProps> = ({
  initialLimit,
  showAllLink = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"updated" | "name" | "category">("updated");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { success, error } = useToast();

  // Extract distinct topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    resourcesData.forEach((r) => set.add(r.topic));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter and sort items
  const filteredResources = useMemo(() => {
    return resourcesData
      .filter((item) => {
        // Search query match
        const matchesQuery =
          searchQuery.trim() === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category match
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        // Topic match
        const matchesTopic =
          selectedTopic === "All" || item.topic === selectedTopic;

        return matchesQuery && matchesCategory && matchesTopic;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        }
        // default "updated"
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      });
  }, [searchQuery, selectedCategory, selectedTopic, sortBy]);

  const displayedResources = initialLimit
    ? filteredResources.slice(0, initialLimit)
    : filteredResources;

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTopic("All");
    setSortBy("updated");
  };

  const handleCopySpec = async (item: ResourceItem) => {
    try {
      const specText = `DSM Resource: ${item.title} (${item.version})\nCategory: ${item.category}\nFormat: ${item.downloadFormat}\nDocumentation: ${item.specLink || "/docs"}`;
      await navigator.clipboard.writeText(specText);
      setCopiedId(item.id);
      success(`Copied spec reference for "${item.title}"`);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      error("Unable to copy to clipboard");
    }
  };

  return (
    <section id="discovery" className="w-full py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#353535]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
              <span>Resource Discovery Panel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F2]">
              Explore Design System Artifacts
            </h2>
          </div>
          <p className="text-sm text-[#A7A7A1] max-w-md">
            Audited tokens, layout blueprints, component contracts, and starter repositories verified against our dark editorial canvas.
          </p>
        </div>

        {/* Search & Filter Controls (Styled after reference image search bar) */}
        <div className="bg-[#202020] border border-[#353535] p-3 sm:p-4 mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input with Clear Button */}
          <div className="relative flex-1 flex items-center">
            <Search size={16} className="absolute left-3.5 text-[#73736E] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, tokens, guidelines..."
              aria-label="Search resources"
              className="w-full h-11 bg-[#171717] border border-[#353535] hover:border-[#4D4D4D] focus-visible:border-[#43C58B] text-[#F5F5F2] placeholder-[#73736E] text-sm pl-10 pr-10 focus-visible:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
                className="absolute right-3 p-1 text-[#73736E] hover:text-[#F5F5F2] transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Controls: Category Selector & Sort */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Category Dropdown */}
            <div className="w-full sm:w-auto min-w-[170px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory)}
                aria-label="Filter by category"
                className="w-full h-11 bg-[#171717] border border-[#353535] hover:border-[#4D4D4D] text-[#F5F5F2] text-xs font-mono px-3 pr-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] cursor-pointer"
              >
                {resourceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Control */}
            <div className="w-full sm:w-auto min-w-[150px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "updated" | "name" | "category")}
                aria-label="Sort resources"
                className="w-full h-11 bg-[#171717] border border-[#353535] hover:border-[#4D4D4D] text-[#F5F5F2] text-xs font-mono px-3 pr-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] cursor-pointer"
              >
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-mono uppercase text-[#73736E] mr-2 shrink-0 flex items-center gap-1.5">
            <SlidersHorizontal size={13} />
            <span>Topics:</span>
          </span>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 text-xs font-mono whitespace-nowrap transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
                selectedTopic === t
                  ? "bg-[#2A2A2A] border-[#43C58B] text-[#43C58B] font-semibold"
                  : "bg-[#1C1C1C] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Results Counter and Reset Action */}
        <div className="flex items-center justify-between text-xs font-mono text-[#73736E] mb-6">
          <div>
            Showing <span className="text-[#F5F5F2] font-semibold">{filteredResources.length}</span> verified resources
            {(searchQuery || selectedCategory !== "All" || selectedTopic !== "All") && (
              <span className="text-[#43C58B] ml-2">• Filtered</span>
            )}
          </div>
          {(searchQuery || selectedCategory !== "All" || selectedTopic !== "All") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-[#FF8045] hover:underline cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Resource Grid / List */}
        {displayedResources.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#353535] bg-[#1B1B1B] flex flex-col items-center justify-center">
            <p className="text-base text-[#F5F5F2] font-semibold mb-2">
              No resources match your search criteria
            </p>
            <p className="text-sm text-[#A7A7A1] max-w-sm mb-6">
              Try adjusting your query or resetting active category filters to inspect all design system specifications.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 bg-[#262626] border border-[#353535] text-xs font-mono text-[#F5F5F2] hover:border-[#43C58B] transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedResources.map((item) => (
              <article
                key={item.id}
                className="group relative bg-[#1E1E1E] border border-[#353535] hover:border-[#4D4D4D] transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top card bar: Geometric miniature icon & tag */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Geometric emblem matching screenshot */}
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#252525] border border-[#353535]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M2 10C2 5.58 5.58 2 10 2V10H2Z" fill="#43C58B" />
                          <path d="M10 10H18L10 18V10Z" fill="#FF8045" />
                          <circle cx="14" cy="6" r="3" fill="#FFC94A" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#A7A7A1] block">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-[#73736E]">{item.version}</span>
                      </div>
                    </div>

                    {item.isOpenSource && (
                      <span className="text-[11px] font-mono text-[#43C58B] bg-[#16291F] px-2 py-0.5 border border-[#244E38]">
                        [ open source ]
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-[#F5F5F2] group-hover:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#A7A7A1] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-[#252525] text-[#A7A7A1] px-2 py-0.5 border border-[#303030]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => handleCopySpec(item)}
                    aria-label={`Copy spec citation for ${item.title}`}
                    className="flex items-center gap-1.5 text-[#A7A7A1] hover:text-[#F5F5F2] transition-colors p-1"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={13} className="text-[#43C58B]" />
                        <span className="text-[#43C58B]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Spec</span>
                      </>
                    )}
                  </button>

                  {item.specLink && (
                    <Link
                      href={item.specLink}
                      className="inline-flex items-center gap-1 text-[#43C58B] hover:underline"
                    >
                      <span>View Documentation</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Show all link if limited */}
        {showAllLink && initialLimit && filteredResources.length > initialLimit && (
          <div className="mt-10 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#202020] hover:bg-[#282828] border border-[#353535] hover:border-[#43C58B] text-xs font-mono uppercase tracking-wider text-[#F5F5F2] transition-colors"
            >
              <span>Explore All {resourcesData.length} Resources in Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
