import React from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { commonBn, productsBn, navigationBn } from "@/locales/bn";
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Smartphone,
  Shirt,
  ShoppingBasket,
  Sparkle,
  Home as HomeIcon,
  Watch,
} from "lucide-react";

export default function HomePage() {
  const flashSaleProducts = MOCK_PRODUCTS.filter((p) => p.isFlashSale);
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured);

  const categories = [
    {
      name: navigationBn.categoryLabels.electronics,
      slug: "electronics",
      icon: Smartphone,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      name: navigationBn.categoryLabels.fashion,
      slug: "fashion",
      icon: Shirt,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      name: navigationBn.categoryLabels.grocery,
      slug: "grocery",
      icon: ShoppingBasket,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: navigationBn.categoryLabels.beauty,
      slug: "beauty",
      icon: Sparkle,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
    {
      name: navigationBn.categoryLabels.home,
      slug: "home",
      icon: HomeIcon,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      name: navigationBn.categoryLabels.accessories,
      slug: "accessories",
      icon: Watch,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{navigationBn.announcement}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              সেরা মানের পণ্য,{" "}
              <span className="text-emerald-400">বিশ্বস্ত কেনাকাটা</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              সারা দেশে ক্যাশ অন ডেলিভারি, দ্রুততম হোম ডেলিভারি এবং ১০০% অরিজিনাল পণ্যের নিশ্চয়তা নিয়ে আপনার নির্ভরযোগ্য অনলাইন শপিং ঠিকানা।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 active:scale-95"
              >
                <span>{commonBn.continueShopping}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track-order"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-xl transition-all border border-white/20 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>{navigationBn.trackOrder}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {navigationBn.categories}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              আপনার প্রয়োজনীয় ক্যাটাগরি বেছে নিন
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{commonBn.allProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col items-center text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${cat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Flash Deals / Special Offers */}
      {flashSaleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 p-5 sm:p-7 rounded-3xl border border-rose-200/60 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {productsBn.flashDealsTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {productsBn.flashDealsSubtitle}
                  </p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
              >
                <span>{commonBn.allProducts}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {flashSaleProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {productsBn.featuredTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {productsBn.featuredSubtitle}
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{commonBn.allProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex items-center gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {commonBn.guarantees.fastDeliveryTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {commonBn.guarantees.fastDeliveryDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {commonBn.guarantees.codTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {commonBn.guarantees.codDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {commonBn.guarantees.returnTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {commonBn.guarantees.returnDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
