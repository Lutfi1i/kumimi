"use client";

import { ShimmerBox } from "@/components/ui/ShimmerBox";

function TrendingCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {/* Cover */}
      <div className="relative w-full aspect-[232/301] rounded-lg overflow-hidden border border-[#e0e0e0]">
        <ShimmerBox />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-sm overflow-hidden">
          <ShimmerBox />
        </div>
        <div className="h-3 w-2/3 rounded-sm overflow-hidden">
          <ShimmerBox />
        </div>
      </div>

      {/* Genre */}
      <div className="h-3 w-20 rounded-sm overflow-hidden mt-1">
        <ShimmerBox />
      </div>
    </div>
  );
}

export function TrendingSeriesSkeleton() {
  return (
    <section className="mb-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-[26px] w-64 rounded-lg overflow-hidden">
          <ShimmerBox />
        </div>
        <div className="h-4 w-20 rounded-lg overflow-hidden">
          <ShimmerBox />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 pb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-10 w-24 rounded-full overflow-hidden">
            <ShimmerBox />
          </div>
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <TrendingCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
