"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "line" | "segmented";
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  variant = "line",
}) => {
  if (variant === "segmented") {
    return (
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`inline-flex p-1 bg-[#202020] border border-[#353535] gap-1 ${className}`}
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => onChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
                isSelected
                  ? "bg-[#2E2E2E] text-[#F5F5F2] font-semibold border border-[#444444]"
                  : "text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#262626] border border-transparent"
              }`}
            >
              {tab.label}
              {typeof tab.count === "number" && (
                <span className="ml-1.5 px-1 py-0.2 bg-[#171717] text-[10px] text-[#A7A7A1]">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`flex items-center gap-6 border-b border-[#353535] overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isSelected = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
              isSelected ? "text-[#F5F5F2] font-semibold" : "text-[#A7A7A1] hover:text-[#F5F5F2]"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-[#202020] border border-[#353535] text-[#A7A7A1]">
                {tab.count}
              </span>
            )}
            {isSelected && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#43C58B]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
