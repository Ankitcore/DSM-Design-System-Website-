"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ShieldCheck, Terminal } from "lucide-react";
import { componentItems } from "@/data/components";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useToast } from "@/components/ui/ToastContext";

export const ComponentLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);

  // Playground state for live interactive elements
  const [btnLoading, setBtnLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleActive, setToggleActive] = useState(true);
  const [checkboxActive, setCheckboxActive] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  const { success } = useToast();

  const categories = ["All", "Actions", "Forms", "Feedback", "Navigation"];

  const filteredComponents = useMemo(() => {
    return componentItems.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleValidateEmail = (val: string) => {
    setEmailInput(val);
    if (!val) {
      setEmailError("Email address is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Enter a valid email address (e.g., name@domain.com)");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 pb-8 border-b border-[#353535]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#43C58B] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#43C58B]" />
            <span>DSM / COMPONENT CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F2] mb-4">
            UI Primitives & Interactive Specifications
          </h1>
          <p className="text-base text-[#A7A7A1] max-w-2xl leading-relaxed">
            Every component in DSM is built from atomic design tokens, tested against WCAG 2.2 AA contrast standards, and includes keyboard interaction contracts.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#202020] border border-[#353535] p-4 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-md flex items-center">
            <Search size={16} className="absolute left-3 text-[#73736E] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components by name or keyword..."
              aria-label="Filter components"
              className="w-full h-10 bg-[#171717] border border-[#353535] focus-visible:border-[#43C58B] text-[#F5F5F2] placeholder-[#73736E] text-xs font-mono pl-9 pr-8 focus-visible:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 p-1 text-[#73736E] hover:text-[#F5F5F2]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#282828] border-[#43C58B] text-[#43C58B] font-semibold"
                    : "bg-[#181818] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Component Showcase List */}
        <div className="flex flex-col gap-12">
          {filteredComponents.map((component) => (
            <section
              key={component.id}
              id={component.id}
              className="border border-[#353535] bg-[#1C1C1C] overflow-hidden scroll-mt-24"
            >
              {/* Header */}
              <div className="p-6 bg-[#212121] border-b border-[#353535] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FF8045]">
                      {component.category}
                    </span>
                    <span className="text-xs text-[#73736E]">•</span>
                    <span className="text-xs font-mono text-[#A7A7A1]">{`<${component.name} />`}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#F5F5F2]">{component.name}</h2>
                  <p className="text-xs text-[#A7A7A1] mt-1 max-w-xl">{component.description}</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCodeId(
                        expandedCodeId === component.id ? null : component.id
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] border border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D] transition-colors"
                  >
                    <Terminal size={13} />
                    <span>{expandedCodeId === component.id ? "Hide Code" : "View Code"}</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Area */}
              <div className="p-8 bg-[#161616] border-b border-[#353535] flex items-center justify-center min-h-[180px]">
                {component.id === "button" && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="mint">Mint Accent</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button
                      variant="mint"
                      isLoading={btnLoading}
                      onClick={() => {
                        setBtnLoading(true);
                        setTimeout(() => setBtnLoading(false), 1500);
                      }}
                    >
                      {btnLoading ? "Processing" : "Click to Test Loading"}
                    </Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                  </div>
                )}

                {component.id === "input" && (
                  <div className="w-full max-w-md flex flex-col gap-4">
                    <Input
                      label="Email Address (Live Validation)"
                      type="email"
                      placeholder="engineer@company.com"
                      value={emailInput}
                      onChange={(e) => handleValidateEmail(e.target.value)}
                      error={emailError}
                      helperText="Type an invalid email to test live validation error state"
                    />
                  </div>
                )}

                {component.id === "select" && (
                  <div className="w-full max-w-sm">
                    <Select
                      label="Export Format"
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      options={[
                        { label: "CSS Custom Properties (.css)", value: "css" },
                        { label: "Structured JSON Tokens (.json)", value: "json" },
                        { label: "Tailwind Theme Preset (.js)", value: "tailwind" },
                      ]}
                      helperText="Accessible select with custom styled arrow and native mobile fallback"
                    />
                  </div>
                )}

                {component.id === "toggle" && (
                  <div className="w-full max-w-md p-4 bg-[#202020] border border-[#353535]">
                    <Toggle
                      label="Real-time Theme Synchronizer"
                      description="Broadcast token changes via BroadcastChannel API"
                      checked={toggleActive}
                      onChange={setToggleActive}
                    />
                  </div>
                )}

                {component.id === "checkbox" && (
                  <div className="w-full max-w-md p-4 bg-[#202020] border border-[#353535] flex flex-col gap-3">
                    <Checkbox
                      label="Enable Strict TypeScript Prop Checking"
                      description="Enforces non-nullable variant union types"
                      checked={checkboxActive}
                      onChange={setCheckboxActive}
                    />
                  </div>
                )}

                {component.id === "modal" && (
                  <div className="text-center">
                    <Button variant="mint" onClick={() => setIsModalOpen(true)}>
                      Open Accessible Dialog
                    </Button>
                    <Modal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      title="Component Specification Review"
                      description="Focus is trapped inside this modal dialog while open."
                      footer={
                        <>
                          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                            Dismiss
                          </Button>
                          <Button
                            variant="mint"
                            size="sm"
                            onClick={() => {
                              setIsModalOpen(false);
                              success("Changes verified and saved");
                            }}
                          >
                            Confirm Action
                          </Button>
                        </>
                      }
                    >
                      <p className="text-xs text-[#A7A7A1] leading-relaxed mb-4">
                        Pressing the <kbd className="px-1.5 py-0.5 bg-[#171717] border border-[#353535] text-[#F5F5F2] font-mono">Escape</kbd> key or clicking the backdrop will immediately dismiss this dialog and return focus to the trigger button.
                      </p>
                    </Modal>
                  </div>
                )}

                {component.id === "alert" && (
                  <div className="w-full max-w-lg flex flex-col gap-3">
                    {!alertDismissed ? (
                      <Alert
                        variant="success"
                        title="WCAG 2.2 AA Contrast Compliance"
                        message="All text tokens achieve a minimum of 4.5:1 contrast against canvas background."
                        onDismiss={() => setAlertDismissed(true)}
                      />
                    ) : (
                      <div className="text-center">
                        <Button variant="outline" size="sm" onClick={() => setAlertDismissed(false)}>
                          Re-show Dismissed Alert
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {component.id === "badge" && (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Badge variant="mint" dot>Active</Badge>
                    <Badge variant="orange" dot>Pending</Badge>
                    <Badge variant="yellow" dot>Review</Badge>
                    <Badge variant="violet">Beta</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                )}

                {component.id === "tabs" && (
                  <div className="w-full max-w-md">
                    <Tabs
                      tabs={[
                        { id: "preview", label: "Interactive View", count: 1 },
                        { id: "specs", label: "ARIA Specifications", count: 3 },
                        { id: "tokens", label: "Token Bindings" },
                      ]}
                      activeTab={activeTab}
                      onChange={setActiveTab}
                    />
                    <div className="p-4 bg-[#202020] border border-t-0 border-[#353535] text-xs font-mono text-[#A7A7A1]">
                      Active panel content: <span className="text-[#43C58B]">{activeTab}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Code Snippet Box (Toggled) */}
              {expandedCodeId === component.id && (
                <div className="border-b border-[#353535]">
                  <CodeBlock code={component.codeSnippet} language="tsx" filename={`${component.name}.tsx`} />
                </div>
              )}

              {/* Props Table & Accessibility Notes */}
              <div className="p-6 bg-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Props Table */}
                <div className="lg:col-span-8 overflow-x-auto">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#A7A7A1] mb-3">
                    Component Props Specification
                  </h4>
                  <table className="w-full text-left text-xs font-mono border border-[#353535]">
                    <thead className="bg-[#242424] text-[#A7A7A1] border-b border-[#353535]">
                      <tr>
                        <th className="p-2.5">Prop</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Default</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B2B2B] text-[#F5F5F2]">
                      {component.propsList.map((p) => (
                        <tr key={p.name} className="hover:bg-[#202020]">
                          <td className="p-2.5 text-[#43C58B] font-semibold">{p.name}</td>
                          <td className="p-2.5 text-[#A7A7A1]">{p.type}</td>
                          <td className="p-2.5 text-[#FFC94A]">{p.default}</td>
                          <td className="p-2.5 font-sans text-xs text-[#A7A7A1]">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Accessibility Card */}
                <div className="lg:col-span-4 p-4 bg-[#202020] border border-[#353535] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#43C58B] mb-2">
                      <ShieldCheck size={15} />
                      <span className="font-semibold uppercase tracking-wider">Accessibility Standard</span>
                    </div>
                    <p className="text-xs text-[#A7A7A1] leading-relaxed">
                      {component.accessibilityNotes}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#2C2C2C] text-[11px] font-mono text-[#73736E]">
                    Audited: WCAG 2.2 AA Verified
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
