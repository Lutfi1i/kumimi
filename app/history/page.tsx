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

      <div className="w-full bg-[#f8f9fa] dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 min-h-screen pb-16 transition-colors duration-200">
        {/* Banner Section */}
        <div className="w-full bg-[#191a1c] dark:bg-[#151618] border-b border-gray-200/50 dark:border-neutral-800/50 py-12 text-white shadow-xs">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-white/95 px-3 py-1 rounded-full backdrop-blur-xs select-none">
                Riwayat Baca
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight text-white">
                Histori Kamu
              </h1>
              <p className="text-white/85 text-sm mt-2 max-w-xl">
                Lanjutkan komik yang pernah kamu baca, tersimpan otomatis di browser ini.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-xl backdrop-blur-md border border-white/10 shrink-0 self-start md:self-auto">
              <History className="w-8 h-8 text-[#ff6740]" />
              <div className="text-left">
                <p className="text-2xl font-black text-white">{history.length}</p>
                <p className="text-xs text-white/70 font-semibold uppercase">Komik Dibaca</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-8">
          {/* Controls */}
          {history.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium">
                Riwayat disimpan lokal di browser ini saja.
              </p>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 text-xs font-bold text-[#ff6740] hover:text-[#e05330] hover:underline transition-all cursor-pointer"
              >
                <Trash2 size={13} />
                Hapus Semua
              </button>
            </div>
          )}

          {!loaded ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-3/4 rounded-lg bg-gray-200 dark:bg-neutral-800 animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="py-16 bg-white dark:bg-[#151618] rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xs">
              <EmptyState
                title="Belum Ada Riwayat"
                description="Komik yang kamu baca akan muncul di sini biar gampang dilanjutin lagi."
              />
              <div className="flex justify-center mt-4">
                <Link
                  href="/"
                  className="text-xs font-bold text-[#ff6740] hover:underline"
                >
                  Mulai jelajahi komik →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

          <div className="absolute bottom-2 left-2 right-2">
            <span className="inline-block bg-[#ff6740] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
              Ch. {entry.lastChapterNumber}
            </span>
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