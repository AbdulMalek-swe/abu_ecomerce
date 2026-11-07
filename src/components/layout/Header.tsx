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
  Sparkles,
  MessageCircle,
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

  const WHATSAPP_NUMBER = "8801700000000";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি আবূ ই-কমার্স থেকে অর্ডার / তথ্য জানতে চাই।")}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 text-emerald-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>{navigationBn.whatsappContact}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Website Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={isMobileMenuOpen ? navigationBn.closeMenu : navigationBn.openMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                  {commonBn.appName}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:inline">
                  {commonBn.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links: All Products */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {navigationBn.home}
            </Link>
            <Link
              href="/products"
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {navigationBn.allProducts}
            </Link>
            <Link
              href="/track-order"
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {navigationBn.trackOrder}
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-md mx-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={navigationBn.searchPlaceholder}
                className="w-full pl-4 pr-10 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label={navigationBn.searchButton}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Action Area: WhatsApp & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Contact Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={navigationBn.whatsappContact}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 rounded-xl transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{navigationBn.whatsapp}</span>
            </a>

            {/* Cart Icon & Item Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={navigationBn.cart}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-semibold text-xs sm:text-sm shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{navigationBn.cart}</span>
              {totalItemsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-white text-emerald-800 text-[11px] font-bold rounded-full">
                  {toBnDigits(totalItemsCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile / Tablet) */}
        <form onSubmit={handleSearch} className="mt-2.5 lg:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={navigationBn.searchPlaceholder}
              className="w-full pl-4 pr-10 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label={navigationBn.searchButton}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 p-5 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="font-bold text-slate-900 text-sm">
                {navigationBn.menuTitle}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={navigationBn.closeMenu}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-sm font-semibold text-slate-800">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {navigationBn.home}
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {navigationBn.allProducts}
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {navigationBn.trackOrder}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {navigationBn.contact}
              </Link>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{navigationBn.whatsappContact}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
