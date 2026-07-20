"use client";

import { useState } from "react";

interface MangaPanelProps {
  src: string;
  alt: string;
  pageNumber: number;
}

export function MangaPanel({ src, alt, pageNumber }: MangaPanelProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900/60 dark:bg-neutral-950/60 flex flex-col items-center">
      {/* Skeleton Shimmer Box */}
      {!loaded && (
        <div className="w-full aspect-[2/3] max-h-[1200px] flex flex-col items-center justify-center relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 animate-pulse border-b border-neutral-800 dark:border-neutral-900">
          {/* Subtle loading indicator */}
          <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
            <div className="w-8 h-8 rounded-full border-2 border-t-[#ff6740] border-neutral-700 animate-spin" />
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-500">
              Panel {pageNumber}
            </span>
          </div>
        </div>
      )}

      {/* Actual Manga Panel Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full rounded-none block transition-all duration-500 ease-in-out bg-neutral-950 reader-page-img ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.98] absolute top-0 left-0 w-0 h-0 overflow-hidden"
        }`}
      />
    </div>
  );
}
