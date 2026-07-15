"use client";

import { ShimmerBox } from "@/components/ui/ShimmerBox";

export function NowOnWebtoonSkeleton() {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <div className="h-[26px] w-48 rounded-lg overflow-hidden">
          <ShimmerBox />
        </div>
      </div>

      <div className="h-[90px] rounded-lg overflow-hidden">
        <ShimmerBox />
      </div>
    </section>
  );
}
