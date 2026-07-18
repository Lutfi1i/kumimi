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
      <div className="w-full bg-neutral-50 dark:bg-[#0f0f10] min-h-screen text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-10">
          <h1 className="text-2xl font-black mb-6 text-neutral-800 dark:text-white">
            Hasil Pencarian untuk: <span className="text-[#ff6740]">"{query}"</span>
          </h1>

          {results.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#151618] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <p className="text-lg font-bold text-neutral-500 dark:text-neutral-400 mb-2">Tidak ada komik ditemukan</p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">Coba periksa ejaan atau gunakan kata kunci lain</p>
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
