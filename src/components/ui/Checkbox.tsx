import React, { forwardRef, useId } from "react";
import { Check } from "lucide-react";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, disabled = false, description, className = "" }, ref) => {
    const id = useId();

    return (
      <div className={`flex items-start gap-3 select-none ${className}`}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <label
            htmlFor={id}
            className={`w-5 h-5 flex items-center justify-center border transition-colors cursor-pointer rounded-xs focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#43C58B] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#171717] ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${
              checked
                ? "bg-[#43C58B] border-[#43C58B] text-[#171717]"
                : "bg-[#202020] border-[#353535] hover:border-[#4D4D4D]"
            }`}
          >
            {checked && <Check size={14} strokeWidth={3} />}
          </label>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor={id}
            className={`text-sm text-[#F5F5F2] cursor-pointer ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {label}
          </label>
          {description && <span className="text-xs text-[#A7A7A1] mt-0.5">{description}</span>}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
