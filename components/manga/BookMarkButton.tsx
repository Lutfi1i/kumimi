"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark, onBookmarksChanged } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genre?: string;
}

export function BookmarkButton({
  comicId,
  slug,
  title,
  coverUrl,
  type,
  genre,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(comicId));
    const unsubscribe = onBookmarksChanged(() => setBookmarked(isBookmarked(comicId)));
    return unsubscribe;
  }, [comicId]);

  const handleClick = () => {
    const next = toggleBookmark({ comicId, slug, title, coverUrl, type, genre });
    setBookmarked(next);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2.5 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none border ${
        bookmarked
          ? "bg-[#ff6740] border-[#ff6740] text-white hover:bg-[#e05330]"
          : "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      }`}
    >
      <Bookmark size={14} className={bookmarked ? "fill-white" : ""} />
      {bookmarked ? "TERSIMPAN" : "BOOKMARK"}
    </button>
  );
}