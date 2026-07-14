"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import { getMockMangas } from "@/lib/mock-data";
import { getAbstractCover } from "./MangaCard";

function HeroCover({ manga }: { manga: Manga }) {
  if (manga.coverUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={manga.coverUrl} alt={manga.title} className="w-full h-full object-cover" />;
  }
  return <div className="w-full h-full">{getAbstractCover(manga.id, manga.title, manga.genre)}</div>;
}

interface HeroSectionProps {
  featured?: Manga[];
}

export function HeroSection({ featured }: HeroSectionProps) {
  const slides = featured && featured.length > 0 ? featured : getMockMangas(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[index];

  return (
    <section className="bg-canvas pt-6 pb-2">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-surface-tint p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left: text */}
            <div className="flex-1 text-left space-y-5 z-10">
              <div className="inline-flex items-center gap-1.5 bg-ink/10 text-ink text-[0.7rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles size={12} className="text-ink" />
                Kumimi Select
              </div>

              <h1 className="font-display text-[22px] font-bold leading-[1.15] text-ink">
                {active.title}
              </h1>

              <p className="text-ink-muted text-[13px]">
                {active.genre ?? "Manga"}
                {active.chapter > 0 ? ` - Chapter ${active.chapter}` : ""}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/comic/${active.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-[#1a1a1a] text-white text-[13px] font-bold h-9 px-[15px] rounded-[64px] transition-all duration-150"
                >
                  <BookOpen size={16} /> Baca Sekarang
                </Link>
                <Link
                  href="/editors-pick"
                  className="inline-flex items-center justify-center gap-2 bg-accent-secondary text-ink text-[13px] font-bold h-[38px] px-[15px] rounded-[64px] transition-all duration-150 hover:opacity-90"
                >
                  <Play size={14} className="text-ink" /> Pilihan Editor
                </Link>
              </div>
            </div>

            {/* Right: cover */}
            <div className="w-48 sm:w-60 md:w-72 aspect-3/4 rounded-2xl overflow-hidden border border-border shrink-0">
              <HeroCover manga={active} />
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Tampilkan slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-200 cursor-pointer",
                  i === index ? "w-6 bg-ink" : "w-2 bg-ink/30 hover:bg-ink/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
