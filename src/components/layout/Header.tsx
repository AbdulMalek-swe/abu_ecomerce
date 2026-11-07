"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { commonBn, navigationBn } from "@/locales/bn";
import { toBnDigits } from "@/lib/formatters/number";
import {
  Search,
  ShoppingBag,
  Truck,
  Menu,
  X,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/products");
    }
  };

  const navCategories = [
    { label: navigationBn.categoryLabels.all, href: "/products" },
    { label: navigationBn.categoryLabels.electronics, href: "/products?category=electronics" },
    { label: navigationBn.categoryLabels.fashion, href: "/products?category=fashion" },
    { label: navigationBn.categoryLabels.grocery, href: "/products?category=grocery" },
    { label: navigationBn.categoryLabels.beauty, href: "/products?category=beauty" },
    { label: navigationBn.categoryLabels.home, href: "/products?category=home" },
    { label: navigationBn.categoryLabels.accessories, href: "/products?category=accessories" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <p className="truncate font-medium">{navigationBn.announcement}</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-100 text-xs font-medium">
            <Link
              href="/track-order"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{navigationBn.topTrack}</span>
            </Link>
            <span className="opacity-40">|</span>
            <Link
              href="/contact"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{commonBn.footer.hotline}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={isMobileMenuOpen ? navigationBn.closeMenu : navigationBn.openMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                  {commonBn.appName}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  {commonBn.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Desktop / Tablet) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={navigationBn.searchPlaceholder}
                className="w-full pl-4 pr-11 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label={navigationBn.searchButton}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Links & Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/track-order"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-xl transition-colors border border-transparent hover:border-emerald-200"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{navigationBn.trackOrder}</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={navigationBn.cart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 transition-colors border border-emerald-200/80 font-semibold text-xs sm:text-sm shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{navigationBn.cart}</span>
              {totalItemsCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-700 text-white rounded-full">
                  {toBnDigits(totalItemsCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={navigationBn.searchPlaceholder}
              className="w-full pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label={navigationBn.searchButton}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Categories Bar (Desktop) */}
      <nav aria-label="ক্যাটাগরি মেনু" className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {navCategories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors whitespace-nowrap shadow-2xs border border-transparent hover:border-slate-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="font-bold text-slate-800 text-sm">
                {navigationBn.menuTitle}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={navigationBn.closeMenu}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {navigationBn.home}
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {navigationBn.allProducts}
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {navigationBn.trackOrder}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {navigationBn.contact}
              </Link>

              <div className="pt-3 border-t border-slate-100">
                <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {navigationBn.categories}
                </p>
                {navCategories.map((cat, i) => (
                  <Link
                    key={i}
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

