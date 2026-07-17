"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Grid, Search } from "lucide-react";
import type { ChapterInfo } from "@/types/manga";

interface DetailChaptersProps {
  chapters: ChapterInfo[];
  comicId: string;
}

export function DetailChapters({ chapters, comicId }: DetailChaptersProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChapters = chapters.filter((ch) =>
    `Ch. ${ch.chapterNumber} ${ch.title || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedChapters = [...filteredChapters].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.chapterNumber - b.chapterNumber;
    } else {
      return b.chapterNumber - a.chapterNumber;
    }
  });

  return (
    <div className="flex-1 space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-2.5 rounded-xl backdrop-blur-md">
        {/* Sort & Search */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-lg border border-neutral-250 dark:border-neutral-750 transition-colors shadow-xs cursor-pointer select-none"
          >
            <ArrowUpDown size={14} className="text-[#ff6740]" />
            <span>{sortOrder === "asc" ? "Urutan Naik" : "Urutan Turun"}</span>
          </button>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-48">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-450" />
            <input
              type="text"
              placeholder="Cari chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-450 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-neutral-250 dark:border-neutral-750 focus:outline-none focus:border-[#ff6740] focus:ring-1 focus:ring-[#ff6740]"
            />
          </div>
        </div>

        {/* Info & View */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-extrabold text-neutral-500 dark:text-neutral-400">
          <span>{sortedChapters.length} Chapter</span>
          <div className="flex items-center gap-1 bg-white dark:bg-neutral-850 p-1 border border-neutral-250 dark:border-neutral-750 rounded-lg shadow-xs">
            <button className="p-1 text-[#ff6740] rounded-md" title="Tampilan Indeks">
              <Grid size={14} />
            </button>
            <span className="text-[10px] px-1 select-none">Index</span>
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sortedChapters.map((ch, idx) => (
          <Link
            key={`${ch.slug}-${idx}`}
            href={`/comic/${comicId}/${ch.slug}`}
            className="group flex flex-col p-3 bg-white dark:bg-[#1a1b1d] border border-neutral-200 dark:border-[#2a2b2d] hover:border-[#ff6740] dark:hover:border-[#ff6740] rounded-xl transition-all duration-200 hover:scale-[1.01] hover:shadow-md text-left"
          >
            <span className="font-extrabold text-sm text-neutral-900 dark:text-white leading-tight group-hover:text-[#ff6740] transition-colors">
              Ch. {ch.chapterNumber}
            </span>
            <span className="text-[10px] text-neutral-450 dark:text-neutral-500 mt-1 block truncate">
              {ch.title || `Chapter ${ch.chapterNumber}`}
            </span>
          </Link>
        ))}

        {sortedChapters.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm font-semibold text-neutral-500 dark:text-neutral-400">
            Tidak ada chapter yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  );
}
