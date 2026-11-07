"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { productsBn, commonBn } from "@/locales/bn";
import { PackageOpen, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

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
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safeguards to prevent duplicate requests and duplicate products
  const isFetchingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());

  // Initialize or reset list when incoming allProducts changes
  useEffect(() => {
    isFetchingRef.current = false;
    setHasError(false);

    const initialBatch = allProducts.slice(0, batchSize);
    const seen = new Set<string>();
    const deduplicated: Product[] = [];

    initialBatch.forEach((p) => {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        deduplicated.push(p);
      }
    });

    seenIdsRef.current = seen;
    setDisplayedProducts(deduplicated);
    setHasMore(allProducts.length > deduplicated.length);
  }, [allProducts, batchSize]);

  // Load next batch
  const loadNextBatch = useCallback(() => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setIsLoadingMore(true);
    setHasError(false);

    // Simulate async network fetch
    setTimeout(() => {
      try {
        const currentCount = seenIdsRef.current.size;
        const nextItems = allProducts.slice(currentCount, currentCount + batchSize);

        if (nextItems.length === 0) {
          setHasMore(false);
          setIsLoadingMore(false);
          isFetchingRef.current = false;
          return;
        }

        const newItems: Product[] = [];
        nextItems.forEach((p) => {
          if (!seenIdsRef.current.has(p.id)) {
            seenIdsRef.current.add(p.id);
            newItems.push(p);
          }
        });

        setDisplayedProducts((prev) => [...prev, ...newItems]);
        setHasMore(seenIdsRef.current.size < allProducts.length);
      } catch {
        setHasError(true);
      } finally {
        setIsLoadingMore(false);
        isFetchingRef.current = false;
      }
    }, 400);
  }, [allProducts, batchSize, hasMore]);

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
        rootMargin: "200px",
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

        {hasError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{productsBn.loadError}</span>
            <button
              onClick={loadNextBatch}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{commonBn.retry}</span>
            </button>
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

