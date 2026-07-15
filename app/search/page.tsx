import { Navbar } from "@/components/layout/Navbar";
import { MangaCard } from "@/components/manga/MangaCard";
import { fetchSearchResults } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const results = query ? await fetchSearchResults(query) : [];

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#191a1c] min-h-screen text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-10">
          <h1 className="text-2xl font-bold mb-6 text-[#e1e2e4]">
            Hasil Pencarian untuk: <span className="text-[#ff6740]">"{query}"</span>
          </h1>

          {results.length === 0 ? (
            <div className="text-center py-20 bg-[#242527] rounded-xl border border-[#2c2d30]">
              <p className="text-lg text-[#aaa] mb-2">Tidak ada komik ditemukan</p>
              <p className="text-sm text-[#666]">Coba periksa ejaan atau gunakan kata kunci lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {results.map((m, i) => (
                <MangaCard key={m.id} manga={m} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
