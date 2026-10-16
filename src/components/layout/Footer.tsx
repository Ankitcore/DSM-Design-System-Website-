import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#141414] border-t border-[#353535] text-[#A7A7A1] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4 max-w-md">
            <Logo size="md" />
            <p className="text-sm text-[#A7A7A1] leading-relaxed mt-2">
              DSM is a thoughtfully crafted design system and UI resource library that helps designers and developers create consistent digital experiences through reusable components, clear design foundations, and practical documentation.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-[#73736E] mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#43C58B]" />
              <span>WCAG 2.2 AA Audited • Strict TypeScript</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F5F2]">
              Platform & Specs
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {siteConfig.footerNav.product.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture & Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F5F2]">
              Standards & Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {siteConfig.footerNav.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {siteConfig.footerNav.legal.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#73736E]">
          <div>
            © {siteConfig.currentYear} {siteConfig.brandName}. All rights reserved. Open design architecture.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#A7A7A1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#A7A7A1] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/#foundations" className="text-[#43C58B] hover:underline">
              Tokens Matrix
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
