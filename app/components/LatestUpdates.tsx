"use client";

interface UpdateItem {
  id: number;
  title: string;
  chapter: string;
  timeAgo: string;
  image?: string;
}

export default function LatestUpdates() {
  const updates: UpdateItem[] = [
    { 
      id: 1, 
      title: "Pedang Terakhir", 
      chapter: "Chapter 142", 
      timeAgo: "10 mnt lalu",
      image: "/poster-manhwa-TWATF.jpeg"
    },
    { 
      id: 2, 
      title: "The Heavenly Demon", 
      chapter: "Chapter 88", 
      timeAgo: "42 mnt lalu",
      image: "/poster-manhwa-TWATF.jpeg"
    },
    { 
      id: 3, 
      title: "Top Corner", 
      chapter: "Chapter 110", 
      timeAgo: "2 jam lalu",
      image: "/poster-manhwa-TWATF.jpeg"
    },
    { 
      id: 4, 
      title: "Eleceed Modern", 
      chapter: "Chapter 294", 
      timeAgo: "5 jam lalu",
      image: "/poster-manhwa-TWATF.jpeg"
    },
    { 
      id: 5, 
      title: "Mercenary Enrollment", 
      chapter: "Chapter 185", 
      timeAgo: "Kemarin",
      image: "/poster-manhwa-TWATF.jpeg"
    },
    { 
      id: 6, 
      title: "Wind Breaker", 
      chapter: "Chapter 490", 
      timeAgo: "Kemarin",
      image: "/poster-manhwa-TWATF.jpeg"
    },
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-zinc-950 rounded-full" />
          <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Update Terbaru
          </h2>
          <span className="text-xs bg-orange-50 text-zinc-950 px-3 py-1 rounded-full ml-2 font-medium">
            {updates.length} baru
          </span>
        </div>

        <button className="text-sm text-zinc-950 transition-all flex items-center gap-1 font-medium group">
          Lihat Semua
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {updates.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center gap-4 p-3 rounded-2xl bg-zinc-50/80 hover:bg-zinc-50 border border-zinc-200/60 hover:border-white transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-16 h-22 rounded-xl overflow-hidden shrink-0 shadow-md shadow-zinc-200/50">
              <img
                src={item.image || "/poster-manhwa-TWATF.jpeg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-zinc-950  transition-colors truncate">
                  {item.title}
                </p>
                <span className="text-xs bg-gray-100 text-zinc-950 px-2.5 py-0.5 rounded-full font-medium">
                  {item.chapter}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.timeAgo}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-1 text-zinc-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  2.5k
                </span>
              </div>
            </div>

            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-medium transition-all group-hover:opacity-100 opacity-0 group-hover:translate-x-0 translate-x-4 duration-300 shadow-sm shadow-zinc-200/50">
              <span>Baca</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="sm:hidden text-xs text-zinc-400 whitespace-nowrap">
              {item.timeAgo}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full sm:hidden py-3 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all text-sm font-medium">
        Lihat Semua Update
      </button>
    </section>
  );
}