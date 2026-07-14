"use client";

import { useState } from "react";
import Link from "next/link";
import { MangaCard } from "./MangaCard";
import { ShimmerBox } from "@/components/ui/ShimmerBox";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";
import { GENRES } from "@/lib/mock-data";

interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href = "#" }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold inline-block" />
        {title}
      </h2>
      <Link
        href={href}
        className="text-xs text-gold font-semibold hover:underline underline-offset-2"
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

  return (
    <div className="mb-10">
      {/* Genre pills — only for the first grid */}
      {showGenrePills && (
        <div className="flex gap-2 flex-wrap mb-5">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "text-[0.78rem] font-medium px-3.5 py-1.5 rounded-full",
                "border transition-all duration-150",
                activeGenre === genre
                  ? "bg-gold border-gold text-white"
                  : "bg-card border-border text-ink-soft hover:border-gold hover:text-gold"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      <SectionHeader title={title} />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
        {mangas.map((manga, i) => (
          <MangaCard
            key={manga.id}
            manga={manga}
            style={{ animation: `fadeUp 0.4s ${i * 0.04}s ease both`, opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}


/* ── Featured Banner ── */
export function FeaturedBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-10 border border-gold/15 bg-gradient-to-r from-gold-muted/10 via-cream/50 to-warm-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm shadow-gold/5 text-left">
      <div className="max-w-md">
        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest text-gold-dark uppercase mb-1">
          ✦ PROMOSI EKSLUSIF
        </span>
        <h3 className="font-display text-lg md:text-xl font-black text-ink leading-snug">
          Baca Chapter Baru Eksklusif Setiap Hari Jumat!
        </h3>
        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
          Nikmati akses perdana 24 jam lebih awal untuk komik berlabel <span className="text-gold font-bold">KUMIMI SELECT</span> sebelum dirilis ke publik.
        </p>
      </div>
      <Link 
        href="/client/register" 
        className="bg-gold hover:bg-gold-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-gold/15 hover:-translate-y-px shrink-0 cursor-pointer"
      >
        Daftar Akun Premium
      </Link>
    </div>
  );
}