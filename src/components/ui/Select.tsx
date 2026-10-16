import React, { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, id: customId, className = "", ...props }, ref) => {
    const defaultId = useId();
    const id = customId || defaultId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-xs font-mono uppercase tracking-wider text-[#A7A7A1] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full h-10 appearance-none bg-[#202020] border text-[#F5F5F2] text-sm px-3.5 pr-9 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              error
                ? "border-[#FF5757] focus-visible:ring-[#FF5757]"
                : "border-[#353535] focus-visible:border-[#43C58B] hover:border-[#4D4D4D]"
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#202020] text-[#F5F5F2]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-[#73736E]">
            <ChevronDown size={16} />
          </div>
        </div>
        {error ? (
          <p id={errorId} role="alert" className="text-xs text-[#FF5757] mt-0.5">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-[#73736E] mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
