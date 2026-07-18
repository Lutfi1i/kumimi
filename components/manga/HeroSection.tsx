"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import { getMockMangas } from "@/lib/mock-data";


function HeroCover({ manga }: { manga: Manga }) {
  if (manga.coverUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={manga.coverUrl} alt={manga.title} className="w-full h-full object-cover" />;
  }
  const gradients = [
    "from-indigo-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-amber-500 to-rose-600",
    "from-emerald-500 to-teal-700",
  ];
  const grad = gradients[manga.id % gradients.length];
  return (
    <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center", grad)}>
      <span className="text-5xl font-black text-white/20 font-display select-none">
        {manga.title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
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
    <section className="mb-8">
      <div className="relative rounded-[24px] overflow-hidden border border-black/10 dark:border-neutral-800 bg-white dark:bg-[#151618] h-[280px] select-none">
        
        {/* Blurred backdrop background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {active.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={active.coverUrl} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-[40px] brightness-[0.7] origin-center transition-all duration-700 ease-in-out" 
            />
          )}
          {/* Gradients to fade to white on the right and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-white dark:to-[#151618] to-[85%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#151618] via-white/45 dark:via-[#151618]/45 via-transparent to-transparent from-[0%] via-[12%] via-[40%]" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-between p-8 md:p-10 z-10">
          {/* Text content on the left */}
          <div 
            key={`text-${active.id}`}
            className="flex-1 text-left flex flex-col justify-center h-full max-w-[60%] z-10 space-y-3 pb-8 animate-fade-up"
          >
            <h1 className="text-2xl md:text-[34px] font-extrabold leading-[1.15] text-white tracking-tight drop-shadow-xs line-clamp-2">
              {active.title}
            </h1>

            <p className="text-white/80 text-[14px] font-medium tracking-wide">
              {active.genre ?? "Manga"}
              {active.chapter > 0 ? ` • Chapter ${active.chapter}` : ""}
            </p>

            <div className="pt-2">
              <Link
                href={`/comic/${active.slug ?? active.id}`}
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white text-[14px] font-bold h-[42px] px-6 rounded-full border border-white/25 shadow-xs backdrop-blur-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <BookOpen size={16} className="text-white" /> Baca Sekarang
              </Link>
            </div>
          </div>

          {/* Cover image on the right */}
          <div 
            key={`cover-${active.id}`}
            className="w-[140px] sm:w-[160px] aspect-[3/4] rounded-xl overflow-hidden  shrink-0 shadow-[0_12px_28px_rgba(0,0,0,0.22)] z-10 animate-fade-up hover:scale-[1.02] transition-transform duration-300"
          >
            <HeroCover manga={active} />
          </div>
        </div>

        {/* Carousel dots at the bottom-left */}
        <div className="absolute bottom-6 left-8 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Tampilkan slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === index ? "w-6 bg-black" : "w-2 bg-black/20 hover:bg-black/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
