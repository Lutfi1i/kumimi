import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { RankingList, RecentList } from "@/components/sidebar/Sidebar";
import { getMockMangas, getRankedMangas, getRecentMangas } from "@/lib/mock-data";

export default function Home() {
  const popularMangas = getMockMangas(21);
  const latestMangas = getMockMangas(14, 25);
  const recommendedMangas = getMockMangas(14, 40);
  const rankedMangas = getRankedMangas(8);
  const recentMangas = getRecentMangas(6);

  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* ── MAIN COLUMN ── */}
          <main className="flex-1 min-w-0">
            <MangaGrid
              title="Populer Minggu Ini"
              mangas={popularMangas}
              showGenrePills
            />
            <MangaGrid title="Pembaruan Terbaru" mangas={latestMangas} />
            <MangaGrid title="Rekomendasi Untukmu" mangas={recommendedMangas} />
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-55 xl:w-60 shrink-0 sticky top-19">
            <RankingList mangas={rankedMangas} />
            <RecentList mangas={recentMangas} />
          </aside>
        </div>
      </div>
    </>
  );
}