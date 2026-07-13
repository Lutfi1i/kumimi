
import Navbar from "./components/Navbar";
import TrendingManga from "./components/TrendingManga";

export default function Home() {


  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <TrendingManga />
        </div>
      </main>
    </div>
  );
}
