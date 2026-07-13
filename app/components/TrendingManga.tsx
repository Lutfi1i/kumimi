"use client";

import { useRef } from "react";

type Comic = {
    rank: number;
    title: string;
    genre: string;
    chapter: string;
    hue: [string, string];
    image: string;
};

const trending: Comic[] = [
    { rank: 1, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 2, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 3, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 4, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 5, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 6, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 7, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 8, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 9, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
    { rank: 10, image: "/poster-manhwa-TWATF.jpeg", title: "Pedang Terakhir", genre: "Aksi", chapter: "Ch. 142", hue: ["#10b981", "#022c22"] },
];

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
        <section className="relative flex flex-1 flex-col justify-center gap-6 px-6 py-8 md:px-12 max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">

                    </div>
                    <h1 className="text-2xl font-bold text-zinc-950 md:text-3xl">
                        Sedang Trending &amp; Populer
                    </h1>
                </div>

                <div className="hidden items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 p-1 md:flex">
                    <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-zinc-950">
                        Trending
                    </button>
                    <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white">
                        Terpopuler
                    </button>
                    <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white">
                        Terbaru
                    </button>
                </div>
            </div>

            <button
                onClick={() => handleScroll('left')}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-zinc-950 hover:bg-zinc-800 p-1 rounded-full shadow-lg"
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
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-zinc-950 hover:bg-zinc-800 p-1 rounded-full shadow-lg"
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
                className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
            >
                {trending.map((c) => (
                    <a
                        key={c.rank}
                        href="#"
                        className="group relative w-[200px] shrink-0 md:w-[222px]"
                    >
                        <div
                            className="relative aspect-[3/4] w-full overflow-hidden rounded-xl transition-transform duration-300 "
                            style={{ background: `linear-gradient(160deg, ${c.hue[0]}33, ${c.hue[1]})` }}
                        >
                            <img
                                src={c.image}
                                alt={c.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0 opacity-40"
                                style={{ background: `linear-gradient(0deg, #09090b 5%, transparent 60%)` }}
                            />
                            <span
                                aria-hidden
                                className="pointer-events-none absolute -bottom-4 -left-2 select-none font-black leading-none text-white/10"
                                style={{ fontSize: "6rem" }}
                            >
                                {c.rank}
                            </span>

                            <div className="absolute inset-x-0 bottom-0 p-3">
                                <p className="text-sm font-semibold leading-tight text-white line-clamp-2">
                                    {c.title}
                                </p>
                                <p className="mt-1 text-xs text-zinc-400">{c.chapter}</p>
                            </div>

                            <span className="absolute right-2 top-2 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                                {c.genre}
                            </span>

                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-emerald-400" />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}