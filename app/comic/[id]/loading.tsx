import { Navbar } from "@/components/layout/Navbar";
import { ShimmerBox } from "@/components/ui/ShimmerBox";

export default function ComicDetailLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200">
      <Navbar />

      {/* Blurred background banner header skeleton */}
      <div className="relative w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 pt-10 pb-12 md:py-16">
        {/* Dark/Light overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/70 to-neutral-50 dark:from-transparent dark:via-[#0f0f10]/80 dark:to-[#0f0f10]" />
        
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 z-10 flex flex-col md:flex-row gap-8 items-start md:items-end">
          {/* Cover image card skeleton */}
          <div className="relative w-44 md:w-56 shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800 self-center md:self-auto border border-neutral-200 dark:border-neutral-800">
            <ShimmerBox />
          </div>

          {/* Core Info details skeleton */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title skeleton */}
            <div className="h-10 md:h-12 w-3/4 rounded-lg overflow-hidden">
              <ShimmerBox />
            </div>
            
            {/* Subtitle skeleton */}
            <div className="h-5 w-1/2 rounded-md overflow-hidden">
              <ShimmerBox />
            </div>

            {/* Author skeleton */}
            <div className="h-4 w-32 rounded-md overflow-hidden">
              <ShimmerBox />
            </div>

            {/* Quick Actions (Buttons) skeleton */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="w-48 h-10 rounded-lg overflow-hidden">
                <ShimmerBox />
              </div>
              <div className="w-44 h-10 rounded-lg overflow-hidden">
                <ShimmerBox />
              </div>
            </div>

            {/* Horizontal Mini Tags skeleton */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-16 h-5 rounded-md overflow-hidden">
                  <ShimmerBox />
                </div>
              ))}
            </div>

            {/* Rating skeleton */}
            <div className="h-4 w-12 rounded-md overflow-hidden mt-3">
              <ShimmerBox />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout container */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        
        {/* Synopsis Area skeleton */}
        <div className="space-y-3 max-w-4xl">
          <div className="h-4 w-full rounded-md overflow-hidden">
            <ShimmerBox />
          </div>
          <div className="h-4 w-11/12 rounded-md overflow-hidden">
            <ShimmerBox />
          </div>
          <div className="h-4 w-4/5 rounded-md overflow-hidden">
            <ShimmerBox />
          </div>
        </div>

        {/* Tab Controls Bar skeleton */}
        <div className="w-40 h-8 rounded-lg overflow-hidden mt-12 mb-6">
          <ShimmerBox />
        </div>

        {/* Details & Chapter Grid Layout skeleton */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Sidebar details skeleton */}
          <div className="w-full md:w-60 shrink-0 space-y-6 bg-white dark:bg-[#151618] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 rounded-sm overflow-hidden">
                  <ShimmerBox />
                </div>
                <div className="h-7 w-28 rounded-md overflow-hidden">
                  <ShimmerBox />
                </div>
              </div>
            ))}
          </div>

          {/* Right Chapters list skeleton */}
          <div className="flex-1 w-full bg-white dark:bg-[#151618] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="h-6 w-32 rounded-md overflow-hidden mb-4">
              <ShimmerBox />
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 w-full rounded-xl overflow-hidden">
                <ShimmerBox />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
