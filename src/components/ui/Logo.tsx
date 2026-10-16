import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  theme?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "dark",
  size = "md",
  className = "",
  linkToHome = true,
}) => {
  const isLight = theme === "light";
  const textColor = isLight ? "#171717" : "#F5F5F2";

  const sizeConfig = {
    sm: { iconSize: 22, fontSize: "text-lg", dotSize: 4, gap: "gap-2" },
    md: { iconSize: 28, fontSize: "text-xl", dotSize: 5, gap: "gap-2.5" },
    lg: { iconSize: 36, fontSize: "text-2xl", dotSize: 6, gap: "gap-3" },
  }[size];

  const iconSvg = (
    <svg
      width={sizeConfig.iconSize}
      height={sizeConfig.iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Mint Green Semicircle */}
      <path
        d="M 2 1 A 41 41 0 0 1 2 83 V 1 Z"
        fill="#4BD1A0"
      />
      {/* Golden Yellow Circle */}
      <circle
        cx="73"
        cy="38.5"
        r="24"
        fill="#FDC527"
      />
      {/* Warm Orange Concave Triangle */}
      <path
        d="M 49 53 L 91 99 H 7 A 50 50 0 0 1 49 53 Z"
        fill="#FD702D"
      />
    </svg>
  );

  const content = (
    <div className={`inline-flex items-center ${sizeConfig.gap} font-semibold tracking-tight ${className}`}>
      {variant !== "wordmark" && iconSvg}
      {variant !== "icon" && (
        <span
          className={`${sizeConfig.fontSize} font-bold tracking-tight select-none flex items-baseline`}
          style={{ color: textColor }}
        >
          DSM
          <span
            className="inline-block rounded-full ml-0.5"
            style={{
              width: sizeConfig.dotSize,
              height: sizeConfig.dotSize,
              backgroundColor: "#FD702D",
            }}
          />
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        aria-label="DSM - Design System for Modern Products Homepage"
        className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4BD1A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] rounded-sm transition-opacity hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return content;
};
