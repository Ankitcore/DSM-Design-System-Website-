import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Layers, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "About DSM",
  description:
    "Learn about DSM: Design System for Modern Products. Our philosophy, architecture, commitment to accessibility, and open design ethos.",
};

export default function AboutPage() {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>DSM / BRAND PURPOSE & ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F2] mb-6">
            Design System for Modern Products
          </h1>
          <p className="text-lg text-[#A7A7A1] leading-relaxed max-w-3xl">
            DSM was created to solve a persistent tension in digital product development: the disconnect between rapid design exploration and disciplined frontend implementation.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-[#1C1C1C] border border-[#353535] flex flex-col gap-3">
            <div className="w-10 h-10 bg-[#252525] border border-[#353535] flex items-center justify-center text-[#43C58B]">
              <Layers size={20} />
            </div>
            <h2 className="text-base font-semibold text-[#F5F5F2]">Token-First Architecture</h2>
            <p className="text-xs text-[#A7A7A1] leading-relaxed">
              Every spacing increment, typographic level, color shade, and corner radius is derived from centralized tokens that synchronize across CSS, Tailwind, and React.
            </p>
          </div>

          <div className="p-6 bg-[#1C1C1C] border border-[#353535] flex flex-col gap-3">
            <div className="w-10 h-10 bg-[#252525] border border-[#353535] flex items-center justify-center text-[#FF8045]">
              <Shield size={20} />
            </div>
            <h2 className="text-base font-semibold text-[#F5F5F2]">Audited Accessibility</h2>
            <p className="text-xs text-[#A7A7A1] leading-relaxed">
              We target WCAG 2.2 AA standards from the initial blueprint. No color combination is published without mathematical contrast verification against our dark canvas.
            </p>
          </div>

          <div className="p-6 bg-[#1C1C1C] border border-[#353535] flex flex-col gap-3">
            <div className="w-10 h-10 bg-[#252525] border border-[#353535] flex items-center justify-center text-[#FFC94A]">
              <Code size={20} />
            </div>
            <h2 className="text-base font-semibold text-[#F5F5F2]">Honest Engineering</h2>
            <p className="text-xs text-[#A7A7A1] leading-relaxed">
              Zero decorative fluff, no synthetic marketing counters, and no purple gradient gimmicks. Clean editorial layouts that let products speak for themselves.
            </p>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <article className="prose prose-invert max-w-none mb-16 flex flex-col gap-8 text-sm text-[#A7A7A1] leading-relaxed">
          <div className="p-8 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-xl font-bold text-[#F5F5F2] mb-3">
              Why We Built DSM
            </h2>
            <p className="mb-4">
              Modern digital teams often struggle with fragmented component libraries, unvetted design tokens, and inconsistent accessibility practices. Design systems frequently degenerate into oversized collections of rounded cards or generic templates lacking structural character.
            </p>
            <p>
              DSM approaches interface design from an editorial perspective: disciplined negative space, strong geometric landmarks, deep near-black surfaces (#171717 and #202020) that protect optical focus, and high-contrast accents (mint #43C58B, warm orange #FF8045, and golden yellow #FFC94A).
            </p>
          </div>

          <div className="p-8 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-xl font-bold text-[#F5F5F2] mb-3">
              Intended Audience
            </h2>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <span className="text-[#43C58B] mt-0.5">✓</span>
                <div>
                  <strong className="text-[#F5F5F2]">UI & Product Designers:</strong> Who need rigorous spacing scales, predictable token hierarchies, and verified dark canvas aesthetics.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#43C58B] mt-0.5">✓</span>
                <div>
                  <strong className="text-[#F5F5F2]">Frontend & Design Engineers:</strong> Who require strict TypeScript types, zero runtime bloat, and copyable, accessible component primitives.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#43C58B] mt-0.5">✓</span>
                <div>
                  <strong className="text-[#F5F5F2]">Product Teams:</strong> Striving to eliminate UI debt and maintain cross-platform visual consistency.
                </div>
              </li>
            </ul>
          </div>
        </article>

        {/* Next Steps CTA */}
        <div className="p-8 bg-[#202020] border border-[#353535] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-[#F5F5F2]">Ready to explore the system?</h3>
            <p className="text-xs text-[#A7A7A1] mt-1">
              Inspect our interactive components or review the full token specification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/components"
              className="px-4 py-2.5 bg-[#43C58B] hover:bg-[#37B17A] text-[#171717] font-semibold text-xs font-mono uppercase transition-colors"
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="px-4 py-2.5 bg-[#171717] border border-[#353535] hover:border-[#4D4D4D] text-[#F5F5F2] text-xs font-mono uppercase transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
