"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "./ToastContext";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  filename,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      success("Copied code snippet to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      error("Could not copy. Please select and copy manually.");
    }
  };

  return (
    <div className={`flex flex-col border border-[#353535] bg-[#1C1C1C] overflow-hidden text-xs font-mono ${className}`}>
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#232323] border-b border-[#353535] text-[#A7A7A1]">
        <span className="text-[11px] font-mono tracking-wide text-[#A7A7A1]">
          {filename || language.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#2F2F2F] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#43C58B]" />
              <span className="text-[#43C58B]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-[#F5F5F2] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
