"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Sparkles, BookOpen, Play } from "lucide-react";

interface HeroMangaCardProps {
  id: number;
  title: string;
  genre: string;
  rotationClass: string;
  delay: string;
}

function HeroMangaCard({ id, title, genre, rotationClass, delay }: HeroMangaCardProps) {
  const gradients = [
    "from-indigo-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-amber-500 to-rose-600",
    "from-emerald-500 to-teal-700",
    "from-rose-500 via-red-600 to-orange-500",
    "from-blue-600 to-violet-600",
  ];
  const grad = gradients[id % gradients.length];
  const initials = title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "w-28 sm:w-36 md:w-40 lg:w-48",
        "aspect-3/4 rounded-2xl overflow-hidden",
        "shadow-[0_20px_50px_rgba(90,60,10,0.15)] border border-white/20",
        "transform transition-all duration-300 hover:-translate-y-4 hover:rotate-0 hover:scale-105 hover:shadow-[0_30px_70px_rgba(90,60,10,0.25)]",
        rotationClass
      )}
      style={{
        animation: `fadeUp 0.6s ${delay} ease both`,
      }}
    >
      <div className={cn("w-full h-full bg-gradient-to-br flex flex-col justify-between p-4 relative overflow-hidden select-none", grad)}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 rotate-45 translate-y-8 -translate-x-8 pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <span className="text-[9px] tracking-widest text-white/70 font-black uppercase font-mono bg-black/15 px-2 py-0.5 rounded-full">
            TRENDING
          </span>
          <span className="text-[10px] text-white font-black font-display bg-white/20 px-1.5 py-0.5 rounded">
            Ch. 142
          </span>
        </div>

        <div className="my-auto flex items-center justify-center z-10">
          <span className="text-5xl font-black tracking-tighter text-white/20 font-display select-none">
            {initials}
          </span>
        </div>

        <div className="z-10 mt-auto flex flex-col gap-0.5 text-left">
          <span className="text-[9px] font-bold text-white/75 tracking-wider uppercase">
            {genre}
          </span>
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight uppercase tracking-wide">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [search, setSearch] = useState("");

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border",
        "bg-linear-to-br from-cream via-[#fbf9f4] to-[#f4ead5]",
        "px-6 md:px-12 py-12 md:py-20"
      )}
    >
      {/* Decorative dots pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #8b6914 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative gradient glowing orb */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full filter blur-3xl opacity-50 pointer-events-none -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
        
        {/* Left text column */}
        <div
          className="flex-1 z-10 text-left space-y-6 max-w-xl"
          style={{ animation: "fadeUp 0.6s ease both" }}
        >
          <div className="inline-flex items-center gap-1.5 bg-gold/10 text-gold-dark text-[0.7rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-gold/10">
            <Sparkles size={12} className="text-gold" />
            Kumimi Comics Premium Selection
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] font-black leading-[1.05] text-ink">
            Baca Komik Terpopuler <br className="hidden sm:inline" />
            <span className="text-gold relative inline-block">
              Tanpa Batas
              <span className="absolute left-0 bottom-1 w-full h-1 bg-gold/20 rounded"></span>
            </span>
          </h1>

          <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-md">
            Temukan ribuan judul manga, manhua, dan manhwa favoritmu dengan pembaruan harian serta visual yang memanjakan mata.
          </p>

          {/* Interactive Floating Search Box inside Hero */}
          <div className="relative max-w-md bg-white border border-border rounded-xl p-1.5 shadow-lg shadow-gold/5 flex items-center transition-all duration-200 focus-within:border-gold focus-within:shadow-gold/10">
            <Search size={18} className="text-ink-muted ml-3 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari genre atau komik favoritmu..."
              className="w-full pl-2 pr-3 py-2 text-sm text-ink bg-transparent placeholder:text-ink-muted outline-none border-none"
            />
            <button className="bg-gold hover:bg-gold-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1">
              Temukan
            </button>
          </div>

          {/* Action buttons & Stats */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#manga-grid"
              className={cn(
                "inline-flex items-center gap-2",
                "bg-gold hover:bg-gold-dark text-white",
                "text-sm font-semibold px-6 py-3 rounded-xl",
                "transition-all duration-150 hover:-translate-y-0.5 shadow-md shadow-gold/20 cursor-pointer"
              )}
            >
              <BookOpen size={16} /> Mulai Membaca
            </a>
            <a
              href="/editors-pick"
              className={cn(
                "inline-flex items-center gap-2",
                "border border-border text-ink-soft bg-white/70 backdrop-blur-sm",
                "text-sm font-medium px-5 py-3 rounded-xl",
                "transition-all duration-150 hover:border-gold hover:text-gold cursor-pointer"
              )}
            >
              <Play size={14} className="text-gold" /> Pilihan Editor
            </a>
          </div>

          {/* Clean minimal stats list */}
          <div className="flex items-center gap-8 pt-4 border-t border-border/60">
            {[
              { num: "12,000+", label: "Judul Komik" },
              { num: "450,000+", label: "Pembaca Aktif" },
              { num: "Setiap Jam", label: "Pembaruan" },
            ].map((s, i) => (
              <div key={i} className="text-left">
                <p className="font-display text-lg font-black text-gold leading-none mb-1">{s.num}</p>
                <p className="text-[11px] text-ink-muted font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right floating cards column */}
        <div className="relative flex items-center justify-center w-full lg:w-auto h-72 sm:h-96 md:h-[400px] shrink-0 mt-6 lg:mt-0">
          <div className="flex items-center justify-center -space-x-8 sm:-space-x-12">
            <HeroMangaCard
              id={3}
              title="Blue Period"
              genre="Drama / Art"
              rotationClass="-rotate-6 -translate-y-4 hover:-translate-y-8 z-10"
              delay="0.1s"
            />
            <HeroMangaCard
              id={2}
              title="Jujutsu Kaisen"
              genre="Action / Shonen"
              rotationClass="rotate-0 -translate-y-8 hover:-translate-y-12 z-20"
              delay="0.2s"
            />
            <HeroMangaCard
              id={6}
              title="Dandadan"
              genre="Sci-Fi / Comedy"
              rotationClass="rotate-6 -translate-y-2 hover:-translate-y-6 z-10"
              delay="0.3s"
            />
          </div>
        </div>

      </div>
    </section>
  );
}