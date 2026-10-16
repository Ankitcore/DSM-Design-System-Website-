import React from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  message,
  onDismiss,
  className = "",
}) => {
  const config = {
    info: {
      border: "border-[#353535]",
      bg: "bg-[#202020]",
      text: "text-[#F5F5F2]",
      icon: <Info size={18} className="text-[#A7A7A1] shrink-0" />,
      role: "status",
    },
    success: {
      border: "border-[#2D5A43]",
      bg: "bg-[#182C22]",
      text: "text-[#43C58B]",
      icon: <CheckCircle2 size={18} className="text-[#43C58B] shrink-0" />,
      role: "status",
    },
    warning: {
      border: "border-[#645322]",
      bg: "bg-[#2D2612]",
      text: "text-[#FFC94A]",
      icon: <AlertTriangle size={18} className="text-[#FFC94A] shrink-0" />,
      role: "alert",
    },
    error: {
      border: "border-[#5E2B2B]",
      bg: "bg-[#2D1616]",
      text: "text-[#FF5757]",
      icon: <XCircle size={18} className="text-[#FF5757] shrink-0" />,
      role: "alert",
    },
  }[variant];

  return (
    <div
      role={config.role}
      className={`flex items-start justify-between gap-3.5 p-4 border ${config.border} ${config.bg} ${className}`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="pt-0.5">{config.icon}</div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className={`text-sm font-semibold tracking-tight ${config.text}`}>{title}</h3>
          <p className="text-xs text-[#A7A7A1] leading-relaxed">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="text-[#73736E] hover:text-[#F5F5F2] p-1 transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
