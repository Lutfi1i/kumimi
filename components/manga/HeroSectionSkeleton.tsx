"use client";

import { ShimmerBox } from "@/components/ui/ShimmerBox";

export function HeroSectionSkeleton() {
  return (
    <section className="mb-8">
      <div className="relative rounded-[20px] overflow-hidden border border-[#e0e0e0] bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
          {/* Text skeleton */}
          <div className="flex-1 text-left space-y-4 z-10">
            {/* Badge skeleton */}
            <div className="w-32 h-6 rounded-full overflow-hidden">
              <ShimmerBox />
            </div>

            {/* Heading skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-64 rounded-lg overflow-hidden">
                <ShimmerBox />
              </div>
              <div className="h-8 w-40 rounded-lg overflow-hidden">
                <ShimmerBox />
              </div>
            </div>

            {/* Description skeleton */}
            <div className="h-4 w-48 rounded-lg overflow-hidden">
              <ShimmerBox />
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-32 rounded-full overflow-hidden">
              <ShimmerBox />
            </div>
          </div>

          {/* Cover skeleton */}
          <div className="w-40 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden border border-[#e0e0e0] shrink-0">
            <ShimmerBox />
          </div>
        </div>

        {/* Carousel dots skeleton */}
        <div className="flex items-center gap-2 px-8 pb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full overflow-hidden ${i === 0 ? "w-6" : "w-2"}`}
            >
              <ShimmerBox />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
