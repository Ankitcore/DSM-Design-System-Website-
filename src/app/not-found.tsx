import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Layers, BookOpen, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full p-8 md:p-12 bg-[#1B1B1B] border border-[#353535] text-center flex flex-col items-center">
        {/* Subtle geometric emblem */}
        <div className="w-16 h-16 bg-[#242424] border border-[#353535] flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M2 16C2 8.26801 8.26801 2 16 2V16H2Z" fill="#43C58B" />
            <path d="M16 16H30L16 30V16Z" fill="#FF8045" />
            <circle cx="23" cy="9" r="5" fill="#FFC94A" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#242424] border border-[#353535] text-xs font-mono uppercase tracking-wider text-[#FF8045] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8045]" />
          <span>Error 404 / Route Not Found</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F2] mb-3">
          Page Specification Not Found
        </h1>

        <p className="text-sm text-[#A7A7A1] leading-relaxed mb-8 max-w-md">
          The requested route does not exist in the DSM registry or may have been relocated. Use the verified directories below to continue navigation.
        </p>

        {/* Suggested Quick Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          <Link
            href="/"
            className="p-3 bg-[#202020] border border-[#353535] hover:border-[#43C58B] transition-colors flex items-center gap-3 text-xs font-mono text-[#F5F5F2]"
          >
            <Home size={16} className="text-[#43C58B] shrink-0" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/components"
            className="p-3 bg-[#202020] border border-[#353535] hover:border-[#43C58B] transition-colors flex items-center gap-3 text-xs font-mono text-[#F5F5F2]"
          >
            <Layers size={16} className="text-[#FF8045] shrink-0" />
            <span>UI Components</span>
          </Link>
          <Link
            href="/resources"
            className="p-3 bg-[#202020] border border-[#353535] hover:border-[#43C58B] transition-colors flex items-center gap-3 text-xs font-mono text-[#F5F5F2]"
          >
            <Compass size={16} className="text-[#FFC94A] shrink-0" />
            <span>Resource Directory</span>
          </Link>
          <Link
            href="/docs"
            className="p-3 bg-[#202020] border border-[#353535] hover:border-[#43C58B] transition-colors flex items-center gap-3 text-xs font-mono text-[#F5F5F2]"
          >
            <BookOpen size={16} className="text-[#B899D8] shrink-0" />
            <span>Documentation</span>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#43C58B] hover:bg-[#37B17A] text-[#171717] font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to DSM Home</span>
        </Link>
      </div>
    </div>
  );
}
