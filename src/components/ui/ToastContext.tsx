"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Check, X, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev.slice(-3), { id, type, message }]);

      setTimeout(() => {
        removeToast(id);
      }, 3200);
    },
    [removeToast]
  );

  const value: ToastContextType = {
    toast: addToast,
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
  };

  const icons = {
    success: <Check size={16} className="text-[#43C58B] shrink-0" />,
    error: <X size={16} className="text-[#FF5757] shrink-0" />,
    warning: <AlertTriangle size={16} className="text-[#FFC94A] shrink-0" />,
    info: <Info size={16} className="text-[#F5F5F2] shrink-0" />,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <aside
        aria-label="Notifications"
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#202020] border border-[#353535] text-[#F5F5F2] text-sm shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icons[item.type]}
              <span className="truncate text-xs font-medium">{item.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(item.id)}
              className="text-[#73736E] hover:text-[#F5F5F2] p-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
