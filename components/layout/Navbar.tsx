"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Star, Bookmark, Eye, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchSearchResults } from "@/lib/api";
import type { Manga } from "@/types/manga";

const NAV_LINKS = [
  { label: "ORIGINALS", href: "/originals" },
  { label: "KATEGORI", href: "/categories" },
  { label: "PERINGKAT", href: "/rankings" },
  { label: "KANVAS", href: "/canvas" },
];

function MascotLogo() {
  return (
    <svg className="w-7 h-7 text-[#ff6740] fill-current drop-shadow-[0_0_4px_rgba(255,103,64,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(255,103,64,0.75)] transition-all duration-300" viewBox="0 0 24 24">
      <path d="M12 3c-1.2 0-2.4.3-3.5.9L5.2 2.1C4.8 1.8 4.2 2 4 2.5c-.2.5 0 1.1.5 1.3l2.5 1.5C5.2 6.7 4 8.7 4 11c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.3-1.2-4.3-3-5.7l2.5-1.5c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.2-.4l-3.3 1.9C14.4 3.3 13.2 3 12 3zm-3.5 9c-.8 0-1.5-.7-1.5-1.5S7.7 9 8.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm7 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
    </svg>
  );
}

function formatViews(views: string): string {
  const num = parseInt(views);
  if (isNaN(num)) return views;
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(num);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Design features state
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("Ctrl");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor keys for shortcut trigger
  useEffect(() => {
    const isMac = typeof window !== "undefined" && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
    if (isMac) {
      setShortcutKey("⌘");
    }

    const handleKeyDownShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDownShortcut);
    return () => window.removeEventListener("keydown", handleKeyDownShortcut);
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      setIsSearching(true);
      setShowDropdown(true);
      try {
        const results = await fetchSearchResults(val);
        setSearchResults(results.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        setShowDropdown(false);
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300 ease-in-out",
      isScrolled
        ? "bg-white/80 dark:bg-[#191a1c]/80 border-b border-gray-200/50 dark:border-neutral-800/50 backdrop-blur-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)] text-black dark:text-white"
        : "bg-white dark:bg-white border-b border-transparent text-black dark:text-black"
    )}>
      <div className="max-w-[1400px] mx-auto px-5 h-[76px] flex items-center justify-between gap-4">
        {/* Left Logo & Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 select-none group">
            <MascotLogo />
            <span className="text-[20px] font-black tracking-tight leading-none group-hover:text-[#ff6740] transition-colors">
              Kumimi
            </span>
          </Link>

          {/* Nav Items */}
          <ul className="hidden xl:flex items-center gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative group font-bold text-[14px] whitespace-nowrap hover:text-[#ff6740] dark:hover:text-[#ff6740] transition-colors duration-150 py-2",
                    isScrolled ? "text-gray-700 dark:text-[#e1e2e4]" : "text-gray-700 dark:text-gray-700"
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#ff6740] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Box (Mepet ke tombol dashboard) */}
          <div className="relative">
            <div className={cn(
              "flex items-center rounded-lg px-3 h-10 border transition-all duration-300 ease-in-out relative",
              "bg-gray-100/90 dark:bg-[#242527]/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]",
              showDropdown ? "border-[#ff6740] ring-1 ring-[#ff6740]" : "border-transparent",
              isFocused || searchQuery ? "w-[180px] xs:w-[240px] sm:w-[360px] md:w-[480px]" : "w-[120px] xs:w-[150px] sm:w-[200px]"
            )}>
              <Search size={16} className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchQuery.trim().length > 1) {
                    setShowDropdown(true);
                  }
                }}
                placeholder={isFocused ? "Search Query" : "Search"}
                className="bg-transparent w-full text-sm text-black dark:text-white placeholder:text-gray-500 focus:outline-none pr-8"
              />
              
              {/* Outline 3D Tactile Keycaps */}
              {!searchQuery && !isFocused && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none text-[9px] text-gray-400 dark:text-gray-500 font-mono font-bold">
                  <span className="bg-white dark:bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-gray-300 dark:border-[#3c3c3c] shadow-[0_1px_1px_rgba(0,0,0,0.1)]">{shortcutKey}</span>
                  <span className="bg-white dark:bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-gray-300 dark:border-[#3c3c3c] shadow-[0_1px_1px_rgba(0,0,0,0.1)]">K</span>
                </div>
              )}

              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex-shrink-0 flex items-center justify-center bg-[#ff6740] hover:bg-[#e05330] text-white rounded p-0.5 transition-colors shadow-sm"
                  aria-label="Clear search"
                >
                  <X size={13} className="stroke-[3]" />
                </button>
              )}
            </div>

            {/* Search Dropdown with Blur and Shadow */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute left-0 right-0 top-[115%] z-50 bg-white/95 dark:bg-[#1c1c1e]/95 border border-gray-200 dark:border-[#2c2d30] rounded-xl shadow-2xl py-3.5 px-4 text-black dark:text-white backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-150 dark:border-[#2c2d30] mb-3">
                  <span className="text-xs font-bold text-gray-400 dark:text-[#e1e2e4] tracking-wider uppercase">Manga</span>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="text-xs text-[#ff6740] hover:underline flex items-center gap-1 font-bold"
                    onClick={() => setShowDropdown(false)}
                  >
                    Lihat Semua <ArrowRight size={12} />
                  </Link>
                </div>

                {isSearching ? (
                  <div className="flex items-center justify-center py-6 text-sm text-gray-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-[#ff6740] mr-2" />
                    Mencari...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-6 text-xs text-gray-400">
                    Tidak ditemukan hasil untuk &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                    {searchResults.map((m) => (
                      <Link
                        key={m.id}
                        href={`/comic/${m.slug}`}
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchQuery("");
                          setIsFocused(false);
                        }}
                        className="flex gap-3 p-2 rounded-lg bg-gray-50/50 hover:bg-gray-100/80 dark:bg-[#242527]/30 dark:hover:bg-[#242527]/75 transition-all duration-200 text-left hover:scale-[1.01]"
                      >
                        <img
                          src={m.coverUrl || "/placeholder.jpg"}
                          alt={m.title}
                          className="w-10 h-14 object-cover rounded-md flex-shrink-0 bg-gray-100 dark:bg-[#242527] shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=120&auto=format&fit=crop";
                          }}
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <p className="text-sm font-bold text-black dark:text-white truncate leading-tight">
                            {m.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-2.5 text-[10px] text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-0.5 text-[#ff6740] font-bold">
                              <Star size={10} className="fill-[#ff6740]" />
                              {m.rating ? m.rating.toFixed(2) : "N/A"}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Bookmark size={10} />
                              {m.views ? formatViews(m.views) : "N/A"}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Eye size={10} />
                              {m.views ? formatViews(m.views) : "N/A"}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <MessageSquare size={10} />
                              {Math.floor(Number(m.id) * 17) % 400}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-bold">
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              m.status?.toLowerCase() === "completed" ? "bg-[#3b82f6]" : "bg-[#22c55e]"
                            )} />
                            <span className={m.status?.toLowerCase() === "completed" ? "text-[#3b82f6]" : "text-[#22c55e]"}>
                              {m.status || "Ongoing"}
                            </span>
                            {m.type && (
                              <span className="ml-1 text-[8px] bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-300 px-1.5 py-0.2 rounded font-mono">
                                {m.type.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* User Outline Profile */}
          <div className={cn(
            "size-[38px] rounded-full flex items-center justify-center border cursor-pointer transition-all duration-200",
            isScrolled
              ? "bg-gray-100 dark:bg-[#242527] border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-white/80 hover:text-[#ff6740] dark:hover:text-white hover:border-[#ff6740] dark:hover:border-neutral-700"
              : "bg-gray-100 border-gray-200 text-gray-700 hover:text-[#ff6740] hover:border-[#ff6740]"
          )}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>

          {/* Mobile menu icon */}
          <button
            className={cn(
              "xl:hidden p-1.5 hover:text-[#ff6740] transition-colors",
              isScrolled ? "text-gray-700 dark:text-white" : "text-gray-700 dark:text-gray-700"
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="xl:hidden border-t border-[#e0e0e0] dark:border-[#292a2c] bg-white dark:bg-[#191a1c] px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-bold text-gray-700 dark:text-[#e1e2e4] py-1.5 border-b border-gray-150 dark:border-[#242527] hover:text-[#ff6740] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
