"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside modal
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    } else {
      document.body.style.overflow = "";
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className={`w-full ${maxWidthClass} bg-[#202020] border border-[#353535] text-[#F5F5F2] shadow-2xl overflow-hidden focus-visible:outline-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#353535] bg-[#242424]">
          <div>
            <h2 id="modal-title" className="text-base font-semibold tracking-tight text-[#F5F5F2]">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-xs text-[#A7A7A1] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#A7A7A1] hover:text-[#F5F5F2] hover:bg-[#353535] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#43C58B]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 text-sm text-[#A7A7A1]">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#353535] bg-[#1A1A1A]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
