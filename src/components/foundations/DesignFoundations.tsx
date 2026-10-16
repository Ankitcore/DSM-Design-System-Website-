"use client";

import React, { useState } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { colorTokens, typographyTokens, spacingTokens, radiusTokens, accessibilityGuidelines } from "@/data/tokens";
import { useToast } from "@/components/ui/ToastContext";

export const DesignFoundations: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "spacing" | "accessibility">("colors");
  const { success, error } = useToast();

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(text);
      success(`Copied ${label}: ${text}`);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      error("Unable to copy to clipboard");
    }
  };

  return (
    <section id="foundations" className="w-full py-16 border-t border-[#353535] bg-[#141414]/80 backdrop-blur-xs scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#353535]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC94A] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC94A]" />
              <span>Design System Foundations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F2]">
              Atomic Design Tokens & Mathematical Rules
            </h2>
          </div>
          <p className="text-sm text-[#A7A7A1] max-w-md">
            Audited color variables, modular typography scales, spatial increments, and WCAG 2.2 AA accessibility principles powering every DSM component.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab("colors")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
              activeTab === "colors"
                ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                : "bg-[#1B1B1B] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
            }`}
          >
            Color Palette & Contrast
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("typography")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
              activeTab === "typography"
                ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                : "bg-[#1B1B1B] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
            }`}
          >
            Typography Scale
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("spacing")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
              activeTab === "spacing"
                ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                : "bg-[#1B1B1B] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
            }`}
          >
            Spacing & Radii
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("accessibility")}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
              activeTab === "accessibility"
                ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                : "bg-[#1B1B1B] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
            }`}
          >
            WCAG 2.2 AA Standards
          </button>
        </div>

        {/* 1. Color Palette Tab */}
        {activeTab === "colors" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {colorTokens.map((token) => (
                <div
                  key={token.variable}
                  className="p-4 bg-[#1C1C1C] border border-[#353535] flex flex-col justify-between hover:border-[#4D4D4D] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 border border-[#353535] shrink-0"
                        style={{ backgroundColor: token.hex }}
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-[#F5F5F2]">{token.name}</h4>
                        <span className="text-xs font-mono text-[#73736E]">{token.variable}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(token.hex, token.name)}
                      aria-label={`Copy hex code ${token.hex} for ${token.name}`}
                      className="p-1.5 text-[#73736E] hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
                    >
                      {copiedToken === token.hex ? (
                        <Check size={14} className="text-[#43C58B]" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#A7A7A1] mb-3">{token.role}</p>

                  <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F5F5F2]">{token.hex}</span>
                    <span className="text-[11px] text-[#43C58B] bg-[#16291F] px-2 py-0.5 border border-[#244E38]">
                      {token.contrastOnDark}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#1B1B1B] border border-[#353535] text-xs font-mono text-[#A7A7A1] flex items-center justify-between flex-wrap gap-3">
              <span>Click any color swatch to copy its hexadecimal token directly to clipboard.</span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `:root {\n${colorTokens.map((t) => `  ${t.variable}: ${t.hex};`).join("\n")}\n}`,
                    "CSS Tokens Bundle"
                  )
                }
                className="text-[#43C58B] hover:underline cursor-pointer"
              >
                Copy Full CSS Variables Bundle
              </button>
            </div>
          </div>
        )}

        {/* 2. Typography Scale Tab */}
        {activeTab === "typography" && (
          <div className="border border-[#353535] bg-[#1C1C1C] divide-y divide-[#2A2A2A]">
            {typographyTokens.map((t) => (
              <div key={t.level} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#F5F5F2]">{t.level}</span>
                    <span className="text-xs font-mono text-[#43C58B]">{t.fontSize}</span>
                  </div>
                  <div className="text-xs font-mono text-[#73736E]">
                    Weight: {t.fontWeight} • Line-height: {t.lineHeight}
                  </div>
                  <p className="text-xs text-[#A7A7A1] mt-1">{t.usage}</p>
                </div>
                <div className="md:w-2/3 overflow-hidden text-ellipsis">
                  <span
                    className="text-[#F5F5F2] block tracking-tight"
                    style={{
                      fontSize: t.fontSize.split(" ")[0],
                      fontWeight: Number(t.fontWeight),
                      lineHeight: t.lineHeight,
                    }}
                  >
                    {t.sample}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Spacing & Radii Tab */}
        {activeTab === "spacing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spacing Grid */}
            <div className="border border-[#353535] bg-[#1C1C1C] p-6">
              <h3 className="text-base font-semibold text-[#F5F5F2] mb-4">4px Base Modular Spacing Scale</h3>
              <div className="flex flex-col gap-3">
                {spacingTokens.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs font-mono py-2 border-b border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                      <span className="w-16 text-[#43C58B] font-semibold">{s.name}</span>
                      <span className="text-[#A7A7A1]">{s.sizePx} ({s.rem})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#73736E] hidden sm:inline">{s.usage}</span>
                      <div
                        className="bg-[#FF8045] h-3"
                        style={{ width: s.sizePx }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corner Radius Grid */}
            <div className="border border-[#353535] bg-[#1C1C1C] p-6">
              <h3 className="text-base font-semibold text-[#F5F5F2] mb-4">Border & Radius Scale</h3>
              <div className="flex flex-col gap-4">
                {radiusTokens.map((r) => (
                  <div key={r.name} className="p-4 bg-[#171717] border border-[#353535] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#F5F5F2] font-semibold block">{r.name} ({r.value})</span>
                      <span className="text-xs text-[#A7A7A1]">{r.usage}</span>
                    </div>
                    <div
                      className="w-12 h-12 bg-[#252525] border-2 border-[#43C58B] shrink-0"
                      style={{ borderRadius: r.value }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Accessibility Tab */}
        {activeTab === "accessibility" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibilityGuidelines.map((item) => (
              <div key={item.title} className="p-6 bg-[#1C1C1C] border border-[#353535] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#43C58B]">
                  <ShieldCheck size={18} />
                  <h3 className="text-sm font-semibold text-[#F5F5F2]">{item.title}</h3>
                </div>
                <p className="text-xs text-[#A7A7A1] leading-relaxed">{item.description}</p>
                <div className="pt-3 border-t border-[#2A2A2A] flex items-center gap-2 text-xs font-mono text-[#43C58B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
                  <span>Target: WCAG 2.2 AA Audited</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
