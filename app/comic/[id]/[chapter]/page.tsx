import Link from "next/link";
import { fetchChapterPages, fetchMangaDetail, fetchGenreManga } from "@/lib/api";
import { ReaderNavbar } from "@/components/layout/ReaderNavbar";
import { ChapterNav } from "@/components/manga/ChapterNav";
import { RecommendedComics } from "@/components/manga/RecommendedComics";
import { MarkAsRead } from "@/components/manga/MarkAsRead";
import { MangaPanel } from "@/components/manga/MangaPanel";

export const dynamic = "force-dynamic";

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id, chapter } = await params;

  const [pages, detail] = await Promise.all([
    fetchChapterPages(id, chapter),
    fetchMangaDetail(id),
  ]);

  const chapters = detail?.chapters ?? [];
  const sorted = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
  const currentIndex = sorted.findIndex(
    (c) => c.slug === chapter || String(c.chapterNumber) === chapter
  );

  const prevChapter = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextChapter =
    currentIndex !== -1 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : null;

  const recommended = detail
    ? (await fetchGenreManga(detail.genres?.[0] ?? "all"))
      .filter((m) => m.slug !== id && String(m.id) !== id)
      .slice(0, 12)
    : [];

  return (
    <div className="min-h-screen bg-ink text-white font-sans">

      <MarkAsRead
        comicId={id}
        slug={detail?.slug ?? id}
        title={detail?.title ?? id}
        coverUrl={detail?.coverUrl}
        type={detail?.type}
        genres={detail?.genres}
        chapterNumber={sorted[currentIndex]?.chapterNumber ?? 0}
        chapterSlug={chapter}
      />
      {/* Reader header */}
      <ReaderNavbar id={id} chapter={chapter} />

      {/* Panels */}
      <main className="max-w-3xl mx-auto w-full flex flex-col items-center">
        {pages ? (
          pages.map((src, i) => (
            <MangaPanel
              key={i}
              src={src}
              alt={`Page ${i + 1}`}
              pageNumber={i + 1}
            />
          ))
        ) : (
          <div className="text-center py-24 text-white/70 space-y-3">
            <p className="text-sm">Chapter tidak dapat dimuat.</p>
            <Link
              href={`/comic/${id}`}
              className="text-gold underline inline-block text-xs font-bold"
            >
              Kembali ke detail
            </Link>
          </div>
        )}
      </main>

      <ChapterNav
        id={id}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        chapters={sorted}
        currentChapterSlug={chapter}
        title={detail?.title ?? id}
        coverUrl={detail?.coverUrl}
        type={detail?.type}
        genres={detail?.genres}
      />

      {/* Recommendations */}
      {recommended.length > 0 && (
        <RecommendedComics title="Rekomendasi Komik Lain" items={recommended} />
      )}
    </div>
  );
}