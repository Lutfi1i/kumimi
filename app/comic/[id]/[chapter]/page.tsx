import Link from "next/link";
import { fetchChapterPages } from "@/lib/api";
import { ReaderNavbar } from "@/components/layout/ReaderNavbar";

export const dynamic = "force-dynamic";

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id, chapter } = await params;
  const pages = await fetchChapterPages(id, chapter);

  return (
    <div className="min-h-screen bg-ink text-white font-sans">
      {/* Reader header */}
      <ReaderNavbar id={id} chapter={chapter} />

      {/* Panels */}
      <main className="max-w-3xl mx-auto w-full flex flex-col items-center">
        {pages ? (
          pages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`Page ${i + 1}`}
              className="w-full rounded-none block bg-neutral-950 reader-page-img"
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
    </div>
  );
}
