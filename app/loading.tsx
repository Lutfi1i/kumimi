import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { MangaGridSkeleton } from "@/components/manga/MangaGridSkeleton";
import { SidebarSkeleton } from "@/components/sidebar/SidebarSkeleton";
import { ShimmerBox } from "@/components/ui/ShimmerBox";

export default function Loading() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 animate-in fade-in duration-500">
        <div className="flex gap-8 items-start">
          
          {/* ── MAIN COLUMN ── */}
          <main className="flex-1 min-w-0">
            <div className="relative w-full h-28 md:h-36 rounded-2xl overflow-hidden mb-8">
              <ShimmerBox />
            </div>

            <MangaGridSkeleton title="Populer Minggu Ini" showGenrePills />
            <MangaGridSkeleton title="Pembaruan Terbaru" />
            <MangaGridSkeleton title="Rekomendasi Untukmu" />
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-55 xl:w-60 shrink-0 sticky top-19">
            <SidebarSkeleton />
          </aside>

        </div>
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
