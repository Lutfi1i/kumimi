'use client'

import { useState } from "react";
import Link from "next/link";

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Terbaru", href: "/latest" },
    { label: "Populer", href: "/popular" },
    { label: "Bookmark", href: "/bookmark" },
];

const genreList: string[] = [
    "Action", "Romance", "Fantasy", "Comedy", "Horror",
    "Isekai", "School Life", "Slice of Life", "Drama", "Martial Arts",
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [genreOpen, setGenreOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        // arahkan ke halaman search, sesuaikan sama routing lo
        window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">

                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <span className="text-lg font-bold text-white tracking-tight hidden sm:block">
                            Kumimi
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={() => setGenreOpen(true)}
                            onMouseLeave={() => setGenreOpen(false)}
                        >
                            <button
                                type="button"
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                Genre
                                <svg
                                    className={`w-4 h-4 transition-transform ${genreOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {genreOpen && (
                                <div className="absolute top-full left-0 pt-2 w-64">
                                    <div className="bg-[#1a1a22] border border-white/10 rounded-xl shadow-xl p-3 grid grid-cols-2 gap-1">
                                        {genreList.map((genre) => (
                                            <Link
                                                key={genre}
                                                href={`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {genre}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    <form
                        onSubmit={handleSearchSubmit}
                        className="hidden lg:flex flex-1 max-w-xs"
                    >
                        <div className="relative w-full">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Cari judul komik..."
                                className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-[#e8593f] transition-colors"
                            />
                        </div>
                    </form>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Cari"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="relative hidden sm:flex p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Notifikasi"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e8593f] rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-9 h-9 rounded-full bg-[#e8593f]/20 border border-[#e8593f]/40 flex items-center justify-center text-[#e8593f] font-semibold text-sm"
                            >
                                N
                            </button>

                            {profileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a22] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                                    <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        Profil Saya
                                    </Link>
                                    <Link href="/history" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        Riwayat Baca
                                    </Link>
                                    <Link href="/bookmark" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        Bookmark
                                    </Link>
                                    <div className="h-px bg-white/10"></div>
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
                                    >
                                        Keluar
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Menu"
                        >
                            {mobileOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1">
                    <form onSubmit={handleSearchSubmit} className="mb-3">
                        <div className="relative w-full">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Cari judul komik..."
                                className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 text-white placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:border-[#e8593f]"
                            />
                        </div>
                    </form>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-2 mt-2 border-t border-white/10">
                        <p className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Genre</p>
                        <div className="grid grid-cols-2 gap-1">
                            {genreList.map((genre) => (
                                <Link
                                    key={genre}
                                    href={`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    {genre}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}