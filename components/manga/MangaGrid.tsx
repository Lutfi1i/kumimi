"use client";

import { useState } from "react";
import Link from "next/link";
import { MangaCard } from "./MangaCard";
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
      <h2 className="font-display text-[22px] font-bold text-ink flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-ink inline-block" />
        {title}
      </h2>
      <Link
        href={href}
        className="font-label text-[11px] text-ink font-bold hover:underline underline-offset-2"
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
                  ? "bg-ink border-ink text-white"
                  : "bg-card border-border text-ink-soft hover:border-ink hover:text-ink"
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
    <div className="relative w-full rounded-2xl overflow-hidden mb-10 border border-border bg-surface-tint p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
      <div className="max-w-md">
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-widest text-ink uppercase mb-1">
          ✦ PROMOSI EKSLUSIF
        </span>
        <h3 className="font-display text-[18px] md:text-[22px] font-bold text-ink leading-snug">
          Baca Chapter Baru Eksklusif Setiap Hari Jumat!
        </h3>
        <p className="text-[13px] text-ink-muted mt-1 leading-relaxed">
          Nikmati akses perdana 24 jam lebih awal untuk komik berlabel{" "}
          <span className="text-ink font-bold">KUMIMI SELECT</span> sebelum dirilis ke publik.
        </p>
      </div>
      <Link
        href="/client/register"
        className="inline-flex items-center justify-center bg-ink hover:bg-[#1a1a1a] text-white text-[13px] font-bold h-9 px-[15px] rounded-[64px] shrink-0 cursor-pointer transition-all duration-150"
      >
        Daftar Akun Premium
      </Link>
    </div>
  );
}


