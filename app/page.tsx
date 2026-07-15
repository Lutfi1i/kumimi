import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { HeroSectionSkeleton } from "@/components/manga/HeroSectionSkeleton";
import { GenreBrowse } from "@/components/manga/GenreBrowse";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { MangaGridSkeleton } from "@/components/manga/MangaGridSkeleton";
import { UpdateRow } from "@/components/manga/UpdateRow";
import { NowOnWebtoon } from "@/components/manga/NowOnWebtoon";
import { NowOnWebtoonSkeleton } from "@/components/manga/NowOnWebtoonSkeleton";
import { TrendingSeries } from "@/components/manga/TrendingSeries";
import { TrendingSeriesSkeleton } from "@/components/manga/TrendingSeriesSkeleton";
import { Suspense } from "react";
import { fetchHomeData } from "@/lib/api";
import { getMockMangas, getRankedMangas, getRecentMangas } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

async function HeroSectionContent() {
  const data = await fetchHomeData();
  const featuredMangas = data?.featured ?? getMockMangas(3);
  return <HeroSection featured={featuredMangas} />;
}

async function TrendingSeriesContent() {
  const data = await fetchHomeData();
  const popularMangas = data?.popular ?? getMockMangas(21);
  const trendingMangas = data?.popular?.slice(0, 10) ?? getMockMangas(10);
  return <TrendingSeries trending={trendingMangas} popular={popularMangas.slice(0, 10)} />;
}

async function GenreBrowseContent() {
  const data = await fetchHomeData();
  const popularMangas = data?.popular ?? getMockMangas(21);
  return <GenreBrowse mangas={popularMangas} title="Populer" />;
}

async function UpdateRowContent() {
  const data = await fetchHomeData();
  const latestMangas = data?.latest ?? getMockMangas(14, 25);
  return <UpdateRow title="Pembaruan Terbaru" mangas={latestMangas} />;
}

async function MangaGridContent() {
  const data = await fetchHomeData();
  const popularMangas = data?.popular ?? getMockMangas(21);
  const recommendedMangas = data?.recommended ?? getMockMangas(14, 40);
  return <MangaGrid title="Rekomendasi Untukmu" mangas={recommendedMangas} />;
}

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="w-full bg-white">
        {/* Main container with responsive padding */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-8">
          {/* Hero Section */}
          <Suspense fallback={<HeroSectionSkeleton />}>
            <HeroSectionContent />
          </Suspense>

          {/* Trending & Popular Series */}
          <Suspense fallback={<TrendingSeriesSkeleton />}>
            <TrendingSeriesContent />
          </Suspense>

          {/* Additional sections - simplified layout without sidebar */}
          <div className="space-y-8">
            <Suspense fallback={<MangaGridSkeleton title="Populer" count={21} />}>
              <GenreBrowseContent />
            </Suspense>

            <Suspense fallback={<MangaGridSkeleton title="Pembaruan Terbaru" count={14} />}>
              <UpdateRowContent />
            </Suspense>

            <Suspense fallback={<MangaGridSkeleton title="Rekomendasi Untukmu" count={14} />}>
              <MangaGridContent />
            </Suspense>
          </div>

          {/* Last placeholder section */}
          <div className="mb-8 h-[326px] bg-[#f5f5f5] rounded-lg" />
        </div>
      </div>
    </>
  );
}
