"use client";

import { useEffect } from "react";
import { markChapterRead } from "@/lib/read-history";

interface MarkAsReadProps {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genres?: string[];
  chapterNumber: number;
  chapterSlug: string;
}

export function MarkAsRead({
  comicId,
  slug,
  title,
  coverUrl,
  type,
  genres,
  chapterNumber,
  chapterSlug,
}: MarkAsReadProps) {
  // Save initial read status (page 1)
  useEffect(() => {
    markChapterRead({
      comicId,
      slug,
      title,
      coverUrl,
      type,
      genres,
      chapterNumber,
      chapterSlug,
      pageNumber: 1,
    });
  }, [comicId, slug, title, coverUrl, type, genres, chapterNumber, chapterSlug]);

  // Track active page in viewport
  useEffect(() => {
    // Give images a brief moment to render
    const timer = setTimeout(() => {
      const images = document.querySelectorAll(".reader-page-img");
      if (images.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Focus on top-middle region of viewport
        threshold: 0.01,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const altText = entry.target.getAttribute("alt") || "";
            const match = altText.match(/Page\s+(\d+)/i);
            if (match) {
              const pageNumber = parseInt(match[1], 10);
              markChapterRead({
                comicId,
                slug,
                title,
                coverUrl,
                type,
                genres,
                chapterNumber,
                chapterSlug,
                pageNumber,
              });
            }
          }
        });
      }, observerOptions);

      images.forEach((img) => observer.observe(img));

      return () => {
        images.forEach((img) => observer.unobserve(img));
        observer.disconnect();
      };
    }, 1500); // 1.5 seconds delay to allow images layout to stabilize

    return () => clearTimeout(timer);
  }, [comicId, slug, title, coverUrl, type, genres, chapterNumber, chapterSlug]);

  return null;
}