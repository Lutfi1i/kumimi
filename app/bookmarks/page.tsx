"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Bookmark, Trash2, X } from "lucide-react";
import {
  getAllBookmarks,
  removeBookmark,
  clearAllBookmarks,
  onBookmarksChanged,
  type BookmarkEntry,
} from "@/lib/bookmarks";

function formatBookmarkedAt(timestamp: number): string {
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

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBookmarks(getAllBookmarks());
    setLoaded(true);
    const unsubscribe = onBookmarksChanged(() => setBookmarks(getAllBookmarks()));
    return unsubscribe;
  }, []);

  const handleRemove = (comicId: string) => {
    removeBookmark(comicId);
  };

  const handleClearAll = () => {
    clearAllBookmarks();
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-[#f8f9fa] dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 min-h-screen pb-16 transition-colors duration-200">
        {/* Banner Section */}
        <div className="w-full bg-[#191a1c] py-12 text-white shadow-xs">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-white/95 px-3 py-1 rounded-full backdrop-blur-xs select-none">
                Koleksi Kamu
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight text-white">
                Bookmark
              </h1>
              <p className="text-white/85 text-sm mt-2 max-w-xl">
                Komik yang kamu simpan biar gampang ditemukan lagi kapan saja.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-xl backdrop-blur-md border border-white/10 shrink-0 self-start md:self-auto">
              <Bookmark className="w-8 h-8 text-[#ff6740]" />
              <div className="text-left">
                <p className="text-2xl font-black text-white">{bookmarks.length}</p>
                <p className="text-xs text-white/70 font-semibold uppercase">Komik Disimpan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[120px] py-8">
          {bookmarks.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 text-xs font-bold text-[#ff6740] hover:text-[#e05330] hover:underline transition-all"
              >
                <Trash2 size={13} />
                Hapus Semua
              </button>
            </div>
          )}

          {!loaded ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-3/4 rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="py-16 bg-white rounded-2xl border border-gray-200 shadow-xs">
              <EmptyState
                title="Belum Ada Bookmark"
                description="Simpan komik favoritmu dengan menekan ikon bookmark di setiap card, biar gampang dicari lagi."
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
              {bookmarks.map((entry) => (
                <BookmarkCard key={entry.comicId} entry={entry} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function BookmarkCard({
  entry,
  onRemove,
}: {
  entry: BookmarkEntry;
  onRemove: (comicId: string) => void;
}) {
  return (
    <div className="group relative flex flex-col gap-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(entry.comicId);
        }}
        className="absolute top-2 right-2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all"
        aria-label="Hapus dari bookmark"
      >
        <X size={13} />
      </button>

      <Link href={`/comic/${entry.slug}`} className="flex flex-col gap-2">
        <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          {entry.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.coverUrl}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
              <span className="text-3xl font-black text-white/20">
                {entry.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

          <div className="absolute top-2 left-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff6740] text-white">
              <Bookmark size={12} className="fill-white" />
            </span>
          </div>
        </div>

        <div>
          <p className="text-[0.8rem] font-semibold text-black leading-tight truncate">
            {entry.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[0.7rem] text-gray-500">
            {entry.type && (
              <span className="text-[9px] font-bold bg-[#ff6740]/10 text-[#ff6740] px-1.5 py-0.2 rounded-sm font-mono">
                {entry.type.toUpperCase()}
              </span>
            )}
            <span>Disimpan {formatBookmarkedAt(entry.bookmarkedAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}