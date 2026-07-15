"use client";

import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { SectionHeader } from "./MangaGrid";
import { cn } from "@/lib/utils";
import { GENRES } from "@/lib/genres";

export function MangaCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden">
        <ShimmerBox />
      </div>
      <div>
        <div className="w-full h-4 mb-1.5 rounded-sm overflow-hidden"><ShimmerBox /></div>
        <div className="w-1/2 h-3 rounded-sm overflow-hidden"><ShimmerBox /></div>
      </div>
    </div>
  );
}

interface MangaGridSkeletonProps {
  title: string;
  count?: number;
  showGenrePills?: boolean;
}

export function MangaGridSkeleton({ title, count = 14, showGenrePills = false }: MangaGridSkeletonProps) {
  return (
    <div className="mb-8">
      {showGenrePills && (
        <div className="flex gap-2 flex-wrap mb-5">
          {GENRES.map((g, i) => (
            <div
              key={g.label}
              className={cn(
                "h-[34px] rounded-full overflow-hidden",
                i === 0 ? "w-16" : "w-20"
              )}
            >
              <ShimmerBox className="w-full h-full" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-baseline justify-between mb-4">
        <div className="h-[26px] w-40 rounded-lg overflow-hidden"><ShimmerBox /></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <MangaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
