"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { productsBn, commonBn } from "@/locales/bn";
import { PackageOpen, CheckCircle } from "lucide-react";

interface ProductInfiniteGridProps {
  allProducts: Product[];
  batchSize?: number;
  onResetFilters?: () => void;
}

export function ProductInfiniteGrid({
  allProducts,
  batchSize = 6,
  onResetFilters,
}: ProductInfiniteGridProps) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Safeguards to prevent duplicate / concurrent requests
  const isFetchingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Derived state avoids cascading renders
  const displayedProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const loadNextBatch = useCallback(() => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + batchSize);
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }, 350);
  }, [batchSize, hasMore]);

  // Setup Intersection Observer on the sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isFetchingRef.current) {
          loadNextBatch();
        }
      },
      {
        root: null,
        rootMargin: "250px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [loadNextBatch, hasMore]);

  // Empty State
  if (allProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center my-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {commonBn.noProductsFound}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
          {productsBn.noProductsMatch}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs active:scale-95"
          >
            {productsBn.clearFilters}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sentinel & Loading Indicators */}
      <div ref={sentinelRef} className="py-6 flex flex-col items-center justify-center">
        {isLoadingMore && (
          <div className="w-full">
            <p className="text-center text-xs font-semibold text-slate-500 mb-4 animate-pulse">
              {productsBn.loadingMore}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          </div>
        )}

        {!hasMore && displayedProducts.length > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{productsBn.endOfList}</span>
          </div>
        )}
      </div>
    </div>
  );
}
