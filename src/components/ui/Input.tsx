import React, { forwardRef, useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, id: customId, className = "", disabled, ...props }, ref) => {
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
          {icon && (
            <div className="absolute left-3.5 text-[#73736E] pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full h-10 bg-[#202020] border text-[#F5F5F2] placeholder-[#73736E] text-sm px-3.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B] disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? "pl-10" : ""
            } ${
              error
                ? "border-[#FF5757] focus-visible:ring-[#FF5757]"
                : "border-[#353535] focus-visible:border-[#43C58B] hover:border-[#4D4D4D]"
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p id={errorId} role="alert" className="text-xs text-[#FF5757] flex items-center gap-1 mt-0.5">
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

Input.displayName = "Input";
