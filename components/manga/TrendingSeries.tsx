"use client";

import { useState } from "react";
import Link from "next/link";
import { MangaCard } from "./MangaCard";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";

interface TrendingSeriesProps {
  trending: Manga[];
  popular: Manga[];
}

export function TrendingSeries({ trending, popular }: TrendingSeriesProps) {
  const [activeTab, setActiveTab] = useState<"trending" | "popular">("trending");
  const items = activeTab === "trending" ? trending : popular;

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[26px] font-bold text-neutral-900 dark:text-white">
          Trending &amp; Popular Series
        </h2>
        <Link
          href="/popular"
          className="font-bold text-[13px] text-neutral-800 dark:text-[#ff6740] hover:underline underline-offset-2 flex items-center gap-1"
        >
          View all
          <span className="text-[14px]">→</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 pb-4">
        <button
          onClick={() => setActiveTab("trending")}
          className={cn(
            "px-5 py-3 rounded-full text-[14px] font-bold transition-all duration-150 cursor-pointer",
            activeTab === "trending"
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 hover:bg-[#e8e8e8] dark:hover:bg-neutral-800"
          )}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={cn(
            "px-5 py-3 rounded-full text-[14px] font-bold transition-all duration-150 cursor-pointer",
            activeTab === "popular"
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 hover:bg-[#e8e8e8] dark:hover:bg-neutral-800"
          )}
        >
          Popular
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((manga, i) => (
          <TrendingCard key={manga.id} manga={manga} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}

function TrendingCard({ manga, rank }: { manga: Manga; rank: number }) {
  return (
    <Link
      href={`/comic/${manga.slug ?? manga.id}`}
      className="group flex flex-col gap-0 cursor-pointer"
    >
      {/* Cover */}
      <div className="relative w-full aspect-[232/301] rounded-lg overflow-hidden border border-border">
        {/* Rank number */}
        <div className="absolute top-0 left-0 z-10 flex items-start">
          <span className="font-display text-[52px] font-black text-white leading-none drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            {rank}
          </span>
          {/* Chapter badge */}
          {manga.chapter > 0 && (
            <span className="mt-1 ml-1 bg-white/90 dark:bg-neutral-900/90 text-[11px] font-bold text-black dark:text-white px-1.5 py-0.5 rounded-sm">
              Ch. {manga.chapter}
            </span>
          )}
        </div>

        {/* Cover image */}
        {manga.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={manga.coverUrl}
            alt={manga.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
            <span className="text-4xl font-black text-white/20 font-display">
              {manga.title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Small flag badge bottom-right */}
        {manga.type && (
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-white/90 dark:bg-neutral-900/90 px-1.5 py-0.5 rounded text-[9px] font-extrabold shadow-sm flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white select-none">
            {manga.type === "Manga" && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/jp.svg" alt="jp" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                <span>JP</span>
              </>
            )}
            {manga.type === "Manhwa" && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/kr.svg" alt="kr" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                <span>KR</span>
              </>
            )}
            {manga.type === "Manhua" && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/cn.svg" alt="cn" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                <span>CN</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2">
        <p className="text-[0.82rem] font-semibold text-neutral-900 dark:text-white leading-tight truncate">
          {manga.title}
        </p>
        {manga.genre && (
          <p className="text-[0.7rem] text-neutral-500 dark:text-neutral-450 mt-0.5">
            {manga.genre}
          </p>
        )}
      </div>
    </Link>
  );
}