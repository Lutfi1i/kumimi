import Navbar from "./components/Navbar";
import TrendingManga from "./components/TrendingManga";
import HeroSection from "./components/HeroSection";
import LatestUpdates from "./components/LatestUpdates";
import TopInGenres from "./components/TopInGenres";
import GenreList from "./components/GenreList";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-12">
          <HeroSection />
          <TrendingManga />
          <TopInGenres />
          <LatestUpdates />
          <GenreList />
        </div>
      </main>

    </div>
  );
}