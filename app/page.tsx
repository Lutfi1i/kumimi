"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Bookmark,
  ChevronRight,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

// Deterministic seed simulation based on user prompt length (104 characters)
// Hero Layout: Editorial Split (Text Left, Book Image Right with massive negative space)
// Typography: Outfit (Geist-Sans fallback)
// Component 1: Inline Typography Images
// Component 2: Horizontal Accordions
// Component 3: Infinite Marquee
// Animation 1: Hover Physics (Scale & Lift)
// Animation 2: Image Scale-on-Scroll

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<number>(0);
  const [searchFocused, setSearchFocused] = useState(false);

  // Featured books for Bento grid
  const bentoBooks = [
    {
      id: 1,
      title: "Jujutsu Kaisen",
      author: "Gege Akutami",
      genre: "Action / Supernatural",
      span: "col-span-1 md:col-span-2 row-span-2",
      bgGrad: "from-purple-900 to-indigo-950",
      initials: "JK",
      chapter: 268
    },
    {
      id: 2,
      title: "Dandadan",
      author: "Yukinobu Tatsu",
      genre: "Sci-Fi / Occult",
      span: "col-span-1 row-span-1",
      bgGrad: "from-rose-500 to-amber-600",
      initials: "DD",
      chapter: 162
    },
    {
      id: 3,
      title: "Blue Period",
      author: "Tsubasa Yamaguchi",
      genre: "Drama / Fine Art",
      span: "col-span-1 row-span-1",
      bgGrad: "from-cyan-500 to-blue-600",
      initials: "BP",
      chapter: 64
    },
    {
      id: 4,
      title: "War of the Zulefs",
      author: "Takashi Kenji",
      genre: "Fantasy / Historical",
      span: "col-span-1 md:col-span-2 row-span-1",
      bgGrad: "from-emerald-600 to-teal-900",
      initials: "WZ",
      chapter: 98
    }
  ];

  // Panels for Horizontal Accordion
  const accordionPanels = [
    {
      title: "Seni Pertarungan",
      description: "Visualisasi dinamik, aksi cepat, dan pertempuran epik melawan takdir.",
      genre: "Shonen / Action",
      tagline: "Ledakan emosi dalam setiap goresan pena.",
      bgImage: "https://picsum.photos/seed/action/800/600",
      btnText: "Baca Koleksi Aksi"
    },
    {
      title: "Lembaran Kenangan",
      description: "Kisah drama kehidupan, romansa manis, dan pencarian jati diri yang mendalam.",
      genre: "Slice of Life / Drama",
      tagline: "Menemukan keindahan dalam keseharian.",
      bgImage: "https://picsum.photos/seed/drama/800/600",
      btnText: "Baca Koleksi Drama"
    },
    {
      title: "Dimensi Astral",
      description: "Eksplorasi luar angkasa, misteri supranatural, dan konspirasi kosmik.",
      genre: "Sci-Fi / Supernatural",
      tagline: "Melompati batas realitas konvensional.",
      bgImage: "https://picsum.photos/seed/scifi/800/600",
      btnText: "Baca Koleksi Sci-Fi"
    }
  ];

  return (
    <main className="overflow-x-hidden w-full max-w-full min-h-screen bg-cream/20 text-ink font-sans selection:bg-gold/20">
      
      {/* ── NAVIGATION ── */}
      <Navbar />

      {/* ── ATTENTION (HERO SECTION - EDITORIAL SPLIT) ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-cream via-[#fcfaf4] to-[#f3ead3] py-24 md:py-36 border-b border-border">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle, #8b6914 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Left Text */}
          <div className="flex-1 text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/15 px-3 py-1 rounded-full text-gold-dark text-[10px] font-extrabold tracking-widest uppercase">
              Kumimi Anthology Selection
            </div>

            {/* Inline Typography Image Concept */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-black leading-[1.05] text-ink max-w-3xl">
              THE ART OF STORIES
              <span className="inline-block w-16 sm:w-24 h-7 sm:h-11 rounded-full align-middle bg-cover bg-center mx-2 border border-white/40 shadow-sm transition-transform duration-500 hover:scale-105" 
                    style={{ backgroundImage: "url(https://picsum.photos/seed/ink/400/250)" }} />
              IN BLACK & WHITE.
            </h1>

            <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-md">
              Eksplorasi antologi manga Jepang dengan visualisasi minimalis dan presentasi premium. Dirancang khusus untuk penikmat karya sastra visual bernilai tinggi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#bento-catalog" 
                 className="bg-ink hover:bg-gold-dark text-white text-xs font-black tracking-wider uppercase px-7 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-ink/10 cursor-pointer">
                Explore Catalog
              </a>
              <a href="/client/login"
                 className="border border-border bg-white/70 backdrop-blur-xs text-ink-soft hover:text-gold hover:border-gold text-xs font-bold tracking-wider uppercase px-6 py-4 rounded-lg transition-all duration-300 cursor-pointer">
                Sign In Portal
              </a>
            </div>
          </div>

          {/* Right Image (Massive book-cover showcase with geometric design) */}
          <div className="relative flex items-center justify-center shrink-0 w-full lg:w-auto">
            <div className="relative w-64 sm:w-80 aspect-3/4 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(90,60,10,0.22)] border border-white/20 transform -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500">
              <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 flex flex-col justify-between p-6 relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/15 rotate-45 translate-y-12 -translate-x-12 pointer-events-none" />
                
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] tracking-widest text-white/50 font-bold uppercase font-mono">
                    MANGA OF THE MONTH
                  </span>
                  <span className="text-[10px] text-white font-black bg-white/10 px-2 py-0.5 rounded">
                    VOL. 01
                  </span>
                </div>

                <div className="my-auto text-center z-10">
                  <span className="text-7xl font-black tracking-tighter text-white/10 font-display select-none">
                    KM
                  </span>
                </div>

                <div className="z-10 mt-auto text-left space-y-1">
                  <span className="text-[10px] font-bold text-gold-muted tracking-wider uppercase">
                    EDITORIAL FEATURE
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight uppercase tracking-wide">
                    KUMIMI ANTHOLOGY
                  </h3>
                  <p className="text-[10px] text-white/60">
                    A curated collection of black and white masterpieces.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Absolute background accent card */}
            <div className="absolute -left-8 -bottom-8 w-48 h-64 bg-gradient-to-br from-amber-600 to-rose-600 rounded-2xl -z-10 transform rotate-12 opacity-60 filter blur-xs shadow-lg pointer-events-none hidden sm:block"></div>
          </div>
        </div>
      </section>

      {/* ── COMPONENT 3: INFINITE MARQUEE ── */}
      <section className="bg-white border-y border-border py-6 overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div className="flex animate-marquee gap-8 shrink-0 min-w-full">
            {[1, 2].map((groupIndex) => (
              <div key={groupIndex} className="flex gap-8 justify-around items-center min-w-full">
                {[
                  "JUJUTSU KAISEN", "DANDADAN", "BLUE PERIOD", 
                  "WAR OF THE ZULEFS", "GHOST REAPER GIRL", "MONSTER HUNTER X",
                  "SILENT CHORD", "SAMUKAZE DAYS", "CRIMSON TIDE"
                ].map((title, i) => (
                  <span key={i} className="font-display text-lg sm:text-2xl font-black tracking-widest text-ink/20 hover:text-gold transition-colors duration-300 uppercase">
                    {title} <span className="text-gold mx-4">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEREST (GAPLESS BENTO GRID) ── */}
      <section id="bento-catalog" className="max-w-6xl mx-auto px-6 py-32 md:py-48 text-left">
        <div className="mb-12">
          <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase">
            ✦ SELECTED ARCHIVE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-ink leading-tight mt-1">
            Galeri Edisi Terpilih
          </h2>
          <p className="text-xs text-ink-muted mt-1">Sains, aksi, dan drama kehidupan tersaji dalam grid densitas tinggi.</p>
        </div>

        {/* Bento Grid layout with dense packing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-dense gap-4">
          {bentoBooks.map((book) => (
            <Link
              key={book.id}
              href={`/comic/${book.id}`}
              className={cn(
                "rounded-2xl overflow-hidden border border-border bg-white shadow-sm flex flex-col justify-between p-6 relative group cursor-pointer text-left",
                book.span
              )}
            >
              {/* Card visual cover preview */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="flex justify-between items-start z-10 mb-8">
                <span className="text-[9px] bg-cream border border-gold/15 text-gold-dark font-extrabold tracking-wider uppercase px-2 py-0.5 rounded">
                  {book.genre}
                </span>
                <span className="font-mono text-xs text-ink-muted">Ch. {book.chapter}</span>
              </div>

              {/* Book simulation inside card */}
              <div className="my-auto flex items-center gap-4 z-10">
                <div className={cn("w-16 h-20 rounded-lg bg-gradient-to-br flex items-center justify-center font-black text-white text-lg shrink-0 shadow-md transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300", book.bgGrad)}>
                  {book.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-ink truncate group-hover:text-gold transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-0.5">{book.author}</p>
                </div>
              </div>

              <div className="z-10 mt-8 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[10px] text-ink-muted font-semibold uppercase">Details</span>
                <button className="text-ink group-hover:text-gold transition-colors cursor-pointer">
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── DESIRE (HORIZONTAL ACCORDIONS SHOWCASE) ── */}
      <section className="bg-white border-y border-border py-32 md:py-48 text-left">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase">
              ✦ CORE CATEGORY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-ink leading-tight mt-1">
              Eksplorasi Tiga Semesta
            </h2>
            <p className="text-xs text-ink-muted mt-1">Arahkan kursor atau klik pada panel untuk melihat detail kategori.</p>
          </div>

          {/* Horizontal Accordion */}
          <div className="flex flex-col md:flex-row gap-4 h-[450px]">
            {accordionPanels.map((panel, idx) => (
              <div
                key={idx}
                onClick={() => setActivePanel(idx)}
                onMouseEnter={() => setActivePanel(idx)}
                className={cn(
                  "relative rounded-2xl overflow-hidden border border-border transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 md:p-8",
                  activePanel === idx 
                    ? "flex-[3.5] bg-ink text-white border-ink shadow-lg" 
                    : "flex-1 bg-cream/30 hover:bg-cream/50 text-ink"
                )}
              >
                {/* Background image fade in active panel */}
                {activePanel === idx && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale mix-blend-luminosity pointer-events-none transition-opacity duration-500" 
                    style={{ backgroundImage: `url(${panel.bgImage})` }}
                  />
                )}

                <div className="z-10">
                  <span className={cn(
                    "text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block",
                    activePanel === idx ? "bg-white/10 text-gold-muted" : "bg-gold/10 text-gold-dark"
                  )}>
                    {panel.genre}
                  </span>
                </div>

                <div className="z-10 my-auto text-left">
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wide leading-none">
                    {panel.title}
                  </h3>
                  {activePanel === idx && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      <p className="text-xs text-white/80 leading-relaxed max-w-sm">
                        {panel.description}
                      </p>
                      <p className="text-[10px] text-gold-muted font-bold tracking-wide italic">
                        "{panel.tagline}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="z-10 pt-4 border-t border-border/20 flex items-center justify-between w-full">
                  {activePanel === idx ? (
                    <button className="bg-gold hover:bg-gold-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                      {panel.btnText} <ChevronRight size={14} />
                    </button>
                  ) : (
                    <span className="text-xs font-extrabold font-mono tracking-widest text-ink-muted">EXPAND</span>
                  )}
                  <Bookmark size={18} className={activePanel === idx ? "text-gold" : "text-ink-muted"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTION (MASSIVE HIGH-CONTRAST CTA & FOOTER) ── */}
      <section className="bg-linear-to-br from-cream via-[#fbf7f0] to-[#f4ead5] py-32 md:py-48 text-center border-b border-border relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle, #8b6914 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase">
            ✦ JOIN THE COLLECTION
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-ink leading-tight uppercase max-w-2xl mx-auto">
            Mulai Pengalaman Membaca Premium
          </h2>
          <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
            Dapatkan pembaruan langsung, diskon khusus edisi terbatas, serta perpustakaan digital personal dengan pendaftaran bebas biaya.
          </p>
          
          <div className="pt-4">
            <Link 
              href="/client/register"
              className="inline-flex items-center justify-center bg-ink hover:bg-gold-dark text-white text-xs font-black tracking-widest uppercase px-8 py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-xl shadow-ink/15 cursor-pointer"
            >
              Sign Up For Free <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-ink-muted text-xs">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-2xl font-black text-gold tracking-tight">
            Kumimi
          </div>
          <div className="flex gap-8 text-ink-muted font-bold uppercase tracking-wider text-[10px]">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Contact Editorial</a>
          </div>
          <div className="font-medium">
            &copy; 2026 Kumimi. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}