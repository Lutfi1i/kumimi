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
      <div className="relative rounded-[20px] overflow-hidden border border-[#e0e0e0] bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
          {/* Text */}
          <div className="flex-1 text-left space-y-4 z-10">
            <div className="inline-flex items-center gap-1.5 bg-black/5 text-black text-[0.7rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles size={12} className="text-black" />
              Kumimi Select
            </div>

            <h1 className="text-[32px] font-bold leading-[1.2] text-black">
              {active.title}
            </h1>

            <p className="text-[#666] text-[14px]">
              {active.genre ?? "Manga"}
              {active.chapter > 0 ? ` - Chapter ${active.chapter}` : ""}
            </p>

            <Link
              href={`/comic/${active.id}`}
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-[#1a1a1a] text-white text-[14px] font-bold h-[40px] px-6 rounded-full transition-all duration-150"
            >
              <BookOpen size={16} /> Baca Sekarang
            </Link>
          </div>

          {/* Cover */}
          <div className="w-40 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden border border-[#e0e0e0] shrink-0 shadow-sm">
            <HeroCover manga={active} />
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center gap-2 px-8 pb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Tampilkan slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-200 cursor-pointer",
                i === index ? "w-6 bg-black" : "w-2 bg-black/30 hover:bg-black/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
