import { MangaBadge } from "@/components/ui/MangaBadge";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { CSSProperties } from "react";

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
  return (
    <Link
      href={`/comic/${manga.slug ?? manga.id}`}
      className="group flex flex-col gap-2 cursor-pointer text-left"
      style={style}
    >
      {/* Cover */}
      <div
        className={cn(
          "relative w-full aspect-3/4 rounded-lg overflow-hidden border border-[#e0e0e0]",
          "transition-all duration-300",
          "group-hover:-translate-y-1.5 group-hover:scale-[1.02]"
        )}
      >
        <MangaBadge type={manga.badge} />

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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="text-[13px] font-bold text-black line-clamp-2">
              {manga.title}
            </h3>

            {/* Author */}
            {manga.author && (
              <p className="text-[11px] text-[#666] font-semibold">
                {manga.author}
              </p>
            )}

            {/* Chapter info */}
            <div className="space-y-1">
              {manga.chapter > 0 && (
                <>
                  <div className="inline-block bg-black/10 px-2 py-1 rounded-sm">
                    <span className="text-[10px] font-bold text-black">
                      #{manga.chapter}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#666]">
                    Chapter {manga.chapter}: {manga.title}
                  </p>
                </>
              )}
            </div>

            {/* View count or rating */}
            {manga.views && (
              <p className="text-[10px] text-[#999] font-semibold">
                {manga.views}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-[0.78rem] font-semibold text-black leading-tight truncate">
          {manga.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[0.7rem] text-[#666]">
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

