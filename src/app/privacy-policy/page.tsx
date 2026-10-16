import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and actual data practices for the DSM Design System website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F2] mb-3">
            Privacy Policy
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
            This policy accurately reflects the technical data practices of the current static DSM deployment. Prior to public production launch with a custom domain or commercial entity, official legal entity registration, corporate jurisdiction, and a verified compliance contact address must be supplied by the site owner.
          </div>
        </div>

        <article className="prose prose-invert max-w-none flex flex-col gap-8 text-sm text-[#A7A7A1] leading-relaxed">
          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">1. Scope and Actual Data Practices</h2>
            <p>
              This Privacy Policy describes the data practices of the <strong>DSM</strong> (Design System for Modern Products) website. We believe in minimal data footprint and absolute transparency. This website is hosted as a high-performance, token-driven static documentation platform.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">2. Information We Do NOT Collect</h2>
            <p className="mb-3">
              To the fullest extent possible under modern web architectures, DSM is engineered without invasive tracking mechanisms:
            </p>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              <li className="flex items-center gap-2 text-xs">
                <span className="text-[#43C58B]">✓</span>
                <span><strong>No Third-Party Analytics Trackers:</strong> We do not embed Google Analytics, tracking pixels, or cross-site fingerprinting scripts.</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <span className="text-[#43C58B]">✓</span>
                <span><strong>No Account Profiling:</strong> We do not require user accounts, passwords, or personal credentials to access documentation, tokens, or components.</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <span className="text-[#43C58B]">✓</span>
                <span><strong>No Marketing Automation:</strong> We do not harvest email addresses for automated marketing sequences.</span>
              </li>
            </ul>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">3. Local Browser Storage & Client State</h2>
            <p className="mb-3">
              The website may store temporary state directly in your browser&apos;s memory or local storage (such as your active component playground settings or search query filters). This information never leaves your personal device and is not transmitted to external servers.
            </p>
            <p>
              When you use the &quot;Copy Code&quot; or &quot;Copy Spec&quot; actions, the browser&apos;s standard asynchronous Clipboard API is invoked locally on your device to place the selected text snippet onto your clipboard.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">4. Server Logs & Network Protocol Data</h2>
            <p>
              When you request pages or static assets (such as SVG vectors and stylesheets), standard web hosting servers automatically receive standard network protocol information, including your IP address, browser user-agent header, and request timestamp. These server logs are generated automatically for security, denial-of-service mitigation, and HTTP routing purposes.
            </p>
          </section>

          <section className="p-6 bg-[#1B1B1B] border border-[#353535]">
            <h2 className="text-lg font-bold text-[#F5F5F2] mb-3">5. Inquiries & Contact</h2>
            <p>
              For technical inquiries regarding the DSM architecture or open design system licenses, please consult our documentation or open an issue on the project repository.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
