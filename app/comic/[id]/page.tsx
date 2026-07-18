import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { getAbstractCover } from "@/components/manga/MangaCard";
import { fetchMangaDetail } from "@/lib/api";
import { getMangaById } from "@/lib/mock-data";
import { ArrowLeft, BookOpen, Zap, Star } from "lucide-react";
import { DetailChapters } from "@/components/manga/DetailChapters";
import ButtonBack from "@/components/manga/ButtonBack";
import { BookmarkButton } from "@/components/manga/BookMarkButton";

export const dynamic = "force-dynamic";

export default async function ComicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await fetchMangaDetail(id);
  const mock = !detail && /^\d+$/.test(id) ? getMangaById(parseInt(id)) : undefined;

  if (!detail && !mock) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto py-24 text-center space-y-4">
          <h2 className="text-2xl font-black">Komik Tidak Ditemukan</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-450">
            Maaf, komik dengan slug atau ID `&quot;`{id}`&quot;` tidak ditemukan di database kami.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#ff6740] hover:underline"
          >
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>
        <footer className="bg-white dark:bg-neutral-950 py-6 border-t border-neutral-200 dark:border-neutral-850 text-center text-xs text-neutral-500">
          &copy; 2026 Kumimi.
        </footer>
      </div>
    );
  }

  const title = detail?.title ?? mock!.title;
  const coverUrl = detail?.coverUrl ?? mock!.coverUrl;
  const synopsis = detail?.synopsis ?? "";
  const genres = detail?.genres ?? (mock?.genre ? [mock.genre] : []);
  const type = detail?.type ?? "Manga";
  const status = detail?.status ?? "ongoing";
  const chapters = detail?.chapters ?? [];
  const author = detail?.author ?? mock?.author ?? "Tidak diketahui";

  const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
  const firstChapter = sortedChapters[0];
  const latestChapter = sortedChapters[sortedChapters.length - 1];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200">
      <Navbar />

      {/* Blurred background banner header */}
      <div className="relative w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 pt-10 pb-12 md:py-16">
        {/* Banner Graphic background */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 blur-3xl opacity-35 dark:opacity-45 pointer-events-none"
          style={{ backgroundImage: coverUrl ? `url("${coverUrl}")` : 'none' }}
        />

      
        {/* Dark/Light overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/70 to-neutral-50 dark:from-transparent dark:via-[#0f0f10]/80 dark:to-[#0f0f10]" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 z-10 flex flex-col md:flex-row gap-8 items-start md:items-end">
          <div className="flex flex-col gap-3">

          {/* Cover image card */}
          <ButtonBack />
          <div className="relative w-44 md:w-56 shrink-0 aspect-[3/4] overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800 self-center md:self-auto">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              getAbstractCover(mock?.id ?? 1, title, mock?.genre)
            )}
            
            {/* Small flag badge bottom-right */}
            <div className="absolute bottom-2.5 right-2.5 bg-white/95 dark:bg-neutral-900/95 px-1.5 py-0.5 rounded text-[10px] font-extrabold shadow-sm flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white select-none">
              {type === "Manga" && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://flagcdn.com/jp.svg" alt="jp" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                  <span>JP</span>
                </>
              )}
              {type === "Manhwa" && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://flagcdn.com/kr.svg" alt="kr" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                  <span>KR</span>
                </>
              )}
              {type === "Manhua" && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://flagcdn.com/cn.svg" alt="cn" className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                  <span>CN</span>
                </>
              )}
            </div>
            
            {/* Index Badge top-left */}
            <div className="absolute top-2.5 left-2.5 bg-[#ff6740] text-white font-black text-xs px-2.5 py-0.5 rounded shadow-sm">
              1
            </div>
          </div>
          </div>

          {/* Core Info details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-neutral-900 dark:text-white drop-shadow-xs">
              {title}
            </h1>
            
            <p className="text-sm md:text-base font-semibold text-neutral-600 dark:text-neutral-300 mt-2.5 leading-snug">
              {title} — Alternatif / Subtitle
            </p>

            <p className="text-xs md:text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-3">
              Karya: <span className="text-[#ff6740] font-extrabold">{author}</span>
            </p>

            {/* Quick Actions (Baca Chapter Pertama / Terbaru) */}
            {chapters.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href={`/comic/${id}/${firstChapter.slug}`}
                  className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all duration-150 hover:bg-neutral-800 dark:hover:bg-neutral-100 flex items-center justify-center gap-2 shadow-md cursor-pointer select-none"
                >
                  <BookOpen size={14} className="stroke-[2.5]" /> BACA CHAPTER PERTAMA
                </Link>
                <Link
                  href={`/comic/${id}/${latestChapter.slug}`}
                  className="px-5 py-2.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none"
                >
                  <Zap size={14} className="fill-[#ff6740] stroke-[#ff6740]" /> CHAPTER TERBARU ({chapters.length})
                </Link>
                <BookmarkButton
                  comicId={id}
                  slug={id}
                  title={title}
                  coverUrl={coverUrl}
                  type={type}
                  genre={genres[0]}
                />
              </div>
            )}

            {/* Horizontal Mini Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 text-[10px] font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 select-none">
              {genres.slice(0, 5).map(g => (
                <span key={g} className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800/60">
                  {g}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                PUBLICATION: {status === "completed" ? "TAMAT" : "ONGOING"}
              </span>
            </div>

            {/* Sementara aja non-aktif/gak ditampilin [bukan ai yg nulis] Rating */}
            {/* <div className="flex items-center gap-1 mt-3.5 text-xs font-bold text-neutral-600 dark:text-neutral-300">
              <Star size={14} className="fill-amber-400 stroke-amber-400" />
              <span>7.80</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content Layout container */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        
        {/* Synopsis Area */}
        <div className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl space-y-4">
          {synopsis ? (
            synopsis.split('\n').map((p, idx) => p && <p key={idx}>{p}</p>)
          ) : (
            <p>Manga ini menceritakan kisah yang menarik dan seru. Ikuti petualangan karakter utamanya di Kumimi!</p>
          )}
        </div>

        {/* Tab Controls Bar */}
        <div className="flex bg-neutral-200/50 dark:bg-neutral-900/50 p-1 rounded-lg w-fit mt-12 mb-6 select-none">
          <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-md font-extrabold text-xs uppercase tracking-wider">
            Chapters
          </button>
          <button className="px-4 py-2 text-neutral-500 dark:text-neutral-400 font-extrabold text-xs uppercase tracking-wider cursor-not-allowed">
            Rekomendasi
          </button>
        </div>

        {/* Details & Chapter Grid Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Sidebar details */}
          <div className="w-full md:w-60 shrink-0 space-y-6 bg-white dark:bg-[#151618] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs">
            
            <div>
              <h3 className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Penulis</h3>
              <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                {author}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Ilustrator</h3>
              <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                {author}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Genre</h3>
              <div className="flex flex-wrap gap-1.5">
                {genres.map(g => (
                  <span key={g} className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Tema</h3>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                  Reinkarnasi
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                  Monster
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                  Adaptasi
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">Demografis</h3>
              <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-semibold">
                Seinen
              </span>
            </div>
          </div>

          {/* Right Chapters component */}
          <DetailChapters chapters={chapters} comicId={id} />

        </div>
      </div>
    </div>
  );
}
