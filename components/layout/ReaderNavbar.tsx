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
    <svg className="w-7 h-7 text-[#ff6740] fill-current drop-shadow-[0_0_4px_rgba(255,103,64,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(255,103,64,0.75)] transition-all duration-300" viewBox="0 0 24 24">
      <path d="M12 3c-1.2 0-2.4.3-3.5.9L5.2 2.1C4.8 1.8 4.2 2 4 2.5c-.2.5 0 1.1.5 1.3l2.5 1.5C5.2 6.7 4 8.7 4 11c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.3-1.2-4.3-3-5.7l2.5-1.5c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.2-.4l-3.3 1.9C14.4 3.3 13.2 3 12 3zm-3.5 9c-.8 0-1.5-.7-1.5-1.5S7.7 9 8.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm7 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
    </svg>
  );
}

export function ReaderNavbar({ id, chapter }: ReaderNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle iOS elastic scroll / top boundary
      if (currentScrollY <= 0) {
        setVisible(true);
        setLastScrollY(0);
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 bg-cream border-b border-border transition-transform duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-3xl mx-auto px-3 py-2 flex items-center justify-between">
        <Link
          href={`/comic/${id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-muted hover:text-gold transition-colors"
        >
          <ArrowLeft size={14} /> {chapter}
        </Link>
        <Link href="/" className="flex items-center gap-2 select-none group">
          <MascotLogo />
          <span className="text-[20px] text-black font-black tracking-tight leading-none group-hover:text-[#ff6740] transition-colors">
            Kumimi
          </span>
        </Link>
      </div>
    </div>
  );
}
