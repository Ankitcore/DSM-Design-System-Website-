import { ComponentItem } from "@/types";

export const componentItems: ComponentItem[] = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description:
      "Interactive action trigger supporting multiple semantic visual weights, compact sizes, icon pairings, and loading states.",
    usage:
      "Use primary (mint or high-contrast) for the main page task, secondary for supporting actions, outline or ghost for tertiary or destructive steps.",
    accessibilityNotes:
      "Uses native <button> element with explicit type='button' | 'submit'. Renders aria-busy when loading and disables pointer events safely.",
    propsList: [
      { name: "variant", type: "'primary' | 'secondary' | 'mint' | 'outline' | 'ghost'", default: "'primary'", description: "Visual style of the button" },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Padding and font size" },
      { name: "isLoading", type: "boolean", default: "false", description: "Displays spinner and sets aria-busy" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and dims opacity" },
    ],
    codeSnippet: `import { Button } from "@/components/ui/Button";

// Primary high-contrast button
<Button variant="primary" size="md">
  Explore components
</Button>

// Mint accent button
<Button variant="mint" size="md">
  Download Tokens
</Button>

// Outline with icon
<Button variant="outline" size="sm" icon={<ArrowDown size={14} />}>
  Documentation
</Button>`,
  },
  {
    id: "input",
    name: "Form Input",
    category: "Forms",
    description:
      "Accessible text input field with optional leading/trailing icons, error state messaging, and helper descriptions.",
    usage:
      "Pair always with an accessible <label>. Display inline error messages directly below the field when validation fails.",
    accessibilityNotes:
      "Associates aria-describedby with helper or error text. Sets aria-invalid='true' when in error state.",
    propsList: [
      { name: "label", type: "string", default: "required", description: "Visible text label for the field" },
      { name: "error", type: "string", default: "undefined", description: "Error message indicating validation failure" },
      { name: "helperText", type: "string", default: "undefined", description: "Subtle guidance text below the field" },
      { name: "icon", type: "ReactNode", default: "undefined", description: "Icon element rendered inside the left inset" },
    ],
    codeSnippet: `import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

<Input
  label="Resource Query"
  placeholder="Filter by keyword..."
  icon={<Search size={16} />}
  helperText="Press Enter to commit search"
/>

<Input
  label="API Key"
  error="Valid hexadecimal key required"
  defaultValue="invalid-format"
/>`,
  },
  {
    id: "select",
    name: "Select Menu",
    category: "Forms",
    description:
      "Dropdown selector designed for picking a single value from structured options with custom styling and keyboard support.",
    usage:
      "Use when users need to select one option from a list of five or more choices without cluttering screen real estate.",
    accessibilityNotes:
      "Implements role='combobox' or native styled <select> for 100% mobile screen reader and assistive tech parity.",
    propsList: [
      { name: "label", type: "string", default: "undefined", description: "Label text for the select" },
      { name: "options", type: "{ label: string; value: string }[]", default: "[]", description: "Array of selectable options" },
      { name: "value", type: "string", default: "required", description: "Currently selected value" },
      { name: "onChange", type: "(val: string) => void", default: "required", description: "Selection change handler" },
    ],
    codeSnippet: `import { Select } from "@/components/ui/Select";

<Select
  label="Category Filter"
  options={[
    { label: "All Categories", value: "All" },
    { label: "Foundations", value: "Foundations" },
    { label: "Design Tokens", value: "Design Tokens" },
  ]}
  value={selectedCategory}
  onChange={(val) => setSelectedCategory(val)}
/>`,
  },
  {
    id: "toggle",
    name: "Toggle Switch",
    category: "Forms",
    description:
      "Binary on/off toggle control providing immediate visual feedback for application settings and preference switches.",
    usage:
      "Use when toggling an option takes immediate effect without requiring a secondary 'Save' or 'Submit' button.",
    accessibilityNotes:
      "Renders role='switch' with aria-checked='true' | 'false' and keyboard support via Space or Enter keys.",
    propsList: [
      { name: "checked", type: "boolean", default: "false", description: "Current active state" },
      { name: "onChange", type: "(checked: boolean) => void", default: "required", description: "State change callback" },
      { name: "label", type: "string", default: "required", description: "Descriptive label beside switch" },
    ],
    codeSnippet: `import { Toggle } from "@/components/ui/Toggle";

<Toggle
  label="Strict WCAG AAA validation"
  checked={isStrict}
  onChange={setIsStrict}
/>`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description:
      "Multi-selection box with clear checked, unchecked, and focus ring states on dark backgrounds.",
    usage:
      "Use when a user can select zero, one, or multiple items from a list, or to acknowledge terms.",
    accessibilityNotes:
      "Built on native input[type='checkbox'] with high-contrast SVG checkmark and focus indicator.",
    propsList: [
      { name: "checked", type: "boolean", default: "false", description: "Checked state" },
      { name: "onChange", type: "(checked: boolean) => void", default: "required", description: "Handler" },
      { name: "label", type: "string", default: "required", description: "Label text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    codeSnippet: `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox
  label="Include experimental token definitions"
  checked={includeExperimental}
  onChange={(val) => setIncludeExperimental(val)}
/>`,
  },
  {
    id: "modal",
    name: "Dialog (Modal)",
    category: "Feedback",
    description:
      "Accessible overlay dialog with backdrop dismiss, escape key listener, and focus trapping.",
    usage:
      "Use for focused workflows requiring immediate confirmation or detailed single-task configurations.",
    accessibilityNotes:
      "Uses role='dialog' and aria-modal='true'. Traps focus inside the dialog, restoring trigger focus upon close.",
    propsList: [
      { name: "isOpen", type: "boolean", default: "false", description: "Controls visibility" },
      { name: "onClose", type: "() => void", default: "required", description: "Dismiss callback" },
      { name: "title", type: "string", default: "required", description: "Header title" },
      { name: "children", type: "ReactNode", default: "required", description: "Dialog body content" },
    ],
    codeSnippet: `import { Modal } from "@/components/ui/Modal";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Export Design Tokens"
>
  <p className="text-sm text-[#A7A7A1]">Select your output format below.</p>
</Modal>`,
  },
  {
    id: "alert",
    name: "Alert Banner",
    category: "Feedback",
    description:
      "Contextual feedback banner communicating status updates, notices, warnings, and error messages.",
    usage:
      "Position at the top of a section or form to notify the user of an outcome or prominent system condition.",
    accessibilityNotes:
      "Renders role='alert' for urgent messages, role='status' for informational notices.",
    propsList: [
      { name: "variant", type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: "Semantic state" },
      { name: "title", type: "string", default: "required", description: "Alert title" },
      { name: "message", type: "string", default: "required", description: "Detailed description" },
      { name: "onDismiss", type: "() => void", default: "undefined", description: "Optional close callback" },
    ],
    codeSnippet: `import { Alert } from "@/components/ui/Alert";

<Alert
  variant="success"
  title="Tokens Synchronized"
  message="All 11 color tokens have been verified against WCAG 2.2 AA contrast rules."
/>`,
  },
  {
    id: "badge",
    name: "Badge & Pill",
    category: "Actions",
    description:
      "Compact metadata label used for tagging categories, versions, states, and counts.",
    usage:
      "Use sparingly to classify content or highlight key attributes like 'Open Source' or 'v1.4'.",
    accessibilityNotes:
      "Informational only. If used as an interactive filter, wraps within a native button with aria-pressed.",
    propsList: [
      { name: "variant", type: "'mint' | 'orange' | 'yellow' | 'neutral' | 'outline'", default: "'neutral'", description: "Color theme" },
      { name: "size", type: "'sm' | 'md'", default: "'md'", description: "Badge size" },
      { name: "dot", type: "boolean", default: "false", description: "Shows status indicator dot" },
    ],
    codeSnippet: `import { Badge } from "@/components/ui/Badge";

<Badge variant="mint" dot>Open Source</Badge>
<Badge variant="orange">Deprecated</Badge>
<Badge variant="outline">v2.1.0</Badge>`,
  },
  {
    id: "tabs",
    name: "Tabs & Segmented Control",
    category: "Navigation",
    description:
      "Allows switching between distinct views or panels within the same page context.",
    usage:
      "Use to organize related content without forcing users to navigate to a new page.",
    accessibilityNotes:
      "Follows WAI-ARIA Tabs pattern: role='tablist', role='tab', aria-selected='true', role='tabpanel'.",
    propsList: [
      { name: "tabs", type: "{ id: string; label: string }[]", default: "required", description: "Tab definitions" },
      { name: "activeTab", type: "string", default: "required", description: "Active tab id" },
      { name: "onChange", type: "(id: string) => void", default: "required", description: "Tab change handler" },
    ],
    codeSnippet: `import { Tabs } from "@/components/ui/Tabs";

<Tabs
  tabs={[
    { id: "preview", label: "Preview" },
    { id: "code", label: "Code" },
    { id: "props", label: "Properties" },
  ]}
  activeTab={currentTab}
  onChange={setCurrentTab}
/>`,
  },
];
