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
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-[26px] font-bold text-black">
          {title}
        </h2>
        <Link
          href={href}
          className="text-[13px] text-black font-bold hover:underline underline-offset-2"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {mangas.map((manga) => (
          <div key={manga.id} className="shrink-0 w-[160px] sm:w-[180px]">
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
    </div>
  );
}
