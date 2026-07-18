"use client";

import { useEffect, useState } from "react";

type Hero = {
    title: string;
    image: string;
    desc: string;
};

const heroes: Hero[] = [];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    // AUTO SLIDE
    useEffect(() => {
        if (heroes.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (heroes.length === 0) return null;

    return (
        <section className="relative overflow-hidden rounded-xl border border-white/10">

            {/* SLIDER */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
            >
                {heroes.map((hero, i) => (
                    <div
                        key={i}
                        className="relative min-w-full h-[280px] md:h-[380px] group"
                    >
                        <img
                            src={hero.image}
                            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition duration-700"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent md:bg-linear-to-r md:from-black/90 md:via-black/40 md:to-transparent" />
                        {/* CONTENT */}
                        <div className="absolute bottom-0 md:top-0 p-6 md:p-12 max-w-xl flex flex-col justify-end h-full z-10">

                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-1 bg-white text-zinc-950 text-xs font-bold rounded-md">
                                    Trending
                                </span>
                                <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-md">
                                    ⭐ 4.9
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white">
                                {hero.title}
                            </h1>

                            <p className="mt-3 text-sm text-white/70 line-clamp-2">
                                {hero.desc}
                            </p>

                            <div className="mt-5 flex gap-3">
                                <button className="px-5 py-2 bg-white text-zinc-950 rounded-lg font-bold hover:bg-white/80 transition">
                                    Baca
                                </button>

                                <button className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white transition">
                                    Bookmark
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {heroes.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition ${i === index ? "bg-white" : "bg-white/30"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}