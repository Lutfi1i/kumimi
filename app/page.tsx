import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/manga/HeroSection";
import { HeroSectionSkeleton } from "@/components/manga/HeroSectionSkeleton";
import { GenreBrowse } from "@/components/manga/GenreBrowse";
import { MangaGrid, FeaturedBanner } from "@/components/manga/MangaGrid";
import { MangaGridSkeleton } from "@/components/manga/MangaGridSkeleton";
import { UpdateRow } from "@/components/manga/UpdateRow";
import { TrendingSeries } from "@/components/manga/TrendingSeries";
import { TrendingSeriesSkeleton } from "@/components/manga/TrendingSeriesSkeleton";
import { Suspense } from "react";
import { fetchHomeData } from "@/lib/api";
import { getMockMangas, getRankedMangas, getRecentMangas } from "@/lib/mock-data";
import { PersonalizedRecommendations } from "@/components/manga/PersonalizedRecommendations";

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
  const recommendedMangas = data?.recommended ?? getMockMangas(14, 40);
  return <PersonalizedRecommendations fallbackMangas={recommendedMangas} />;
}

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="w-full bg-neutral-50 dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-200">
        {/* Main container with responsive padding */}
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-8 md:px-12 lg:px-[120px] py-4 sm:py-8">
          {/* Hero Section */}
          <Suspense fallback={<HeroSectionSkeleton />}>
            <HeroSectionContent />
          </Suspense>

          {/* Trending & Popular Series */}
          <Suspense fallback={<TrendingSeriesSkeleton />}>
            <TrendingSeriesContent />
          </Suspense>

          {/* Additional sections */}
          <div className="space-y-6 sm:space-y-8">
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

          {/* Last promo section */}
          <div className="mt-6 sm:mt-8">
            <FeaturedBanner />
          </div>
        </div>
      </div>
    </>
  );
}
