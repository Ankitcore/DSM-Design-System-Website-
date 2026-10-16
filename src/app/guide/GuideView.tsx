"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { QuickGuideModal } from "@/components/ui/QuickGuideModal";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

export const GuideView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Explore the Design Tokens & Color Matrix",
      desc: "Every design foundation in DSM is mathematically verified against the deep #171717 canvas. Review the color tokens, modular 4px spacing scale, and modular typography scale.",
      actionLabel: "View Design Foundations",
      href: "/#foundations",
      badge: "Foundations",
      icon: <Sparkles size={18} className="text-[#FFC94A]" />,
    },
    {
      num: "02",
      title: "Test UI Primitives in the Component Playground",
      desc: "Navigate to /components to test buttons, form inputs, accessible modals, alerts, and toggles. Switch variants and state in real-time, view TypeScript prop tables, and copy ready-to-use React code.",
      actionLabel: "Launch Component Playground",
      href: "/components",
      badge: "Interactive UI",
      icon: <Layers size={18} className="text-[#43C58B]" />,
    },
    {
      num: "03",
      title: "Discover Architectural Specs & Boilerplates",
      desc: "Use the Resource Discovery panel on the homepage or the dedicated /resources directory to search and filter through starter kits, typography specs, and WCAG checklists.",
      actionLabel: "Search Resource Directory",
      href: "/resources",
      badge: "Directory",
      icon: <Compass size={18} className="text-[#FF8045]" />,
    },
    {
      num: "04",
      title: "Implement into Your React or Next.js Project",
      desc: "Follow the Documentation in /docs to install required peer dependencies (Tailwind CSS v4, Lucide icons), import root CSS variables, and compose accessible interfaces.",
      actionLabel: "Read Implementation Docs",
      href: "/docs",
      badge: "Documentation",
      icon: <BookOpen size={18} className="text-[#B899D8]" />,
    },
  ];

  const shortcuts = [
    {
      key: "?",
      combo: ["?"],
      action: "Quick Guide & Shortcuts Modal",
      description: "Opens an instant platform overview and keyboard cheatsheet overlay from any page.",
    },
    {
      key: "Ctrl + K / ⌘K",
      combo: ["Ctrl", "K"],
      action: "Shortcut Navigator",
      description: "Toggles quick navigation shortcuts across design system modules.",
    },
    {
      key: "Escape",
      combo: ["Esc"],
      action: "Dismiss Modal / Drawer",
      description: "Closes open dialogs, interactive modal demos, mobile menus, or search overlays.",
    },
    {
      key: "Tab / Shift + Tab",
      combo: ["Tab"],
      action: "Sequential Traversal",
      description: "Moves focus through every interactive button, input, tab, and card with high-visibility mint focus ring.",
    },
    {
      key: "Enter / Space",
      combo: ["Enter", "Space"],
      action: "Activate Controls",
      description: "Triggers the focused button, toggles switches, checks boxes, and switches active tabs.",
    },
  ];

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-12 pb-8 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>DSM / USER MANUAL & SYSTEM GUIDE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F2] mb-4">
            How to Use DSM & What is this Website About
          </h1>
          <p className="text-base sm:text-lg text-[#A7A7A1] leading-relaxed max-w-3xl">
            A complete guide explaining the DSM design philosophy, how to discover and copy UI components, how to consume design tokens, and how to use keyboard shortcuts.
          </p>

          {/* Quick interactive shortcut trigger */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="mint"
              size="sm"
              icon={<HelpCircle size={15} />}
              onClick={() => setModalOpen(true)}
            >
              Open Quick Guide Shortcut [?]
            </Button>
            <span className="text-xs font-mono text-[#73736E]">
              Tip: Press <kbd className="px-1.5 py-0.5 bg-[#202020] border border-[#353535] text-[#43C58B]">?</kbd> anywhere on this site to open the shortcut popup!
            </span>
          </div>
        </div>

        {/* Section 1: What is this Website About? */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF8045] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8045]" />
            <span>01 / System Purpose</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F2] mb-4">
            What is DSM?
          </h2>
          <div className="p-6 sm:p-8 bg-[#1C1C1C] border border-[#353535] space-y-4 text-sm text-[#A7A7A1] leading-relaxed">
            <p>
              <strong className="text-[#F5F5F2]">DSM</strong> stands for <strong>Design System for Modern Products</strong>. It is a thoughtfully crafted, open design system and UI engineering platform designed to help designers and developers build consistent, accessible, and high-performance digital products faster.
            </p>
            <p>
              Unlike generic UI kits or bloated SaaS landing page templates, DSM takes inspiration from disciplined editorial print design: deep near-black surfaces (<code className="text-[#F5F5F2] bg-[#141414] px-1.5 py-0.5 border border-[#303030]">#171717</code> and <code className="text-[#F5F5F2] bg-[#141414] px-1.5 py-0.5 border border-[#303030]">#202020</code>), pure flat geometry, fine coordinate grid lines, and high-contrast accents (Mint Green <code className="text-[#43C58B]">#43C58B</code>, Warm Orange <code className="text-[#FF8045]">#FF8045</code>, and Golden Yellow <code className="text-[#FFC94A]">#FFC94A</code>).
            </p>
            <p>
              <strong>We strictly avoid purple gradients, synthetic marketing counters, and artificial glassmorphism.</strong> Every element has a real purpose, an audited contrast ratio, and a strict TypeScript interface.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2C2C2C]">
              <div className="p-4 bg-[#171717] border border-[#303030]">
                <h3 className="text-xs font-mono uppercase text-[#43C58B] mb-1 font-semibold">For Designers</h3>
                <p className="text-xs text-[#A7A7A1]">
                  Predictable 4px spatial rhythm, modular typography scales, and guaranteed WCAG 2.2 AA contrast compliance.
                </p>
              </div>
              <div className="p-4 bg-[#171717] border border-[#303030]">
                <h3 className="text-xs font-mono uppercase text-[#FF8045] mb-1 font-semibold">For Engineers</h3>
                <p className="text-xs text-[#A7A7A1]">
                  Strict TypeScript types, copyable React components, zero runtime CSS bloat, and full keyboard interaction contracts.
                </p>
              </div>
              <div className="p-4 bg-[#171717] border border-[#303030]">
                <h3 className="text-xs font-mono uppercase text-[#FFC94A] mb-1 font-semibold">For Teams</h3>
                <p className="text-xs text-[#A7A7A1]">
                  A single source of truth connecting design tokens directly to production code without ambiguity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How to Use Every Feature */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC94A] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC94A]" />
            <span>02 / Step-by-Step Walkthrough</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F2] mb-6">
            How to Use This Website
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 bg-[#1C1C1C] border border-[#353535] hover:border-[#4D4D4D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#73736E] font-bold">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-mono text-[#A7A7A1] bg-[#242424] px-2 py-0.5 border border-[#353535]">
                      {step.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mb-2">
                    {step.icon}
                    <h3 className="text-base font-bold text-[#F5F5F2]">{step.title}</h3>
                  </div>
                  <p className="text-xs text-[#A7A7A1] leading-relaxed mb-6">{step.desc}</p>
                </div>

                <Link
                  href={step.href}
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#43C58B] hover:underline pt-3 border-t border-[#2A2A2A]"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Keyboard Shortcuts Guide */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B899D8] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B899D8]" />
            <span>03 / Keyboard Shortcuts & Speed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F2] mb-4">
            Global Keyboard Shortcuts
          </h2>
          <p className="text-sm text-[#A7A7A1] mb-6 leading-relaxed">
            DSM is engineered for keyboard-first navigation. Use these shortcuts to move swiftly across the platform:
          </p>

          <div className="border border-[#353535] bg-[#1C1C1C] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#242424] border-b border-[#353535] text-[#A7A7A1]">
                  <tr>
                    <th className="p-3.5">Shortcut</th>
                    <th className="p-3.5">Action</th>
                    <th className="p-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282828] text-[#F5F5F2]">
                  {shortcuts.map((sc) => (
                    <tr key={sc.key} className="hover:bg-[#202020]">
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {sc.combo.map((c) => (
                            <kbd
                              key={c}
                              className="px-2 py-1 bg-[#252525] border border-[#404040] text-[#43C58B] font-semibold text-xs"
                            >
                              {c}
                            </kbd>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-[#F5F5F2]">{sc.action}</td>
                      <td className="p-3.5 text-xs font-sans text-[#A7A7A1]">{sc.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Quick Code Integration Blueprint */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>04 / Integration Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F2] mb-4">
            How to Integrate DSM in Your Codebase
          </h2>
          <p className="text-sm text-[#A7A7A1] mb-6 leading-relaxed">
            Here is a sample implementation showing how easily DSM tokens and reusable primitives assemble into a modern page:
          </p>

          <CodeBlock
            language="tsx"
            filename="ExampleDSMPage.tsx"
            code={`import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Alert } from "@/components/ui/Alert";
import { ArrowRight, Search } from "lucide-react";

export default function ProductView() {
  const [strictA11y, setStrictA11y] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#171717] text-[#F5F5F2] p-8 max-w-4xl mx-auto space-y-6">
      {/* Editorial Header */}
      <div className="border-b border-[#353535] pb-4">
        <span className="text-xs font-mono text-[#43C58B] uppercase">[ DSM System ]</span>
        <h1 className="text-3xl font-bold mt-1">High-Precision Editorial UI</h1>
      </div>

      {/* Accessible Form Inputs */}
      <Input
        label="Token Keyword"
        placeholder="Search color hex or spacing..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<Search size={16} />}
      />

      {/* Interactive Switch */}
      <Toggle
        label="Enforce WCAG 2.2 AA Contrast"
        description="Guarantees 4.5:1 minimum text ratio against #171717"
        checked={strictA11y}
        onChange={setStrictA11y}
      />

      {/* Action Button */}
      <Button variant="mint" size="md" icon={<ArrowRight size={16} />} iconPosition="right">
        Export Specifications
      </Button>
    </div>
  );
}`}
          />
        </section>

        {/* Section 5: Bottom Navigation / Next Steps */}
        <div className="p-8 bg-[#202020] border border-[#353535] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-[#F5F5F2]">Ready to dive deeper?</h3>
            <p className="text-xs text-[#A7A7A1] mt-1">
              Start testing components or read the full design tokens specification.
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

        {/* Quick Guide Modal */}
        <QuickGuideModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};
