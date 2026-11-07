import React, { Suspense } from "react";
import { ProductsClient } from "./ProductsClient";
import { commonBn } from "@/locales/bn";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-600 font-medium">{commonBn.loading}</p>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}

