"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { MangaCard } from "./MangaCard";
import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";
import { GENRES } from "@/lib/genres";
import { fetchGenreManga } from "@/lib/api";

interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href = "#" }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="text-[26px] font-bold text-neutral-900 dark:text-white">
        {title}
      </h2>
      <Link
        href={href}
        className="text-[13px] text-neutral-800 dark:text-[#ff6740] font-bold hover:underline underline-offset-2"
      >
        Lihat Semua →
      </Link>
    </div>
  );
}

interface MangaGridProps {
  title: string;
  mangas: Manga[];
  showGenrePills?: boolean;
}

export function MangaGrid({ title, mangas, showGenrePills = false }: MangaGridProps) {
  const [activeGenre, setActiveGenre] = useState("Semua");
  const [results, setResults] = useState<Manga[] | null>(null);
  const [loading, setLoading] = useState(false);
  const reqRef = useRef(0);

  // Pill kategori: "Semua" menampilkan daftar awal, genre lain mengambil
  // langsung dari backend live (/api/live/genre) 
  const handleGenre = useCallback(async (label: string, slug: string) => {
    setActiveGenre(label);
    if (label === "Semua") {
      setResults(null);
      return;
    }
    const token = ++reqRef.current;
    setLoading(true);
    setResults([]);
    const data = await fetchGenreManga(slug);
    if (token === reqRef.current) {
      setResults(data);
      setLoading(false);
    }
  }, []);

  const displayed = activeGenre === "Semua" ? mangas : (results ?? []);

  return (
    <div className="mb-8">
      {showGenrePills && (
        <div className="flex gap-2 flex-wrap mb-5">
          {GENRES.map((g) => (
            <button
              key={g.label}
              onClick={() => handleGenre(g.label, g.slug)}
              className={cn(
                "text-[0.85rem] font-bold px-4 py-2 rounded-full",
                "border transition-all duration-150 cursor-pointer",
                activeGenre === g.label
                  ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                  : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 hover:border-black dark:hover:border-white"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      <SectionHeader title={title} />

      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
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
      ) : displayed.length === 0 ? (
        <EmptyState
          title="Tidak Ada Manga"
          description={`Belum ada manga untuk kategori ${activeGenre}.`}
        />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
          {displayed.map((manga, i) => (
            <MangaCard
              key={`${manga.slug ?? manga.id}-${i}`}
              manga={manga}
              style={{ animation: `fadeUp 0.4s ${i * 0.04}s ease both`, opacity: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Featured Banner ── */
export function FeaturedBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#151618] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left shadow-xs">
      <div className="max-w-md">
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-widest text-[#ff6740] uppercase mb-2">
          ✦ BANNER NANTINYA
        </span>
        <h3 className="text-[22px] font-bold text-neutral-900 dark:text-white leading-snug">
          Notifikasi/Banner Pembaruan dari Sistem tapi nanti, adalah pokoknya!
        </h3>
        <p className="text-[14px] text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          Nikmati akses perdana 24 jam lebih awal untuk komik berlabel{" "}
        </p>
      </div>
      <Link
        href="#"
        className="inline-flex items-center justify-center bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-black text-[14px] font-bold h-10 px-6 rounded-full shrink-0 cursor-pointer transition-all duration-150 shadow-xs"
      >
        Coming very soon
      </Link>
    </div>
  );
}
