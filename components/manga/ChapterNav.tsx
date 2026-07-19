"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List, Bookmark, X } from "lucide-react";
import { isBookmarked, toggleBookmark, onBookmarksChanged } from "@/lib/bookmarks";
import type { ChapterInfo } from "@/types/manga";
import { cn } from "@/lib/utils";

interface ChapterNavProps {
  id: string;
  prevChapter: ChapterInfo | null;
  nextChapter: ChapterInfo | null;
  chapters: ChapterInfo[];
  currentChapterSlug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genres?: string[];
}

export function ChapterNav({
  id,
  prevChapter,
  nextChapter,
  chapters,
  currentChapterSlug,
  title,
  coverUrl,
  type,
  genres,
}: ChapterNavProps) {
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const lastScrollY = useRef(0);

  // Sync bookmark state
  useEffect(() => {
    setBookmarked(isBookmarked(id));
    const unsubscribe = onBookmarksChanged(() => setBookmarked(isBookmarked(id)));
    return unsubscribe;
  }, [id]);

  // Hide/Show floating nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep showing when close to top or bottom
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      if (currentScrollY < 150 || (currentScrollY + windowHeight >= documentHeight - 150)) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide
        setVisible(false);
      } else {
        // Scrolling up -> show
        setVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = toggleBookmark({ comicId: id, slug: id, title, coverUrl, type, genres });
    setBookmarked(next);
  };

  // Close sidebar on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Floating Bar Container */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl transition-all duration-300 ease-in-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between gap-2 p-2 rounded-full bg-neutral-900/90 border border-neutral-800/80 backdrop-blur-md shadow-2xl">
          
          {/* Left Group: Prev / Next buttons */}
          <div className="flex items-center gap-1 bg-neutral-950/50 rounded-full p-1 border border-neutral-800/40">
            {/* Prev button */}
            {prevChapter ? (
              <Link
                href={`/comic/${id}/${prevChapter.slug}`}
                className="flex items-center gap-1 rounded-full py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold text-white/80 hover:bg-white/5 transition-all"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
                <span className="hidden sm:inline text-[10px] font-normal text-white/40">
                  Ch.{prevChapter.chapterNumber}
                </span>
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-full py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold text-white/20 cursor-not-allowed">
                <ChevronLeft size={16} />
                <span>Prev</span>
              </span>
            )}

            {/* Next button */}
            {nextChapter ? (
              <Link
                href={`/comic/${id}/${nextChapter.slug}`}
                className="flex items-center gap-1 rounded-full bg-[#ff6740] hover:bg-[#e05330] py-2 px-4 sm:px-5 text-xs sm:text-sm font-black text-white shadow-md transition-all active:scale-95"
              >
                <span>Next</span>
                <span className="hidden sm:inline text-[10px] font-bold text-white/70">
                  Ch.{nextChapter.chapterNumber}
                </span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-white/5 py-2 px-4 sm:px-5 text-xs sm:text-sm font-bold text-white/20 cursor-not-allowed">
                <span>Next</span>
                <ChevronRight size={16} />
              </span>
            )}
          </div>

          {/* Right Group: Daftar Chapter & Bookmark */}
          <div className="flex items-center gap-1.5 pr-2">
            {/* Daftar Chapter button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-neutral-850 hover:bg-neutral-800 active:bg-neutral-750 py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer"
              title="Daftar Chapter"
            >
              <List size={16} />
              <span className="hidden sm:inline">Chapters</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={handleBookmarkClick}
              className={cn(
                "flex items-center gap-1.5 rounded-full py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                bookmarked
                  ? "bg-[#ff6740]/10 text-[#ff6740] border border-[#ff6740]/20 hover:bg-[#ff6740]/20"
                  : "bg-neutral-850 hover:bg-neutral-800 text-white"
              )}
              title={bookmarked ? "Hapus Bookmark" : "Simpan Bookmark"}
            >
              <Bookmark size={16} className={bookmarked ? "fill-[#ff6740]" : ""} />
              <span className="hidden sm:inline">{bookmarked ? "Tersimpan" : "Bookmark"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sidebar Quick Change Drawer */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ease-in-out",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[290px] sm:w-[340px] bg-[#111214] border-l border-neutral-800/80 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/60 bg-[#16171a]">
          <div>
            <h3 className="font-extrabold text-sm text-white tracking-wide truncate max-w-[180px] sm:max-w-[220px]">
              {title}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">Daftar Chapter</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white transition-all cursor-pointer"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {chapters.length === 0 ? (
            <p className="text-xs text-neutral-500 text-center py-8">Tidak ada chapter.</p>
          ) : (
            chapters.map((ch) => {
              const isActive = ch.slug === currentChapterSlug || String(ch.chapterNumber) === currentChapterSlug;
              return (
                <Link
                  key={ch.slug}
                  href={`/comic/${id}/${ch.slug}`}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg text-xs font-semibold transition-all border",
                    isActive
                      ? "bg-[#ff6740]/10 border-[#ff6740]/30 text-[#ff6740]"
                      : "bg-neutral-900/40 border-neutral-800/40 hover:bg-neutral-800/50 text-white/80 hover:text-white"
                  )}
                >
                  <span className="truncate max-w-[180px]">{ch.title || `Chapter ${ch.chapterNumber}`}</span>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-sm font-mono shrink-0",
                    isActive ? "bg-[#ff6740] text-white" : "bg-neutral-850 text-white/50"
                  )}>
                    Ch.{ch.chapterNumber}
                  </span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}