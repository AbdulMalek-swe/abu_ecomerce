import React from "react";
import { commonBn } from "@/locales/bn";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-600 font-medium text-sm animate-pulse">
        {commonBn.loading}
      </p>
    </div>
  );
}

