"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let bg = "bg-slate-900 text-white";
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;

        if (toast.type === "success") {
          bg = "bg-emerald-950 text-emerald-50 border border-emerald-700/60 shadow-lg shadow-emerald-950/20";
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === "error") {
          bg = "bg-rose-950 text-rose-50 border border-rose-700/60 shadow-lg shadow-rose-950/20";
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 ${bg}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="বন্ধ করুন"
              className="p-1 rounded-lg hover:bg-white/10 transition-colors ml-2 shrink-0"
            >
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

