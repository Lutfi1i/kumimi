"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReaderNavbarProps {
  id: string;
  chapter: string;
}

function MascotLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/kumimi-logo.svg" 
      alt="Logo" 
      className="w-7 h-7 object-contain transition-all duration-300 group-hover:scale-105" 
    />
  );
}

export function ReaderNavbar({ id, chapter }: ReaderNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Initial detection of total page elements
    const imgs = document.querySelectorAll(".reader-page-img");
    setTotalPages(imgs.length);

    const checkCurrentPage = () => {
      const imgsList = document.querySelectorAll(".reader-page-img");
      if (imgsList.length > 0) {
        setTotalPages(imgsList.length);
        let current = 1;
        const threshold = window.innerHeight / 3; // Upper-third of viewport
        
        for (let i = 0; i < imgsList.length; i++) {
          const rect = imgsList[i].getBoundingClientRect();
          if (rect.top <= threshold) {
            current = i + 1;
          }
        }
        setCurrentPage(current);
      }
    };

    // Run once on mount after rendering
    const timer = setTimeout(checkCurrentPage, 200);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle iOS elastic scroll / top boundary
      if (currentScrollY <= 0) {
        setVisible(true);
        setLastScrollY(0);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide on scroll down, show on scroll up
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
      checkCurrentPage();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY]);

  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <div
      className={cn(
        "sticky top-0 z-50 bg-cream border-b border-border transition-transform duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-3xl mx-auto px-3 py-2.5 flex items-center justify-between">
        <Link
          href={`/comic/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted hover:text-gold transition-colors"
        >
          <ArrowLeft size={14} /> 
          <span className="truncate max-w-[120px] sm:max-w-xs">{chapter}</span>
          {totalPages > 0 && (
            <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.5 rounded-full font-mono ml-1">
              {currentPage}/{totalPages}
            </span>
          )}
        </Link>
        <Link href="/" className="flex items-center gap-2 select-none group">
          <MascotLogo />
          <span className="text-[24px] text-black font-bold tracking-tight leading-none group-hover:text-[#ff6740] transition-colors" style={{ fontFamily: "cursive" }}>
            Kumimi
          </span>
        </Link>
      </div>

      {/* Progressive Progress Bar */}
      {totalPages > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-black/10 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ff6740] to-orange-500 transition-all duration-150 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
