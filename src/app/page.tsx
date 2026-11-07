import React from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductInfiniteGrid } from "@/components/products/ProductInfiniteGrid";
import { commonBn, productsBn, navigationBn } from "@/locales/bn";
import { toBnDigits } from "@/lib/formatters/number";
import { Sparkles, ArrowRight, Truck, ShieldCheck, ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-8 pb-16">
      {/* Intended Hero Banner (Commercial, Restrained & Responsive) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.12),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{navigationBn.announcement}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              সেরা মানের পণ্য,{" "}
              <span className="text-emerald-400">বিশ্বস্ত কেনাকাটা</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              সারা দেশে ক্যাশ অন ডেলিভারি, দ্রুততম হোম ডেলিভারি এবং ১০০% অরিজিনাল পণ্যের নিশ্চয়তা নিয়ে আপনার নির্ভরযোগ্য অনলাইন শপিং প্ল্যাটফর্ম।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
              >
                <span>{commonBn.continueShopping}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track-order"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-xl transition-all border border-white/20 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>{navigationBn.trackOrder}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Listing with Infinite Scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>{productsBn.allProductsListing}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              মোট {toBnDigits(MOCK_PRODUCTS.length)} টি প্রিমিয়াম পণ্যের কালেকশন
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

        {/* Infinite Scroll Product Grid */}
        <ProductInfiniteGrid allProducts={MOCK_PRODUCTS} batchSize={6} />
      </section>
    </div>
  );
}
