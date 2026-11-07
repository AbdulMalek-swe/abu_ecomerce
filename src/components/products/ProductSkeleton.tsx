import React from "react";

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-square bg-slate-200/70 rounded-xl mb-4" />

      {/* Brand & rating skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-16 bg-slate-200/70 rounded-md" />
        <div className="h-4 w-10 bg-slate-200/70 rounded-md" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-1.5 mb-4">
        <div className="h-4 w-full bg-slate-200/70 rounded-md" />
        <div className="h-4 w-3/4 bg-slate-200/70 rounded-md" />
      </div>

      {/* Price & button skeleton */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-6 w-20 bg-slate-200/70 rounded-md" />
        <div className="h-9 w-24 bg-slate-200/70 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}

