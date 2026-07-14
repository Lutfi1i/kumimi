import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { UpdateRow } from "@/components/manga/UpdateRow";
import { RankingList, RecentList } from "@/components/sidebar/Sidebar";
import { fetchHomeData } from "@/lib/api";
import { getMockMangas, getRankedMangas, getRecentMangas } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await fetchHomeData();

  const popularMangas = data?.popular ?? getMockMangas(21);
  const latestMangas = data?.latest ?? getMockMangas(14, 25);
  const recommendedMangas = data?.recommended ?? getMockMangas(14, 40);
  const featuredMangas = data?.featured ?? popularMangas.slice(0, 3);
  const rankedMangas = data?.ranked ?? getRankedMangas(8);
  const recentMangas = data?.recent ?? getRecentMangas(6);

  return (
    <>
      <Navbar />
      <HeroSection featured={featuredMangas} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* ── MAIN COLUMN ── */}
          <main className="flex-1 min-w-0">
            <UpdateRow title="Pembaruan Terbaru" mangas={latestMangas} />

            <MangaGrid
              title="Populer Minggu Ini"
              mangas={popularMangas}
              showGenrePills
            />
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
