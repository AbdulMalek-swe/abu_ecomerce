import React from "react";

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between h-full overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-square bg-slate-200/70 rounded-lg sm:rounded-xl mb-3" />

      {/* Brand & rating placeholder */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-3 sm:h-4 w-12 sm:w-16 bg-slate-200/70 rounded-md" />
        <div className="h-3 sm:h-4 w-8 sm:w-10 bg-slate-200/70 rounded-md" />
      </div>

      {/* Title placeholder */}
      <div className="space-y-1.5 mb-3">
        <div className="h-3.5 sm:h-4 w-full bg-slate-200/70 rounded-md" />
        <div className="h-3.5 sm:h-4 w-3/4 bg-slate-200/70 rounded-md" />
      </div>

      {/* Price & button placeholder */}
      <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="h-5 sm:h-6 w-16 sm:w-20 bg-slate-200/70 rounded-md" />
        <div className="h-8 sm:h-9 w-8 sm:w-20 bg-slate-200/70 rounded-lg sm:rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}
