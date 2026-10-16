import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen } from "lucide-react";
import { GeometricArtwork } from "./GeometricArtwork";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#353535] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Small Brand Label */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#202020] border border-[#353535] text-xs font-mono uppercase tracking-wider text-[#A7A7A1] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
              <span>DSM / DESIGN SYSTEM</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F2] leading-[1.1] mb-6 max-w-2xl">
              Build better products. Faster.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#A7A7A1] leading-relaxed mb-8 max-w-xl">
              A thoughtfully crafted design system for designers and developers. Discover reusable components, practical resources, and design foundations that help turn ideas into consistent digital experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Link
                href="/components"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#43C58B] hover:bg-[#37B17A] text-[#171717] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
              >
                <span>Explore components</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#202020] hover:bg-[#282828] text-[#F5F5F2] border border-[#353535] hover:border-[#4D4D4D] font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
              >
                <BookOpen size={16} className="text-[#A7A7A1]" />
                <span>Read the documentation</span>
              </Link>
            </div>

            {/* Accessible Downward Navigation Control */}
            <a
              href="#discovery"
              aria-label="Scroll down to resource discovery explorer"
              className="group inline-flex items-center gap-3 text-xs font-mono text-[#A7A7A1] hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] p-1"
            >
              <span className="w-8 h-8 rounded-full border border-[#353535] group-hover:border-[#43C58B] flex items-center justify-center transition-colors">
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform text-[#43C58B]" />
              </span>
              <span>Explore Resource Directory</span>
            </a>
          </div>

          {/* Right Column: Hero Geometric Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <GeometricArtwork />
          </div>
        </div>
      </div>
    </section>
  );
};
