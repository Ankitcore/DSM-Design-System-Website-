"use client";

import React, { useState } from "react";
import { Hash, ShieldCheck } from "lucide-react";
import { docSections } from "@/data/docs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const DocsContentView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState(docSections[0].id);

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-12 pb-8 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>DSM / DOCUMENTATION & ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F2] mb-4">
            Design System Documentation
          </h1>
          <p className="text-base text-[#A7A7A1] max-w-2xl leading-relaxed">
            Architectural guidelines, token implementations, and WCAG 2.2 AA accessibility rules for engineering cohesive digital products.
          </p>
        </div>

        {/* Documentation Layout: Sticky Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 flex flex-col gap-6 p-4 bg-[#1B1B1B] border border-[#353535]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#73736E] block mb-3">
                  Table of Contents
                </span>
                <nav className="flex flex-col gap-1 text-xs font-mono">
                  {docSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`px-3 py-2 transition-colors border-l-2 flex items-center justify-between ${
                        activeSectionId === sec.id
                          ? "border-[#43C58B] bg-[#242424] text-[#F5F5F2] font-semibold"
                          : "border-transparent text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#202020]"
                      }`}
                    >
                      <span>{sec.title}</span>
                      <span className="text-[10px] text-[#73736E]">{sec.subsections.length}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#2C2C2C] flex flex-col gap-2 text-xs font-mono text-[#73736E]">
                <div className="flex items-center gap-2 text-[#43C58B]">
                  <ShieldCheck size={14} />
                  <span>Version 2.1.0 (Stable)</span>
                </div>
                <span>WCAG 2.2 AA Audited</span>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <article className="lg:col-span-9 flex flex-col gap-16">
            {docSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 pb-12 border-b border-[#2C2C2C] last:border-b-0"
              >
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-2">
                  <a
                    href={`#${section.id}`}
                    className="text-[#73736E] hover:text-[#43C58B] transition-colors"
                    aria-label={`Anchor link for ${section.title}`}
                  >
                    <Hash size={18} />
                  </a>
                  <h2 className="text-2xl font-bold tracking-tight text-[#F5F5F2]">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm text-[#A7A7A1] mb-8 leading-relaxed max-w-2xl">
                  {section.description}
                </p>

                {/* Subsections */}
                <div className="flex flex-col gap-8">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      id={sub.id}
                      className="p-6 bg-[#1A1A1A] border border-[#353535] flex flex-col gap-4 scroll-mt-28"
                    >
                      <h3 className="text-base font-semibold text-[#F5F5F2] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
                        <span>{sub.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A7A7A1] leading-relaxed">
                        {sub.content}
                      </p>

                      {sub.code && (
                        <div className="mt-2">
                          <CodeBlock code={sub.code} language="bash" filename={sub.id} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};
