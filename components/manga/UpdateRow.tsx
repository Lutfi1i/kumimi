"use client";

import Link from "next/link";
import { MangaCard } from "./MangaCard";
import type { Manga } from "@/types/manga";

interface UpdateRowProps {
  title?: string;
  mangas: Manga[];
  href?: string;
}

export function UpdateRow({ title = "Pembaruan Terbaru", mangas, href = "#" }: UpdateRowProps) {
  return (
    <div className="mb-10">
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

      <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {mangas.map((manga) => (
          <div key={manga.id} className="shrink-0 w-[140px] sm:w-[160px]">
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
    </div>
  );
}
