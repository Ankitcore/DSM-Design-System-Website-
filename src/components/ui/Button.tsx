import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "mint" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      icon,
      iconPosition = "left",
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#F5F5F2] text-[#171717] hover:bg-[#E2E2DE] border border-transparent active:bg-[#D5D5D0]",
      mint:
        "bg-[#43C58B] text-[#171717] hover:bg-[#37B17A] border border-transparent font-semibold active:bg-[#2F9E6C]",
      secondary:
        "bg-[#242424] text-[#F5F5F2] hover:bg-[#2C2C2C] border border-[#353535] active:bg-[#202020]",
      outline:
        "bg-transparent text-[#F5F5F2] hover:bg-[#242424] border border-[#353535] hover:border-[#4D4D4D] active:bg-[#1F1F1F]",
      ghost:
        "bg-transparent text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#242424] active:bg-[#1F1F1F]",
    }[variant];

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    }[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="animate-spin shrink-0" />}
        {!isLoading && icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {!isLoading && icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
