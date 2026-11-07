"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { commonBn, productsBn, navigationBn } from "@/locales/bn";
import { toBnDigits } from "@/lib/formatters/number";
import { formatPrice } from "@/lib/formatters/currency";
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  PackageOpen,
  ArrowUpDown,
} from "lucide-react";

export function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands from backend data
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand)));
    return brands.sort();
  }, []);

  const categories = [
    { key: "all", label: navigationBn.categoryLabels.all },
    { key: "electronics", label: navigationBn.categoryLabels.electronics },
    { key: "fashion", label: navigationBn.categoryLabels.fashion },
    { key: "grocery", label: navigationBn.categoryLabels.grocery },
    { key: "beauty", label: navigationBn.categoryLabels.beauty },
    { key: "home", label: navigationBn.categoryLabels.home },
    { key: "accessories", label: navigationBn.categoryLabels.accessories },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Search Query (Bangla or English query matched against product name & description verbatim)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesBrand) return false;
      }

      // 2. Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // 3. Brand
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }

      // 4. Max Price
      if (product.price > maxPrice) {
        return false;
      }

      // 5. In Stock Only
      if (onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0; // default / featured
    });
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setMaxPrice(150000);
    setOnlyInStock(false);
    setSortBy("featured");
    router.push("/products");
  };

  const filterSidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>{productsBn.filters}</span>
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{productsBn.clearFilters}</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-slate-800 text-sm mb-3">
          {productsBn.filterByCategory}
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                selectedCategory === cat.key
                  ? "bg-emerald-600 text-white font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-xs ${
                  selectedCategory === cat.key ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                {toBnDigits(
                  cat.key === "all"
                    ? MOCK_PRODUCTS.length
                    : MOCK_PRODUCTS.filter((p) => p.category === cat.key).length
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-800 text-sm">
            {productsBn.filterByPrice}
          </h4>
          <span className="text-xs font-bold text-emerald-700">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={150000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>{formatPrice(500)}</span>
          <span>{formatPrice(150000)}</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="font-semibold text-slate-800 text-sm mb-2.5">
          {productsBn.filterByBrand}
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs sm:text-sm text-slate-700">
            <input
              type="radio"
              name="brandFilter"
              checked={selectedBrand === "all"}
              onChange={() => setSelectedBrand("all")}
              className="accent-emerald-600"
            />
            <span>সকল ব্র্যান্ড</span>
          </label>
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs sm:text-sm text-slate-700"
            >
              <input
                type="radio"
                name="brandFilter"
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
                className="accent-emerald-600"
              />
              {/* Brand name preserved exactly from backend */}
              <span className="font-medium">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded-md accent-emerald-600 text-white"
          />
          <span>{productsBn.onlyInStock}</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {productsBn.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {productsBn.pageSubtitle}
        </p>
      </div>

      {/* Top Filter & Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>{productsBn.filters}</span>
        </button>

        {/* Live Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={commonBn.searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-500 hidden sm:inline" />
          <span className="text-xs sm:text-sm font-medium text-slate-600 hidden sm:inline">
            {productsBn.sortBy}:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="featured">{productsBn.sortOptions.featured}</option>
            <option value="newest">{productsBn.sortOptions.newest}</option>
            <option value="priceLowToHigh">
              {productsBn.sortOptions.priceLowToHigh}
            </option>
            <option value="priceHighToLow">
              {productsBn.sortOptions.priceHighToLow}
            </option>
            <option value="rating">{productsBn.sortOptions.rating}</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs h-fit sticky top-28">
          {filterSidebarContent}
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
            <span>
              {productsBn.showingResults(
                toBnDigits(filteredProducts.length),
                toBnDigits(MOCK_PRODUCTS.length)
              )}
            </span>
            {(selectedCategory !== "all" || selectedBrand !== "all" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                ফিল্টার রিসেট
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {commonBn.noProductsFound}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
                {productsBn.noProductsMatch}
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
              >
                {productsBn.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {productsBn.filters}
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterSidebarContent}
            <div className="pt-6 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center shadow-sm"
              >
                পণ্য দেখুন ({toBnDigits(filteredProducts.length)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

