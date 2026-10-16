import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "mint" | "orange" | "yellow" | "violet" | "neutral" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-mono uppercase tracking-wider font-medium select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] gap-1.5",
    md: "px-2.5 py-1 text-xs gap-2",
  }[size];

  const variantStyles = {
    mint: "bg-[#1B3327] text-[#43C58B] border border-[#2D5A43]",
    orange: "bg-[#3D2518] text-[#FF8045] border border-[#643C27]",
    yellow: "bg-[#3D3316] text-[#FFC94A] border border-[#645322]",
    violet: "bg-[#2F243B] text-[#B899D8] border border-[#523F67]",
    neutral: "bg-[#242424] text-[#A7A7A1] border border-[#353535]",
    outline: "bg-transparent text-[#F5F5F2] border border-[#353535]",
  }[variant];

  const dotColors = {
    mint: "bg-[#43C58B]",
    orange: "bg-[#FF8045]",
    yellow: "bg-[#FFC94A]",
    violet: "bg-[#B899D8]",
    neutral: "bg-[#A7A7A1]",
    outline: "bg-[#F5F5F2]",
  }[variant];

  return (
    <span
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
};
