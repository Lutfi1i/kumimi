import Link from "next/link";
import { fetchChapterPages } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

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
      <div className="sticky top-0 z-50 bg-cream border-b border-border">
        <div className="max-w-3xl mx-auto px-3 py-2 flex items-center justify-between">
          <Link
            href={`/comic/${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-ink-muted hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} /> {chapter}
          </Link>
          <Link
            href="/"
            className="font-display text-lg font-black text-gold tracking-tight"
          >
            Kumimi
          </Link>
        </div>
      </div>

      {/* Panels */}
      <main className="max-w-3xl mx-auto px-3 py-6 space-y-3">
        {pages ? (
          pages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`Page ${i + 1}`}
              className="w-full rounded-md bg-neutral-900"
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
