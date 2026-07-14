"use client";

import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { SectionHeader } from "./MangaGrid";
import { cn } from "@/lib/utils";
import { GENRES } from "@/lib/mock-data";

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
    <div className="mb-10">
      {showGenrePills && (
        <div className="flex gap-2 flex-wrap mb-5">
          {GENRES.map((genre, i) => (
            <div
              key={genre}
              className={cn(
                "h-[30px] rounded-full overflow-hidden",
                i === 0 ? "w-16" : "w-20"
              )}
            >
              <ShimmerBox className="w-full h-full" />
            </div>
          ))}
        </div>
      )}

      <SectionHeader title={title} />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <MangaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
