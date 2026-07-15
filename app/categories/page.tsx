"use client";

import { useEffect, useState, useTransition, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MangaCard } from "@/components/manga/MangaCard";
import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { GENRES } from "@/lib/genres";
import { fetchGenreManga } from "@/lib/api";
import { getMockMangas } from "@/lib/mock-data";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, BookOpen } from "lucide-react";

const TYPES = [
  { label: "Semua Tipe", value: "" },
  { label: "Manga 🇯🇵", value: "Manga" },
  { label: "Manhwa 🇰🇷", value: "Manhwa" },
  { label: "Manhua 🇨🇳", value: "Manhua" },
];

export default function CategoriesPage() {
  const [allMangas, setAllMangas] = useState<Manga[]>([]);
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // Slug (e.g. "action", "")
  const [selectedGenreLabel, setSelectedGenreLabel] = useState<string>("Semua");
  const [selectedType, setSelectedType] = useState<string>(""); // "", "Manga", "Manhwa", "Manhua"
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 21; // 3 rows of 7 cards

  // Fetch initial mangas (used for offline client-side filtering fallback)
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      try {
        const data = await fetchGenreManga("all");
        if (data && data.length > 0) {
          setAllMangas(data);
        } else {
          // Generate a large set of mock mangas if API returns empty
          setAllMangas(getMockMangas(120));
        }
      } catch (err) {
        console.error("Error loading initial categories data:", err);
        setAllMangas(getMockMangas(120));
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Update filtered list whenever selection changes
  useEffect(() => {
    async function updateFiltered() {
      setLoading(true);
      try {
        const data = await fetchGenreManga(selectedGenre || "all", selectedType || undefined);
        if (data && data.length > 0) {
          setFilteredMangas(data);
        } else {
          // Fallback client-side filter
          const localFiltered = allMangas.filter((m) => {
            const matchesGenre = !selectedGenre || 
              m.genre?.toLowerCase() === selectedGenre.toLowerCase() || 
              m.genre?.toLowerCase() === selectedGenreLabel.toLowerCase();
            const matchesType = !selectedType || 
              m.type?.toLowerCase() === selectedType.toLowerCase();
            return matchesGenre && matchesType;
          });
          setFilteredMangas(localFiltered);
        }
      } catch (err) {
        console.error("Error fetching filtered category results:", err);
        const localFiltered = allMangas.filter((m) => {
          const matchesGenre = !selectedGenre || 
            m.genre?.toLowerCase() === selectedGenre.toLowerCase() || 
            m.genre?.toLowerCase() === selectedGenreLabel.toLowerCase();
          const matchesType = !selectedType || 
            m.type?.toLowerCase() === selectedType.toLowerCase();
          return matchesGenre && matchesType;
        });
        setFilteredMangas(localFiltered);
      } finally {
        setLoading(false);
      }
    }

    if (allMangas.length > 0) {
      updateFiltered();
    }
  }, [selectedGenre, selectedType, allMangas, selectedGenreLabel]);

  // Reset page to 1 when filters change
  const handleGenreChange = (label: string, slug: string) => {
    setSelectedGenre(slug);
    setSelectedGenreLabel(label);
    setCurrentPage(1);
  };

  const handleTypeChange = (typeVal: string) => {
    setSelectedType(typeVal);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = filteredMangas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const currentMangas = useMemo(() => {
    return filteredMangas.slice(startIndex, endIndex);
  }, [filteredMangas, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      startTransition(() => {
        setCurrentPage(page);
        // Scroll smoothly to top of the grid
        const gridElement = document.getElementById("comic-grid-section");
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  };

  // Generate page numbers array to show, e.g. [1, 2, 3] or with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
        {/* Banner Section */}
        <div className="w-full bg-[#191a1c] border-b border-gray-200/50 py-12 text-white shadow-xs">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-white/95 px-3 py-1 rounded-full backdrop-blur-xs select-none">
                Jelajahi Kumimi
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight text-white">
                Kategori & Genre Komik
              </h1>
              <p className="text-white/85 text-sm mt-2 max-w-xl">
                Temukan ribuan judul manga, manhwa, dan manhua terpopuler yang dikelompokkan secara rapi berdasarkan genre favoritmu.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-xl backdrop-blur-md border border-white/10 shrink-0 self-start md:self-auto">
              <BookOpen className="w-8 h-8 text-[#ff6740]" />
              <div className="text-left">
                <p className="text-2xl font-black text-white">{totalItems}</p>
                <p className="text-xs text-white/70 font-semibold uppercase">Judul Ditemukan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-8">
          
          {/* Filtering Control Bar */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] mb-8 space-y-6">
            
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#ff6740]" />
                <h3 className="font-bold text-gray-800 text-lg">Filter Komik</h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedGenre("");
                  setSelectedGenreLabel("Semua");
                  setSelectedType("");
                  setCurrentPage(1);
                }}
                className="text-xs font-bold text-[#ff6740] hover:text-[#e05330] hover:underline transition-all"
              >
                Reset Filter
              </button>
            </div>

            {/* Genre Filter Pills */}
            <div>
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">Genre / Kategori</p>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {GENRES.map((g) => {
                  const isSelected = selectedGenre === g.slug || (g.slug === "" && selectedGenre === "");
                  return (
                    <button
                      key={g.label}
                      onClick={() => handleGenreChange(g.label, g.slug)}
                      className={cn(
                        "shrink-0 text-xs font-bold px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs",
                        isSelected
                          ? "bg-black border-black text-white hover:scale-[1.02]"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-black hover:text-black hover:bg-white"
                      )}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type Filter Pills */}
            <div>
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">Tipe Komik</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => {
                  const isSelected = selectedType === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => handleTypeChange(t.value)}
                      className={cn(
                        "text-xs font-bold px-4.5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs",
                        isSelected
                          ? "bg-[#ff6740] border-[#ff6740] text-white hover:scale-[1.02]"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-black hover:text-black hover:bg-white"
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Comic Grid Section */}
          <div id="comic-grid-section" className="scroll-mt-24 min-h-[400px]">
            {loading ? (
              /* Shimmer skeletons grid */
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border border-gray-200">
                      <ShimmerBox />
                    </div>
                    <div className="w-full h-4 mb-1.5 rounded-sm overflow-hidden">
                      <ShimmerBox />
                    </div>
                    <div className="w-1/2 h-3 rounded-sm overflow-hidden">
                      <ShimmerBox />
                    </div>
                  </div>
                ))}
              </div>
            ) : currentMangas.length === 0 ? (
              <div className="py-16 bg-white rounded-2xl border border-gray-200 shadow-xs">
                <EmptyState 
                  title="Komik Tidak Ditemukan" 
                  description={`Maaf, tidak ada komik yang sesuai dengan kategori "${selectedGenreLabel}" dan tipe "${selectedType || "Semua"}".`} 
                />
              </div>
            ) : (
              <div className="space-y-10">
                {/* Comic Card Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                  {currentMangas.map((m, i) => (
                    <MangaCard
                      key={`${m.slug ?? m.id}-${i}`}
                      manga={m}
                      style={{ 
                        animation: `fadeUp 0.4s ${Math.min(i * 0.03, 0.5)}s ease both`, 
                        opacity: 0 
                      }}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200/60 gap-4">
                    {/* Showing information */}
                    <p className="text-xs text-gray-500 font-medium">
                      Menampilkan <span className="font-bold text-gray-800">{startIndex + 1}</span> - <span className="font-bold text-gray-800">{endIndex}</span> dari <span className="font-bold text-gray-800">{totalItems}</span> komik
                    </p>

                    {/* Pagination Numbers Navigation */}
                    <div className="flex items-center gap-1.5 select-none">
                      {/* First Page */}
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1 || isPending}
                        className={cn(
                          "w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:border-black hover:text-black transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                        )}
                        title="Halaman Pertama"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </button>

                      {/* Prev Page */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isPending}
                        className={cn(
                          "w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:border-black hover:text-black transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                        )}
                        title="Halaman Sebelumnya"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Page list */}
                      {getPageNumbers().map((p, idx) => {
                        if (p === "...") {
                          return (
                            <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-gray-400 select-none">
                              ...
                            </span>
                          );
                        }

                        const pageNum = p as number;
                        const isCurrent = pageNum === currentPage;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={isPending}
                            className={cn(
                              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border transition-all cursor-pointer",
                              isCurrent
                                ? "bg-black border-black text-white hover:scale-105"
                                : "bg-white border-gray-200 text-gray-700 hover:border-black hover:text-black"
                            )}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {/* Next Page */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isPending}
                        className={cn(
                          "w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:border-black hover:text-black transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                        )}
                        title="Halaman Selanjutnya"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Last Page */}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages || isPending}
                        className={cn(
                          "w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:border-black hover:text-black transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                        )}
                        title="Halaman Terakhir"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
