"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { History, Trash2, X } from "lucide-react";
import {
  getAllReadHistory,
  removeFromHistory,
  clearAllHistory,
  type ReadHistoryEntry,
} from "@/lib/read-history";

function formatReadAt(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;

  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ReadHistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHistory(getAllReadHistory());
    setLoaded(true);
  }, []);

  const handleRemove = (comicId: string) => {
    removeFromHistory(comicId);
    setHistory((prev) => prev.filter((h) => h.comicId !== comicId));
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistory([]);
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-white dark:bg-[#0b0c0d] text-neutral-900 dark:text-neutral-100 min-h-screen pb-16 transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] pt-24">
          
          {/* Minimalist Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 dark:border-neutral-800 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ff6740] tracking-wider uppercase">
                <History className="w-4 h-4" />
                <span>Riwayat Baca</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 tracking-tight">
                Terakhir Dibaca
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {history.length} komik tersimpan
              </span>
              {history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  Hapus Semua
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          {!loaded ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-3/4 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <EmptyState
                title="Belum Ada Riwayat"
                description="Komik yang kamu baca akan otomatis tersimpan di sini."
              />
              <Link
                href="/"
                className="mt-6 text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Mulai Jelajah Komik
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {history.map((entry) => (
                <HistoryCard key={entry.comicId} entry={entry} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function HistoryCard({
  entry,
  onRemove,
}: {
  entry: ReadHistoryEntry;
  onRemove: (comicId: string) => void;
}) {
  return (
    <div className="group relative flex flex-col gap-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(entry.comicId);
        }}
        className="absolute top-2 right-2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all cursor-pointer"
        aria-label="Hapus dari riwayat"
      >
        <X size={13} />
      </button>

      <Link
        href={`/comic/${entry.slug}/${entry.lastChapterSlug}`}
        className="flex flex-col gap-2"
      >
        <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-800 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          {entry.coverUrl ? (
            <img src={entry.coverUrl} alt={entry.title} className="w-full h-full object-cover" />
            ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                <span className="text-3xl font-black text-white/20">
                {(entry.title ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
            </div>
            )}

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />

          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
            <span className="inline-block bg-[#ff6740] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
              Ch. {entry.lastChapterNumber}
            </span>
            {entry.lastPageNumber && entry.lastPageNumber > 1 && (
              <span className="inline-block bg-neutral-900/90 text-neutral-100 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-neutral-700/50 shadow-sm">
                Hal. {entry.lastPageNumber}
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[0.8rem] font-semibold text-neutral-900 dark:text-white leading-tight truncate">
            {entry.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[0.7rem] text-gray-500 dark:text-neutral-400">
            {entry.type && (
              <span className="text-[9px] font-bold bg-[#ff6740]/10 text-[#ff6740] px-1.5 py-0.2 rounded-sm font-mono">
                {entry.type.toUpperCase()}
              </span>
            )}
            <span>{formatReadAt(entry.readAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}