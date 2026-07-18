"use client";

import { useRef } from "react";

type Comic = {
    rank: number;
    title: string;
    genre: string;
    chapter: string;
    hue: [string, string];
    image: string;
    type: string;
    rating: number;
};

const trendingSelector: string[] = ["Trending", "Popular"];


const trending: Comic[] = [];

export default function Home() {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;

        // ambil 1 card
        const card = container.querySelector("a");

        if (!card) return;

        const cardWidth = card.clientWidth;
        const gap = 16;

        const scrollPerClick = (cardWidth + gap) * 5;

        const scrollAmount =
            direction === "left" ? -scrollPerClick : scrollPerClick;

        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    return (
        <section className="relative flex flex-1 flex-col justify-center">
            <div className="flex flex-col gap-2">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-bold text-zinc-950">
                        Sedang Trending & Populer
                    </h1>

                    <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition">
                        Lihat Semua <span className="ml-1 text-zinc-400 text-[18px]">→</span>
                    </button>
                </div>

                <div className="flex flex-wrap gap-2.5 pb-3">
                    {trendingSelector.map((g) => (
                        <button
                            key={g}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border cursor-pointer
                        ${g === "Trending"
                                    ? "bg-zinc-950 text-white shadow-sm shadow-emerald-500/20"
                                    : "bg-gray-200 border-gray-200 hover:bg-gray-300 hover:text-gray-900 hover:border-gray-300"
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>

            </div>

            <button
                onClick={() => handleScroll('left')}
                className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-950 hover:bg-zinc-800 p-1 rounded-full shadow-lg"
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-950 hover:bg-zinc-800 p-1 rounded-full shadow-lg"
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div
                ref={scrollRef}
                className="no-scrollbar flex gap-5 overflow-x-auto pb-4"
            >
                {trending.map((c) => (
                    <a
                        key={c.rank}
                        href="#"
                        className="group w-[200px] shrink-0 md:w-[220px]"
                    >

                        <div className="relative w-full overflow-hidden rounded-md bg-zinc-200 shadow-sm transition-all duration-300 group-hover:shadow-xl">

                            <img
                                src={c.image}
                                alt={c.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase">
                                {c.type}
                            </span>

                            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-md flex items-center gap-0.5 shadow">
                                ⭐ {c.rating}
                            </span>

                            <span className="absolute left-2 top-2 text-5xl font-black text-white/20">
                                {c.rank}
                            </span>
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-3 pt-8 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <p className="text-[14px] font-semibold text-white">{c.genre}</p>
                            </div>
                        </div>

                        <div className="mt-2 px-1">
                            <p className="text-[17px] font-semibold text-zinc-900 line-clamp-2 leading-tight transition">
                                {c.title}
                            </p>
                            <p className="mt-1 text-[14px] text-zinc-500">
                                {c.chapter}
                            </p>
                        </div>

                    </a>
                ))}
            </div>
        </section>
    )
}