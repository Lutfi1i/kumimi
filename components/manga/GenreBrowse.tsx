"use client";

import { useCallback, useRef, useState } from "react";
import { MangaCard } from "./MangaCard";
import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { EmptyState } from "@/components/ui/EmptyState";
import { GENRES } from "@/lib/genres";
import { fetchGenreManga } from "@/lib/api";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";

const TYPES = [
  { label: "Semua Tipe", value: "" },
  { label: "Manga 🇯🇵", value: "Manga" },
  { label: "Manhwa 🇰🇷", value: "Manhwa" },
  { label: "Manhua 🇨🇳", value: "Manhua" },
];

// Webtoons-style "browse by genre": a horizontal genre strip that filters
// the grid by hitting the backend live endpoint (/api/live/genre).
export function GenreBrowse({ mangas, title = "Populer" }: { mangas: Manga[]; title?: string }) {
  const [active, setActive] = useState("Semua");
  const [activeSlug, setActiveSlug] = useState("all");
  const [activeType, setActiveType] = useState("");
  const [results, setResults] = useState<Manga[] | null>(null);
  const [loading, setLoading] = useState(false);
  const req = useRef(0);

  const applyFilters = useCallback(async (genreLabel: string, genreSlug: string, typeVal: string) => {
    setActive(genreLabel);
    setActiveSlug(genreSlug);
    setActiveType(typeVal);

    if (genreLabel === "Semua" && !typeVal) {
      setResults(null);
      return;
    }

    const token = ++req.current;
    setLoading(true);
    setResults([]);
    try {
      const data = await fetchGenreManga(genreSlug === "all" ? "all" : genreSlug, typeVal || undefined);
      if (token === req.current) {
        if (data && data.length > 0) {
          setResults(data);
        } else {
          // Fallback to client-side filtering of initial mangas
          const filtered = mangas.filter((m) => {
            const matchesGenre = !genreSlug || genreSlug === "" || genreSlug === "all" || genreLabel === "Semua" ||
              m.genre?.toLowerCase() === genreLabel.toLowerCase() || 
              m.genre?.toLowerCase() === genreSlug.toLowerCase();
            const matchesType = !typeVal || 
              m.type?.toLowerCase() === typeVal.toLowerCase();
            return matchesGenre && matchesType;
          });
          setResults(filtered);
        }
        setLoading(false);
      }
    } catch (err) {
      console.error("Genre filter fetch error, falling back to client-side:", err);
      if (token === req.current) {
        const filtered = mangas.filter((m) => {
          const matchesGenre = !genreSlug || genreSlug === "" || genreSlug === "all" || genreLabel === "Semua" ||
            m.genre?.toLowerCase() === genreLabel.toLowerCase() || 
            m.genre?.toLowerCase() === genreSlug.toLowerCase();
          const matchesType = !typeVal || 
            m.type?.toLowerCase() === typeVal.toLowerCase();
          return matchesGenre && matchesType;
        });
        setResults(filtered);
        setLoading(false);
      }
    }
  }, [mangas]);

  const list = (active === "Semua" && !activeType) ? mangas : (results ?? []);

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2.5 sm:gap-3">
        <h2 className="text-xl sm:text-[26px] font-bold text-neutral-900 dark:text-white">
          {title}
        </h2>
        {/* Type Filter Pills */}
        <div className="no-scrollbar flex overflow-x-auto gap-1 bg-[#f3f3f3] dark:bg-[#1c1d20] p-1 rounded-full border border-[#e0e0e0] dark:border-neutral-800 w-full sm:w-fit max-w-full">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => applyFilters(active, activeSlug, t.value)}
              className={cn(
                "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0",
                activeType === t.value
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-[#666] dark:text-[#a0a0a0] hover:text-black dark:hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre nav strip */}
      <div className="no-scrollbar flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-4 mb-2 sm:mb-4">
        {GENRES.map((g) => (
          <button
            key={g.label}
            onClick={() => applyFilters(g.label, g.slug, activeType)}
            className={cn(
              "shrink-0 text-xs sm:text-[0.85rem] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-150 cursor-pointer",
              active === g.label
                ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 hover:border-black dark:hover:border-white"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border border-border">
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
      ) : list.length === 0 ? (
        <EmptyState title="Tidak Ada Manga" description={`Belum ada manga untuk kategori ${active}.`} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {list.map((m, i) => (
            <MangaCard
              key={`${m.slug ?? m.id}-${i}`}
              manga={m}
              style={{ animation: `fadeUp 0.4s ${i * 0.04}s ease both`, opacity: 0 }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
