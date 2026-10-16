import React from "react";

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  description,
  className = "",
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-start justify-between gap-4 select-none ${className}`}>
      <div className="flex flex-col cursor-pointer" onClick={handleClick}>
        <span className="text-sm font-medium text-[#F5F5F2]">{label}</span>
        {description && <span className="text-xs text-[#A7A7A1] mt-0.5">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={label}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? "bg-[#43C58B]" : "bg-[#353535]"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#171717] shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
