"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { getMangaById } from "@/lib/mock-data";
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  Share2, 
  Star, 
  Check, 
  Clock, 
  Grid, 
  List,
  Eye,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ComicDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id) || 1;
  const manga = getMangaById(id);

  const [readingChapter, setReadingChapter] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!manga) {
    return (
      <div className="min-h-screen bg-cream/20 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto py-24 text-center space-y-4">
          <h2 className="text-2xl font-black text-ink">Manga Tidak Ditemukan</h2>
          <p className="text-sm text-ink-muted">Maaf, manga dengan ID #{id} tidak terdaftar di sistem kami.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:underline">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>
        <footer className="bg-white py-6 border-t border-border text-center text-xs text-ink-muted">
          &copy; 2026 Kumimi.
        </footer>
      </div>
    );
  }

  // Generate mock chapters list
  const chaptersCount = manga.chapter;
  const chapters = Array.from({ length: chaptersCount }, (_, i) => ({
    number: chaptersCount - i,
    date: `${Math.floor(i / 2) + 1} hari lalu`,
    views: Math.floor(Math.sin(i) * 1500) + 3000
  }));

  // Abstract cover gradients matching MangaCard
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
  const grad = gradients[manga.id % gradients.length];
  const initials = manga.title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-cream/20 text-ink font-sans selection:bg-gold/20">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-ink-muted hover:text-gold mb-8 transition-colors">
          <ArrowLeft size={14} /> Kembali ke Beranda
        </Link>

        {/* Dynamic Reader view */}
        {readingChapter !== null ? (
          <div className="bg-ink text-white rounded-2xl p-6 md:p-10 mb-12 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="text-left">
                <span className="text-[10px] text-gold-muted font-bold tracking-widest uppercase">Membaca Gratis</span>
                <h3 className="font-bold text-lg">{manga.title}</h3>
                <p className="text-xs text-white/50">Chapter {readingChapter}</p>
              </div>
              <button 
                onClick={() => setReadingChapter(null)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Tutup Viewer
              </button>
            </div>

            {/* Simulated Manga Panels */}
            <div className="max-w-xl mx-auto space-y-6">
              {[1, 2, 3].map((panelNum) => (
                <div 
                  key={panelNum}
                  className="aspect-video bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 border border-white/5 rounded-xl flex flex-col justify-between p-6 relative overflow-hidden shadow-inner select-none"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
                  <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-black/40 rotate-12 pointer-events-none" />
                  
                  <span className="text-[9px] font-mono text-white/30 tracking-widest">
                    PANEL {panelNum} / CHAPTER {readingChapter}
                  </span>
                  
                  <div className="my-auto text-center space-y-2">
                    <p className="text-sm font-semibold tracking-wide italic text-white/80">
                      [Goresan ilustrasi komik gratis Kumimi untuk {manga.title}]
                    </p>
                    <p className="text-xs text-white/40 max-w-xs mx-auto">
                      Halaman simulasi manga interaktif. Kumimi menghadirkan ribuan chapter gratis tanpa login.
                    </p>
                  </div>

                  <span className="text-[9px] text-right font-mono text-white/30">
                    KUMIMI FREE COMICS
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation inside reader */}
            <div className="flex items-center justify-between max-w-xl mx-auto mt-10 pt-6 border-t border-white/10">
              <button 
                disabled={readingChapter === 1}
                onClick={() => setReadingChapter(prev => prev !== null && prev > 1 ? prev - 1 : prev)}
                className="bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Chapter Sebelumnya
              </button>
              <button 
                disabled={readingChapter === manga.chapter}
                onClick={() => setReadingChapter(prev => prev !== null && prev < manga.chapter ? prev + 1 : prev)}
                className="bg-gold hover:bg-gold-dark text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Chapter Selanjutnya
              </button>
            </div>
          </div>
        ) : null}

        {/* Comic Hero Details */}
        <div className="bg-white border border-border rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 shadow-sm text-left relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full filter blur-3xl opacity-60 pointer-events-none -translate-y-12"></div>
          
          {/* Cover display */}
          <div className="w-full md:w-56 shrink-0 aspect-3/4 rounded-2xl overflow-hidden shadow-lg border border-border relative">
            <div className={cn("w-full h-full bg-gradient-to-br flex flex-col justify-between p-5 relative overflow-hidden select-none", grad)}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 rotate-45 translate-y-8 -translate-x-8 pointer-events-none" />

              <div className="flex justify-between items-start z-10">
                <span className="text-[9px] tracking-widest text-white/50 font-bold uppercase font-mono">
                  FREE READ
                </span>
                <span className="text-[9px] text-white font-black bg-white/20 px-1.5 py-0.5 rounded">
                  VOL. {Math.ceil(manga.chapter / 10)}
                </span>
              </div>

              <div className="my-auto flex items-center justify-center z-10">
                <span className="text-6xl font-black tracking-tighter text-white/20 font-display select-none">
                  {initials}
                </span>
              </div>

              <div className="z-10 mt-auto flex flex-col gap-0.5 text-left">
                <span className="text-[9px] font-bold text-white/70 tracking-wider uppercase">
                  {manga.genre || "Manga"}
                </span>
                <h4 className="text-sm font-black text-white leading-tight uppercase tracking-wide">
                  {manga.title}
                </h4>
              </div>
            </div>
          </div>

          {/* Details metadata */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
                <Check size={12} /> Akses Gratis • Tanpa Login
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-ink">
                {manga.title}
              </h2>
              
              <p className="text-sm text-ink-muted font-medium">
                Karya: <span className="text-ink font-bold">Kumimi Artist Syndicate</span> | Genre: <span className="text-gold font-bold">{manga.genre || "Manga"}</span>
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/60">
              <div className="text-left">
                <p className="text-xs text-ink-muted font-semibold uppercase">Rating</p>
                <p className="font-display text-lg font-black text-gold flex items-center gap-1 mt-0.5">
                  <Star size={16} fill="#b38a3e" stroke="none" /> 4.9
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs text-ink-muted font-semibold uppercase">Total Chapter</p>
                <p className="font-display text-lg font-black text-ink mt-0.5">{manga.chapter}</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-ink-muted font-semibold uppercase">Status</p>
                <p className="font-display text-lg font-black text-emerald-600 mt-0.5">Ongoing</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-ink-soft">Sinopsis Komik</h4>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Menceritakan petualangan epik di dalam semesta yang penuh dengan keajaiban dan misteri. Ikuti kisah perjuangan tokoh utama dalam menembus takdir demi melindungi persahabatan, cinta, dan perdamaian dunia. Diproduksi secara gratis dengan kualitas grafis hitam putih legendaris khas Jepang.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setReadingChapter(manga.chapter)}
                className="bg-ink hover:bg-gold-dark text-white text-xs font-black tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-ink/15 cursor-pointer flex items-center gap-2"
              >
                <BookOpen size={14} /> Baca Chapter Terbaru
              </button>
              
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "border text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2",
                  isBookmarked 
                    ? "bg-gold/10 border-gold text-gold" 
                    : "border-border bg-white text-ink-soft hover:border-gold hover:text-gold"
                )}
              >
                <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} /> 
                {isBookmarked ? "Tersimpan" : "Simpan di Favorit"}
              </button>

              <button className="border border-border bg-white text-ink-muted hover:text-gold hover:border-gold p-4 rounded-xl transition-colors cursor-pointer">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Chapters list section */}
        <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 text-left">
          
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h3 className="font-display text-lg font-black text-ink">Daftar Semua Chapter</h3>
              <p className="text-xs text-ink-muted">Pilih chapter untuk mulai membaca secara gratis langsung.</p>
            </div>
            
            {/* View toggle and layout choices */}
            <div className="flex items-center gap-3">
              <div className="inline-flex border border-border rounded-lg p-0.5 shrink-0 bg-cream/10">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("p-1.5 rounded-md transition-colors cursor-pointer", viewMode === "grid" ? "bg-white text-gold shadow-xs" : "text-ink-muted hover:text-ink")}
                >
                  <Grid size={14} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn("p-1.5 rounded-md transition-colors cursor-pointer", viewMode === "list" ? "bg-white text-gold shadow-xs" : "text-ink-muted hover:text-ink")}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Chapters grid/list rendering */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {chapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => {
                    setReadingChapter(ch.number);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="p-3.5 bg-cream/10 hover:bg-gold/15 border border-border hover:border-gold/30 rounded-xl transition-all duration-200 text-center cursor-pointer group"
                >
                  <span className="font-bold text-xs text-ink group-hover:text-gold-dark transition-colors block">
                    Ch. {ch.number}
                  </span>
                  <span className="text-[9px] text-ink-muted mt-0.5 block">
                    {ch.date}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {chapters.map((ch) => (
                <div 
                  key={ch.number}
                  onClick={() => {
                    setReadingChapter(ch.number);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="flex items-center justify-between py-3.5 hover:bg-cream/10 rounded-lg px-2 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={14} className="text-ink-muted group-hover:text-gold transition-colors" />
                    <span className="text-xs font-bold text-ink group-hover:text-gold-dark transition-colors">
                      Chapter {ch.number}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] text-ink-muted font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {ch.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {ch.views.toLocaleString()} kali dibaca
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Banner */}
          <div className="p-4 bg-linear-to-r from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3 mt-6">
            <Info size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-left space-y-1">
              <h5 className="text-xs font-bold text-emerald-800">Informasi Penting</h5>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                Seluruh komik di website Kumimi dapat dibaca secara gratis dan tidak memerlukan registrasi ataupun login. Klik tombol chapter manapun di atas untuk langsung membaca menggunakan web viewer interaktif kami.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-border text-xs text-ink-muted">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-black text-gold tracking-tight">
            Kumimi
          </div>
          <div>
            &copy; 2026 Kumimi. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
