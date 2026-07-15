import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { getAbstractCover } from "@/components/manga/MangaCard";
import { fetchMangaDetail } from "@/lib/api";
import { getMangaById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";

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
      <div className="min-h-screen bg-cream/20 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto py-24 text-center space-y-4">
          <h2 className="text-2xl font-black text-ink">Manga Tidak Ditemukan</h2>
          <p className="text-sm text-ink-muted">
            Maaf, manga dengan slug "{id}" tidak terdaftar di sistem kami.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:underline"
          >
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>
        <footer className="bg-white py-6 border-t border-border text-center text-xs text-ink-muted">
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

  return (
    <div className="min-h-screen bg-cream/20 text-ink font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-ink-muted hover:text-gold mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Beranda
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Cover */}
          <div className="w-40 sm:w-56 aspect-3/4 rounded-2xl overflow-hidden shadow-lg shadow-gold/10 shrink-0">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              getAbstractCover(mock?.id ?? 1, title, mock?.genre)
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl md:text-3xl font-black text-ink">
              {title}
            </h1>
            {/* Author */}
            <h1 className="font-display text-xl font-bold text-ink mt-4">Eichiro Oda</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/10 text-gold-dark">
                {type}
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-card text-ink-muted border border-border">
                {status === "completed" ? "Tamat" : "Ongoing"}
              </span>
            </div>
            {synopsis && (
              <p className="text-sm text-ink-soft leading-relaxed mt-4">{synopsis}</p>
            )}

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="text-[0.72rem] font-medium px-3 py-1 rounded-full border border-border text-ink-soft"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chapters */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            Daftar Chapter ({chapters.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {chapters.map((ch) => (
              <Link
                key={ch.slug}
                href={`/comic/${id}/${ch.slug}`}
                className="p-3 bg-cream/10 hover:bg-gold/15 border border-border hover:border-gold/30 rounded-xl transition-all duration-150 text-center"
              >
                <span className="font-bold text-xs text-ink block">
                  Ch. {ch.chapterNumber}
                </span>
                {ch.title && (
                  <span className="text-[10px] text-ink-muted mt-0.5 block truncate">
                    {ch.title}
                  </span>
                )}
              </Link>
            ))}
          </div>
          {chapters.length === 0 && (
            <p className="text-sm text-ink-muted">Belum ada chapter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
