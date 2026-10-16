"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Check, Sparkles } from "lucide-react";
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

export const ComponentShowcase: React.FC = () => {
  const [activeComponentId, setActiveComponentId] = useState("button");
  const [viewMode, setViewMode] = useState<"preview" | "code" | "props">("preview");

  // Interactive playground states
  const [buttonVariant, setButtonVariant] = useState<"primary" | "mint" | "secondary" | "outline" | "ghost">("mint");
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [inputVal, setInputVal] = useState("Search interface tokens");
  const [inputHasError, setInputHasError] = useState(false);

  const [selectedCity, setSelectedCity] = useState("foundations");
  const [toggleState, setToggleState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "warning" | "error">("success");
  const [currentTab, setCurrentTab] = useState("tab-1");

  const currentComponent =
    componentItems.find((c) => c.id === activeComponentId) || componentItems[0];

  return (
    <section id="components" className="w-full py-16 border-t border-[#353535] bg-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#353535]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF8045] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8045]" />
              <span>UI Primitives & Interactive Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F2]">
              Engineered Component Library
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/components"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#43C58B] hover:underline"
            >
              <span>Full Component API Catalog</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {componentItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveComponentId(item.id);
                setViewMode("preview");
              }}
              className={`px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] ${
                activeComponentId === item.id
                  ? "bg-[#252525] border-[#43C58B] text-[#F5F5F2] font-semibold"
                  : "bg-[#1B1B1B] border-[#353535] text-[#A7A7A1] hover:text-[#F5F5F2] hover:border-[#4D4D4D]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Workspace: Preview / Code / Props */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#353535] bg-[#1B1B1B]">
          {/* Main Stage */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#353535]">
            <div>
              {/* Top Bar inside Stage */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2C2C2C]">
                <div>
                  <h3 className="text-xl font-bold text-[#F5F5F2]">{currentComponent.name}</h3>
                  <p className="text-xs text-[#A7A7A1] mt-1">{currentComponent.description}</p>
                </div>

                <div className="flex items-center gap-1 bg-[#141414] p-1 border border-[#353535]">
                  <button
                    type="button"
                    onClick={() => setViewMode("preview")}
                    className={`px-3 py-1 text-xs font-mono transition-colors ${
                      viewMode === "preview"
                        ? "bg-[#252525] text-[#F5F5F2] font-semibold"
                        : "text-[#A7A7A1] hover:text-[#F5F5F2]"
                    }`}
                  >
                    Interactive
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("code")}
                    className={`px-3 py-1 text-xs font-mono transition-colors ${
                      viewMode === "code"
                        ? "bg-[#252525] text-[#F5F5F2] font-semibold"
                        : "text-[#A7A7A1] hover:text-[#F5F5F2]"
                    }`}
                  >
                    Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("props")}
                    className={`px-3 py-1 text-xs font-mono transition-colors ${
                      viewMode === "props"
                        ? "bg-[#252525] text-[#F5F5F2] font-semibold"
                        : "text-[#A7A7A1] hover:text-[#F5F5F2]"
                    }`}
                  >
                    Props
                  </button>
                </div>
              </div>

              {/* View Modes */}
              {viewMode === "preview" && (
                <div className="min-h-[280px] flex items-center justify-center p-8 bg-[#151515] border border-[#2A2A2A]">
                  {/* Dynamic Interactive Render based on selected component */}
                  {activeComponentId === "button" && (
                    <div className="flex flex-col items-center gap-6">
                      <Button
                        variant={buttonVariant}
                        size={buttonSize}
                        isLoading={buttonLoading}
                        disabled={buttonDisabled}
                      >
                        Action Trigger
                      </Button>
                      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#73736E]">
                        <span>Variant: {buttonVariant}</span>
                        <span>•</span>
                        <span>Size: {buttonSize}</span>
                        <span>•</span>
                        <span>State: {buttonLoading ? "Loading" : buttonDisabled ? "Disabled" : "Active"}</span>
                      </div>
                    </div>
                  )}

                  {activeComponentId === "input" && (
                    <div className="w-full max-w-sm">
                      <Input
                        label="DSM Design Token Query"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Search..."
                        icon={<Search size={16} />}
                        error={inputHasError ? "Token specification not found in current schema" : undefined}
                        helperText={!inputHasError ? "Type token name or hex code to inspect" : undefined}
                      />
                    </div>
                  )}

                  {activeComponentId === "select" && (
                    <div className="w-full max-w-xs">
                      <Select
                        label="Active Domain Module"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        options={[
                          { label: "Foundations & Scales", value: "foundations" },
                          { label: "Component Contracts", value: "components" },
                          { label: "Typography Rules", value: "typography" },
                          { label: "Accessibility Matrix", value: "accessibility" },
                        ]}
                        helperText="Selected value synchronizes schema across views"
                      />
                    </div>
                  )}

                  {activeComponentId === "toggle" && (
                    <div className="w-full max-w-sm p-4 bg-[#1E1E1E] border border-[#353535]">
                      <Toggle
                        label="Enforce WCAG 2.2 AA Contrast"
                        description="Automatically flags text combinations below 4.5:1 ratio."
                        checked={toggleState}
                        onChange={setToggleState}
                      />
                    </div>
                  )}

                  {activeComponentId === "checkbox" && (
                    <div className="w-full max-w-sm p-4 bg-[#1E1E1E] border border-[#353535] flex flex-col gap-3">
                      <Checkbox
                        label="Enable fluid clamp() type calculations"
                        description="Interpolates display headlines across viewport widths."
                        checked={checkboxState}
                        onChange={setCheckboxState}
                      />
                      <Checkbox
                        label="Include legacy vendor prefixes"
                        description="Disabled in current target compilation."
                        checked={false}
                        disabled={true}
                        onChange={() => {}}
                      />
                    </div>
                  )}

                  {activeComponentId === "modal" && (
                    <div className="text-center">
                      <Button variant="mint" onClick={() => setIsModalOpen(true)}>
                        Launch Interactive Dialog
                      </Button>
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="DSM Architecture Export"
                        description="Configure production build tokens for CSS export."
                        footer={
                          <>
                            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="mint" size="sm" onClick={() => setIsModalOpen(false)}>
                              Save Configuration
                            </Button>
                          </>
                        }
                      >
                        <p className="text-xs text-[#A7A7A1] leading-relaxed">
                          This dialog traps focus, supports the Escape key for immediate dismissal, and complies with WCAG 2.2 AA modal specifications.
                        </p>
                      </Modal>
                    </div>
                  )}

                  {activeComponentId === "alert" && (
                    <div className="w-full max-w-md">
                      <Alert
                        variant={alertType}
                        title={
                          alertType === "success"
                            ? "All 11 Tokens Verified"
                            : alertType === "warning"
                            ? "Subtle Text Contrast Notice"
                            : alertType === "error"
                            ? "Configuration Failed"
                            : "System Notice"
                        }
                        message="Verified against WCAG 2.2 AA criteria on canvas background #171717."
                        onDismiss={() => {}}
                      />
                    </div>
                  )}

                  {activeComponentId === "badge" && (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Badge variant="mint" dot>Open Source</Badge>
                      <Badge variant="orange" dot>v2.1 Specs</Badge>
                      <Badge variant="yellow">Audit: Pass</Badge>
                      <Badge variant="violet">Editorial</Badge>
                      <Badge variant="outline">CSS Var</Badge>
                    </div>
                  )}

                  {activeComponentId === "tabs" && (
                    <div className="w-full max-w-md">
                      <Tabs
                        variant="segmented"
                        tabs={[
                          { id: "tab-1", label: "Foundations", count: 4 },
                          { id: "tab-2", label: "Components", count: 11 },
                          { id: "tab-3", label: "Guidelines", count: 6 },
                        ]}
                        activeTab={currentTab}
                        onChange={setCurrentTab}
                      />
                    </div>
                  )}
                </div>
              )}

              {viewMode === "code" && (
                <CodeBlock code={currentComponent.codeSnippet} language="tsx" />
              )}

              {viewMode === "props" && (
                <div className="overflow-x-auto border border-[#353535] bg-[#141414]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#202020] border-b border-[#353535] text-[#A7A7A1]">
                      <tr>
                        <th className="p-3">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Default</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626] text-[#F5F5F2]">
                      {currentComponent.propsList.map((p) => (
                        <tr key={p.name} className="hover:bg-[#1A1A1A]">
                          <td className="p-3 text-[#43C58B] font-semibold">{p.name}</td>
                          <td className="p-3 text-[#A7A7A1]">{p.type}</td>
                          <td className="p-3 text-[#FFC94A]">{p.default}</td>
                          <td className="p-3 text-xs font-sans text-[#A7A7A1]">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Accessibility and Usage Guidance Note */}
            <div className="mt-6 pt-4 border-t border-[#2A2A2A] text-xs text-[#A7A7A1] flex items-start gap-2.5">
              <span className="p-1 bg-[#252525] border border-[#353535] text-[#43C58B] shrink-0">
                <Check size={12} />
              </span>
              <div>
                <span className="text-[#F5F5F2] font-semibold">Accessibility Guarantee: </span>
                {currentComponent.accessibilityNotes}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Playground Configurator */}
          <div className="lg:col-span-4 p-6 bg-[#161616] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A7A7A1] mb-4">
                <Sparkles size={14} className="text-[#FF8045]" />
                <span>Playground Controls</span>
              </div>

              {activeComponentId === "button" && (
                <div className="flex flex-col gap-5 text-xs font-mono">
                  <div>
                    <label className="text-[#A7A7A1] block mb-2">Variant</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["primary", "mint", "secondary", "outline", "ghost"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setButtonVariant(v)}
                          className={`px-2.5 py-1.5 text-xs capitalize border transition-colors ${
                            buttonVariant === v
                              ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                              : "bg-[#1E1E1E] border-[#353535] text-[#A7A7A1] hover:border-[#4D4D4D]"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[#A7A7A1] block mb-2">Size</label>
                    <div className="flex gap-2">
                      {(["sm", "md", "lg"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setButtonSize(s)}
                          className={`flex-1 py-1.5 text-xs uppercase border transition-colors ${
                            buttonSize === s
                              ? "bg-[#252525] border-[#43C58B] text-[#43C58B] font-semibold"
                              : "bg-[#1E1E1E] border-[#353535] text-[#A7A7A1] hover:border-[#4D4D4D]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#262626] flex flex-col gap-3">
                    <label className="flex items-center justify-between cursor-pointer text-[#F5F5F2]">
                      <span>Loading State</span>
                      <input
                        type="checkbox"
                        checked={buttonLoading}
                        onChange={(e) => setButtonLoading(e.target.checked)}
                        className="accent-[#43C58B]"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer text-[#F5F5F2]">
                      <span>Disabled State</span>
                      <input
                        type="checkbox"
                        checked={buttonDisabled}
                        onChange={(e) => setButtonDisabled(e.target.checked)}
                        className="accent-[#43C58B]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeComponentId === "input" && (
                <div className="flex flex-col gap-4 text-xs font-mono">
                  <label className="flex items-center justify-between cursor-pointer text-[#F5F5F2]">
                    <span>Toggle Error State</span>
                    <input
                      type="checkbox"
                      checked={inputHasError}
                      onChange={(e) => setInputHasError(e.target.checked)}
                      className="accent-[#FF5757]"
                    />
                  </label>
                </div>
              )}

              {activeComponentId === "alert" && (
                <div className="flex flex-col gap-3 text-xs font-mono">
                  <label className="text-[#A7A7A1] block">Alert Semantic Type</label>
                  {(["info", "success", "warning", "error"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAlertType(t)}
                      className={`px-3 py-2 text-xs uppercase text-left border transition-colors ${
                        alertType === t
                          ? "bg-[#252525] border-[#43C58B] text-[#F5F5F2] font-semibold"
                          : "bg-[#1E1E1E] border-[#353535] text-[#A7A7A1] hover:border-[#4D4D4D]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {activeComponentId !== "button" && activeComponentId !== "input" && activeComponentId !== "alert" && (
                <div className="text-xs text-[#A7A7A1] leading-relaxed">
                  Interactive controls for this component are operated directly in the preview stage on the left.
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#262626] mt-6">
              <Link
                href="/components"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#252525] hover:bg-[#2C2C2C] border border-[#353535] text-xs font-mono text-[#F5F5F2] transition-colors"
              >
                <span>Browse All 11 Components</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
