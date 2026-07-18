import React from "react";


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

const trending: Comic[] = [];

export default function GenreList() {
    const genres: string[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu", "Selesai"];

    return (
        <section className="py-2">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                    Jadwal Update
                </h2>
            </div>

            <div className="flex flex-wrap gap-2.5 pb-3">
                {genres.map((g) => (
                    <button
                        key={g}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border cursor-pointer
                        ${g === "Senin"
                                ? "bg-zinc-950 text-white shadow-sm shadow-emerald-500/20"
                                : "bg-gray-200 border-gray-200 hover:bg-gray-300 hover:text-gray-900 hover:border-gray-300"
                            }`}
                    >
                        {g}
                    </button>
                ))}
            </div>
            
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
                {trending.map((c) => (
                    <a
                        key={c.rank}
                        href="#"
                        className="group w-[200px] shrink-0 md:w-[220px] pb-4"
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
    );
}