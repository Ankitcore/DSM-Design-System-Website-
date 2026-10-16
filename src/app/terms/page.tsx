import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions governing the use of the DSM Design System website and resources.",
};

export default function TermsPage() {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC94A] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC94A]" />
            <span>LEGAL & USAGE TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F2] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-[#73736E]">
            Effective Date: October 2026 • Version 1.0 (Audited)
          </p>
        </div>

        {/* Launch Requirement Notice */}
        <div className="p-4 bg-[#1F1914] border border-[#643C27] mb-10 flex items-start gap-3 text-xs text-[#FF8045]">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold block mb-1">Production Launch Notice:</strong>
            These terms set forth the standard usage permissions for the DSM design system and UI codebase. Formal corporate jurisdiction and governing law clauses should be finalized by the project owner upon production deployment with a designated custom domain.
          </div>
        </div>

        <article className="prose prose-invert max-w-none flex flex-col gap-8 text-sm text-[#A7A7A1] leading-relaxed">
          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the <strong>DSM</strong> website, component code, documentation, and design token artifacts, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you should discontinue use of the resources.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">2. Open Design & Software License</h2>
            <p className="mb-3">
              The reusable component code snippets, design tokens, and architectural specifications provided on DSM are made available for software development under the terms of standard open-source licenses (such as the MIT License for code primitives).
            </p>
            <p>
              You are permitted to integrate, customize, and build commercial or non-commercial applications using the DSM component patterns and tokens.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">3. Intellectual Property & Brand Assets</h2>
            <p>
              The <strong>DSM.</strong> brand name, wordmark, custom SVG geometric logo, and original site editorial artwork are proprietary brand assets. You may not use the DSM brand name or logo in a manner that falsely implies official endorsement, sponsorship, or affiliation of third-party products without explicit authorization.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">4. Disclaimer of Warranties</h2>
            <p>
              The DSM website, specifications, and UI components are provided &quot;as is&quot; and &quot;as available&quot;, without warranty of any kind, express or implied. While we strive for rigorous WCAG 2.2 AA accessibility and TypeScript correctness, the authors make no warranty that the resources will be uninterrupted, error-free, or meet specific regulatory compliance standards in all operating environments.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall the authors, contributors, or maintainers of DSM be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the site or code primitives.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
