"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { productsBn } from "@/locales/bn";
import { formatPrice, formatDiscountPercent } from "@/lib/formatters/currency";
import { toBnDigits } from "@/lib/formatters/number";
import { ShoppingBag, Star, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const discountText =
    product.originalPrice && product.originalPrice > product.price
      ? formatDiscountPercent(product.originalPrice, product.price)
      : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {discountText ? (
          <span className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg shadow-sm">
            {discountText}
          </span>
        ) : (
          <span />
        )}

        {product.inStock ? (
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-md">
            {productsBn.inStock}
          </span>
        ) : (
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-rose-100 text-rose-800 rounded-md">
            {productsBn.outOfStock}
          </span>
        )}
      </div>

      {/* Image with Link */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full aspect-square bg-slate-50 overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1.5 bg-white/95 text-slate-800 text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            {productsBn.productDetails}
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700 text-xs">
                {toBnDigits(product.rating.toFixed(1))}
              </span>
              <span className="text-[11px] text-slate-400">
                ({toBnDigits(product.reviewsCount)})
              </span>
            </div>
          </div>

          {/* Title (Preserved exactly as provided by backend) */}
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            aria-label={`${product.name} - ${productsBn.addToCart}`}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{productsBn.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

