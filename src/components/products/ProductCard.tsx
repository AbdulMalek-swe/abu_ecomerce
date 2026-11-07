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
    <article className="group relative bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
      {/* Top Media & Badges */}
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between gap-1 pointer-events-none">
          {discountText ? (
            <span className="px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold bg-rose-600 text-white rounded-md sm:rounded-lg shadow-xs">
              {discountText}
            </span>
          ) : (
            <span />
          )}

          {product.inStock ? (
            <span className="px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold bg-emerald-100/90 text-emerald-800 rounded-md backdrop-blur-xs">
              {productsBn.inStock}
            </span>
          ) : (
            <span className="px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold bg-rose-100/90 text-rose-800 rounded-md backdrop-blur-xs">
              {productsBn.outOfStock}
            </span>
          )}
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${product.id}`}
          className="block relative w-full h-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="hidden sm:flex absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
            <span className="px-3 py-1.5 bg-white/95 text-slate-800 text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5" />
              {productsBn.productDetails}
            </span>
          </div>
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-2.5 sm:p-3.5 md:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Bar */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-1.5 gap-1">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm truncate max-w-[80px] sm:max-w-none">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700 text-[10px] sm:text-xs">
                {toBnDigits(product.rating.toFixed(1))}
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-400 hidden xs:inline">
                ({toBnDigits(product.reviewsCount)})
              </span>
            </div>
          </div>

          {/* Product Title (Verbatim backend data, clamp 2 lines with consistent min-height) */}
          <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-emerald-700 transition-colors">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
          <div className="min-w-0 flex-1">
            <div className="font-bold text-xs sm:text-base text-slate-900 truncate">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[10px] sm:text-xs text-slate-400 line-through truncate">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            aria-label={`${product.name} - ${productsBn.addToCart}`}
            className="flex items-center justify-center gap-1 p-2 sm:px-3 sm:py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-colors shadow-2xs active:scale-95 shrink-0 min-w-[34px] min-h-[34px] sm:min-w-fit"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">{productsBn.addToCart}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
