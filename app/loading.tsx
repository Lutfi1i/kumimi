import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { MangaGridSkeleton } from "@/components/manga/MangaGridSkeleton";
import { ShimmerBox } from "@/components/ui/ShimmerBox";

export default function Loading() {
  return (
    <>
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-8 animate-in fade-in duration-500">
        <HeroSection />

        <div className="relative w-full h-[90px] rounded-[4px] overflow-hidden mb-8">
          <ShimmerBox />
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="w-full">
          {/* Trending skeleton */}
          <div className="mb-10">
            <div className="w-64 h-6 rounded-sm mb-4 overflow-hidden"><ShimmerBox /></div>
            <div className="flex gap-2 mb-4">
              <div className="w-24 h-10 rounded-full overflow-hidden"><ShimmerBox /></div>
              <div className="w-24 h-10 rounded-full overflow-hidden"><ShimmerBox /></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="relative w-full aspect-[232/301] rounded-lg overflow-hidden border border-border">
                    <ShimmerBox />
                  </div>
                  <div className="w-full h-4 rounded-sm overflow-hidden"><ShimmerBox /></div>
                </div>
              ))}
            </div>
          </div>

          <MangaGridSkeleton title="Populer" showGenrePills />
          <MangaGridSkeleton title="Pembaruan Terbaru" />
          <MangaGridSkeleton title="Rekomendasi Untukmu" />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-ink text-white/40 text-center py-5 text-xs mt-4">
        © 2026{" "}
        <span className="text-gold-muted font-semibold">Kumimi</span>.
        Seluruh hak cipta dilindungi.
      </footer>
    </>
  );
}
