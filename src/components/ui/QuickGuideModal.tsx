"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, HelpCircle, ArrowRight, Compass, Layers, BookOpen, ShieldCheck } from "lucide-react";

export interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management & body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "?", label: "Open Quick Guide & Shortcuts popup from anywhere" },
    { key: "Ctrl + K / ⌘K", label: "Global shortcut navigator toggle" },
    { key: "Esc", label: "Dismiss any active modal, dialog, or drawer" },
    { key: "Tab / Shift+Tab", label: "Sequential keyboard focus with green outline" },
    { key: "Enter / Space", label: "Trigger buttons, switches, checkboxes, tabs" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-guide-title"
        className="w-full max-w-2xl bg-[#1C1C1C] border border-[#353535] text-[#F5F5F2] shadow-2xl overflow-hidden focus-visible:outline-none flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#353535] bg-[#222222]">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-[#182C22] border border-[#2D5A43] text-[#43C58B]">
              <HelpCircle size={16} />
            </span>
            <div>
              <h2 id="quick-guide-title" className="text-base font-bold tracking-tight text-[#F5F5F2]">
                What is DSM & How to Use
              </h2>
              <p className="text-xs text-[#A7A7A1]">Platform overview and keyboard shortcuts cheatsheet</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#73736E] border border-[#353535] px-1.5 py-0.5 bg-[#171717]">
              Esc to close
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#353535] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#A7A7A1]">
          {/* Section 1: What is DSM */}
          <div className="p-4 bg-[#232323] border border-[#353535]">
            <h3 className="text-sm font-semibold text-[#F5F5F2] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
              <span>What is this website about?</span>
            </h3>
            <p className="leading-relaxed mb-3">
              <strong className="text-[#F5F5F2]">DSM</strong> stands for <em>Design System for Modern Products</em>. It is an open-architecture design system and UI engineering platform built for UI/UX designers, design engineers, and frontend teams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-[#F5F5F2]">
              <div className="p-2 bg-[#1C1C1C] border border-[#303030] flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#43C58B] shrink-0" />
                <span>WCAG 2.2 AA Contrast Audited</span>
              </div>
              <div className="p-2 bg-[#1C1C1C] border border-[#303030] flex items-center gap-2">
                <Layers size={14} className="text-[#FF8045] shrink-0" />
                <span>Strict TypeScript & Tailwind CSS</span>
              </div>
              <div className="p-2 bg-[#1C1C1C] border border-[#303030] flex items-center gap-2">
                <Compass size={14} className="text-[#FFC94A] shrink-0" />
                <span>Searchable Resource Repository</span>
              </div>
              <div className="p-2 bg-[#1C1C1C] border border-[#303030] flex items-center gap-2">
                <BookOpen size={14} className="text-[#B899D8] shrink-0" />
                <span>Zero Gimmicks / Clean Editorial</span>
              </div>
            </div>
          </div>

          {/* Section 2: How to Use */}
          <div>
            <h3 className="text-sm font-semibold text-[#F5F5F2] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8045]" />
              <span>How to use the website:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#202020] border border-[#353535] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#43C58B] block mb-1">Step 1 • Inspect</span>
                  <strong className="text-[#F5F5F2] block mb-1 text-xs">Explore Foundations</strong>
                  <p className="text-[11px] text-[#A7A7A1] leading-relaxed">
                    Review token contrast against canvas `#171717`. Click swatches to copy CSS variables.
                  </p>
                </div>
                <Link
                  href="/#foundations"
                  onClick={onClose}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[#43C58B] hover:underline"
                >
                  <span>Tokens Matrix</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="p-3 bg-[#202020] border border-[#353535] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#FF8045] block mb-1">Step 2 • Test</span>
                  <strong className="text-[#F5F5F2] block mb-1 text-xs">Component Playground</strong>
                  <p className="text-[11px] text-[#A7A7A1] leading-relaxed">
                    Switch button variants, trigger modals, and test live form error validation.
                  </p>
                </div>
                <Link
                  href="/components"
                  onClick={onClose}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[#FF8045] hover:underline"
                >
                  <span>Components</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="p-3 bg-[#202020] border border-[#353535] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#FFC94A] block mb-1">Step 3 • Copy</span>
                  <strong className="text-[#F5F5F2] block mb-1 text-xs">Integrate Code</strong>
                  <p className="text-[11px] text-[#A7A7A1] leading-relaxed">
                    Copy production-ready React snippets directly to your clipboard.
                  </p>
                </div>
                <Link
                  href="/docs#getting-started"
                  onClick={onClose}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[#FFC94A] hover:underline"
                >
                  <span>Quickstart</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Section 3: Keyboard Shortcuts */}
          <div>
            <h3 className="text-sm font-semibold text-[#F5F5F2] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC94A]" />
              <span>Keyboard Shortcuts</span>
            </h3>
            <div className="border border-[#353535] bg-[#171717] divide-y divide-[#282828] font-mono text-[11px]">
              {shortcuts.map((s) => (
                <div key={s.key} className="p-2.5 flex items-center justify-between">
                  <span className="text-[#A7A7A1] font-sans text-xs">{s.label}</span>
                  <kbd className="px-2 py-0.5 bg-[#252525] border border-[#404040] text-[#43C58B] rounded-xs font-semibold">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#353535] bg-[#181818]">
          <Link
            href="/guide"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#43C58B] hover:underline"
          >
            <span>Open Comprehensive How-To-Use Page</span>
            <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#252525] hover:bg-[#303030] border border-[#353535] text-xs font-mono text-[#F5F5F2] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
