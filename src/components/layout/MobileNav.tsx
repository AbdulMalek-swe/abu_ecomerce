"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { navigationBn } from "@/locales/bn";
import { toBnDigits } from "@/lib/formatters/number";
import { Home, Grid, ShoppingBag, Truck } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();

  const links = [
    {
      name: navigationBn.mobileNav.home,
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: navigationBn.mobileNav.products,
      href: "/products",
      icon: Grid,
      isActive: pathname.startsWith("/products"),
    },
    {
      name: navigationBn.mobileNav.track,
      href: "/track-order",
      icon: Truck,
      isActive: pathname.startsWith("/track-order"),
    },
  ];

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {links.slice(0, 2).map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
                link.isActive
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] mt-0.5">{link.name}</span>
            </Link>
          );
        })}

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {toBnDigits(totalItemsCount)}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5">{navigationBn.mobileNav.cart}</span>
        </button>

        {links.slice(2).map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
                link.isActive
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] mt-0.5">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

