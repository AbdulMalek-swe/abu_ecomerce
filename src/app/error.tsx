"use client";

import React, { useEffect } from "react";
import { commonBn } from "@/locales/bn";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally if needed
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4 border border-rose-100">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        {commonBn.errorOccurred}
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        অনাকাঙ্ক্ষিত কোনো সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পৃষ্ঠাটি পুনরায় লোড করুন অথবা কিছুক্ষণ পর চেষ্টা করুন।
      </p>

      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>{commonBn.retry}</span>
      </button>
    </div>
  );
}

