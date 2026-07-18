"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { MangaBadge } from "@/components/ui/MangaBadge";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { CSSProperties } from "react";
import { isBookmarked, toggleBookmark, onBookmarksChanged } from "@/lib/bookmarks";

interface MangaCardProps {
  manga: Manga;
  style?: CSSProperties;
}

export function getAbstractCover(mangaId: number, title: string, genre?: string) {
  const gradients = [
    "from-indigo-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-amber-500 to-rose-600",
    "from-emerald-500 to-teal-700",
    "from-rose-500 via-red-600 to-orange-500",
    "from-blue-600 to-violet-600",
    "from-fuchsia-600 to-purple-800",
    "from-cyan-500 to-blue-600",
  ];
  const grad = gradients[mangaId % gradients.length];
  const initials = title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={cn("w-full h-full bg-gradient-to-br flex flex-col justify-between p-3 relative overflow-hidden select-none", grad)}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-6 -translate-y-6 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rotate-45 translate-y-6 -translate-x-6 pointer-events-none" />

      <div className="flex items-center justify-between z-10">
        <span className="text-[8px] tracking-widest text-white/50 font-bold uppercase font-mono">
          KUMIMI SELECT
        </span>
        <span className="text-[9px] text-white/90 font-black font-display bg-white/20 px-1 py-0.5 rounded-sm">
          #{mangaId}
        </span>
      </div>

      <div className="my-auto flex items-center justify-center z-10">
        <span className="text-4xl font-extrabold tracking-tighter text-white/20 font-display select-none">
          {initials}
        </span>
      </div>

      <div className="z-10 mt-auto flex flex-col gap-0.5 text-left">
        <span className="text-[8px] font-bold text-white/60 tracking-wider uppercase">
          {genre || "Manga"}
        </span>
        <h4 className="text-[10px] font-black text-white leading-tight line-clamp-2 uppercase tracking-wide">
          {title}
        </h4>
      </div>
    </div>
  );
}

export function MangaCard({ manga, style }: MangaCardProps) {
  const comicId = String(manga.slug ?? manga.id);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(comicId));
    const unsubscribe = onBookmarksChanged(() => setBookmarked(isBookmarked(comicId)));
    return unsubscribe;
  }, [comicId]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleBookmark({
      comicId,
      slug: comicId,
      title: manga.title,
      coverUrl: manga.coverUrl,
      type: manga.type,
      genre: manga.genre,
    });
    setBookmarked(next);
  };

  return (
    <Link
      href={`/comic/${manga.slug ?? manga.id}`}
      className="group flex flex-col gap-2 cursor-pointer text-left"
      style={style}
    >
      {/* Cover */}
      <div
        className={cn(
          "relative w-full aspect-3/4 rounded-xl overflow-hidden border border-[#e0e0e0] dark:border-neutral-800",
          "transition-all duration-300",
          "group-hover:-translate-y-1.5 group-hover:scale-[1.02]"
        )}
      >
        <MangaBadge type={manga.badge} />

        {/* Bookmark button — top right */}
        <button
          onClick={handleBookmarkClick}
          aria-label={bookmarked ? "Hapus dari bookmark" : "Tambah ke bookmark"}
          className={cn(
            "absolute top-2 right-2 z-20 flex items-center justify-center w-7 h-7 rounded-full backdrop-blur-sm border transition-all duration-200",
            bookmarked
              ? "bg-[#ff6740] border-[#ff6740] text-white opacity-100"
              : "bg-black/40 border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60"
          )}
        >
          <Bookmark size={13} className={cn(bookmarked && "fill-white")} />
        </button>

        {/* Cover image — swap abstract cover with <Image> when API is ready */}
        {manga.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={manga.coverUrl}
            alt={manga.title}
            className="w-full h-full object-cover"
          />
        ) : (
          getAbstractCover(manga.id, manga.title, manga.genre)
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Small flag badge bottom-right */}
        {manga.type && (
          <div className="absolute bottom-2 right-2 z-10 bg-white/90 dark:bg-neutral-900/90 px-1.5 py-0.5 rounded text-[9px] font-extrabold shadow-sm flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white select-none">
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/85 dark:bg-neutral-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="text-[13px] font-bold text-black dark:text-white line-clamp-2">
              {manga.title}
            </h3>

            {/* Author */}
            {manga.author && (
              <p className="text-[11px] text-[#666] dark:text-neutral-300 font-semibold">
                {manga.author}
              </p>
            )}

            {/* Chapter info */}
            <div className="space-y-1">
              {manga.chapter > 0 && (
                <>
                  <div className="inline-block bg-black/10 dark:bg-white/10 px-2 py-1 rounded-sm">
                    <span className="text-[10px] font-bold text-black dark:text-white">
                      #{manga.chapter}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#666] dark:text-neutral-400">
                    Chapter {manga.chapter}: {manga.title}
                  </p>
                </>
              )}
            </div>

            {/* View count or rating */}
            {manga.views && (
              <p className="text-[10px] text-[#999] dark:text-neutral-500 font-semibold">
                {manga.views}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-[0.78rem] font-semibold text-neutral-900 dark:text-neutral-200 leading-tight truncate">
          {manga.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[0.7rem] text-[#666] dark:text-neutral-400">
          {manga.type && (
            <span className="text-[9px] font-bold bg-[#ffcb05]/15 text-[#bfa004] px-1.5 py-0.2 rounded-sm select-none shrink-0 font-mono">
              {manga.type.toUpperCase()}
            </span>
          )}
          {manga.chapter > 0 && <span className="font-semibold shrink-0">Ch. {manga.chapter}</span>}
          {manga.author && (
            <span className="truncate max-w-[80px]" title={manga.author}>
              • {manga.author.split(",")[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}