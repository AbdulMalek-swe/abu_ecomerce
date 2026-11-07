import React from "react";
import Link from "next/link";
import { commonBn } from "@/locales/bn";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mb-6 shadow-xs border border-rose-100">
        <span className="text-3xl font-extrabold">৪০৪</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
        {commonBn.pageNotFound}
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        {commonBn.pageNotFoundDesc}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>{commonBn.backToHome}</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{commonBn.allProducts}</span>
        </Link>
      </div>
    </div>
  );
}

