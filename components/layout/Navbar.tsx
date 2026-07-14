"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Beranda", href: "/", active: true },
  { label: "Pembaruan", href: "/updates" },
  { label: "Populer", href: "/popular" },
  { label: "Buku Manga", href: "/books" },
  { label: "Editor Pilihan", href: "/editors-pick" },
  { label: "Buku Favorit", href: "/favorites" },
  { label: "Tentang Kami", href: "/about" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 h-15 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-black text-gold tracking-tight shrink-0"
        >
          Kumimi
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  link.active
                    ? "text-gold font-semibold"
                    : "text-ink-muted hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div
            className={cn(
              "relative hidden sm:flex items-center transition-all duration-200",
              searchFocused ? "w-52" : "w-44"
            )}
          >
            <Search
              size={13}
              className="absolute left-2.5 text-ink-muted pointer-events-none"
            />
            <input
              type="text"
              placeholder="Cari komik..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "w-full bg-card border border-border rounded-lg",
                "pl-8 pr-3 py-1.5 text-sm text-ink placeholder:text-ink-muted",
                "font-body outline-none transition-all duration-200",
                "focus:border-gold focus:bg-warm-white"
              )}
            />
          </div>

          {/* Join button */}
          <Link
            href="/client/register"
            className={cn(
              "hidden sm:inline-flex items-center",
              "bg-gold hover:bg-gold-dark text-white",
              "text-sm font-semibold px-4 py-1.5 rounded-lg",
              "transition-all duration-150 hover:-translate-y-px"
            )}
          >
            Gabung
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-1.5 text-ink-muted hover:text-gold transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-cream px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium py-1",
                link.active ? "text-gold font-semibold" : "text-ink-muted"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Cari komik..."
                className="w-full bg-card border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-gold"
              />
            </div>
            <Link
              href="/join"
              className="bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-lg"
            >
              Gabung
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}