"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#171717]/95 backdrop-blur-md border-b border-[#353535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 text-sm font-medium"
          >
            {siteConfig.mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
                    isActive
                      ? "text-[#F5F5F2] font-semibold bg-[#222222] border-b border-[#43C58B]"
                      : "text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#202020]"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action / Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#171717] bg-[#43C58B] hover:bg-[#37B17A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
          >
            <span>v2.1 Specs</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#242424] border border-[#353535] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          tabIndex={-1}
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#171717] z-50 overflow-y-auto border-t border-[#353535] p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#73736E] mb-2 px-3">
              Navigation
            </span>
            {siteConfig.mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col px-3 py-3 border transition-colors ${
                    isActive
                      ? "border-[#43C58B] bg-[#202020] text-[#F5F5F2]"
                      : "border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#202020]"
                  }`}
                >
                  <span className="text-base font-semibold">{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-[#73736E] mt-0.5">
                      {item.description}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 border-t border-[#353535] flex flex-col gap-3">
            <div className="text-xs text-[#73736E]">
              DSM — Design System for Modern Products
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#A7A7A1]">
              <Link
                href="/privacy-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#F5F5F2]"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#F5F5F2]"
              >
                Terms
              </Link>
              <span>•</span>
              <Link
                href="/docs#tokens"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#43C58B] hover:underline"
              >
                Tokens
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
