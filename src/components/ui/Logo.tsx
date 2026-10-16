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
    sm: { iconSize: 20, fontSize: "text-lg", dotSize: 4, gap: "gap-2" },
    md: { iconSize: 26, fontSize: "text-xl", dotSize: 5, gap: "gap-2.5" },
    lg: { iconSize: 34, fontSize: "text-2xl", dotSize: 6, gap: "gap-3" },
  }[size];

  const iconSvg = (
    <svg
      width={sizeConfig.iconSize}
      height={sizeConfig.iconSize}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Precision geometric DSM mark: mint semicircle quadrant + orange triangle + yellow focal dot */}
      <path
        d="M2 16C2 8.26801 8.26801 2 16 2V16H2Z"
        fill="#43C58B"
      />
      <path
        d="M16 16H30L16 30V16Z"
        fill="#FF8045"
      />
      <circle
        cx="23"
        cy="9"
        r="5"
        fill="#FFC94A"
      />
      <rect
        x="5"
        y="21"
        width="6"
        height="6"
        fill="#B899D8"
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
              backgroundColor: "#FF8045",
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
        className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43C58B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] rounded-sm transition-opacity hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return content;
};
