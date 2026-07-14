import { ShimmerBox } from "@/components/ui/ShimmerBox";
import type { RankedManga, RecentManga } from "@/types/manga";
import { cn } from "@/lib/utils";
import { Star, Clock } from "lucide-react";
import Link from "next/link";

/* ── Sidebar Section Wrapper ── */
function SidebarSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3
        className={cn(
          "font-display text-base font-bold text-ink",
          "flex items-center gap-2 mb-3 pb-2",
          "border-b-2 border-gold-muted"
        )}
      >
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function getSmallAbstractCover(mangaId: number, title: string) {
  const gradients = [
    "from-indigo-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-amber-500 to-rose-600",
    "from-emerald-500 to-teal-700",
    "from-rose-500 via-red-600 to-orange-500",
    "from-blue-600 to-violet-600",
    "from-fuchsia-600 to-purple-800",
    "from-cyan-500 to-blue-600",
  ];
  const grad = gradients[mangaId % gradients.length];
  const initials = title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center relative overflow-hidden select-none", grad)}>
      <span className="text-[10px] font-black text-white/40 font-display">
        {initials}
      </span>
    </div>
  );
}

/* ── Ranking List ── */
interface RankingListProps {
  mangas: RankedManga[];
}

export function RankingList({ mangas }: RankingListProps) {
  return (
    <SidebarSection
      icon={<Star size={14} fill="#d4b870" stroke="none" />}
      title="Peringkat Teratas"
    >
      <ul className="flex flex-col gap-2">
        {mangas.map((manga) => (
          <li key={manga.id}>
            <Link
              href={`/comic/${manga.id}`}
              className={cn(
                "w-full flex items-center gap-3 p-2 rounded-lg text-left cursor-pointer",
                "transition-colors duration-150 hover:bg-card"
              )}
            >
              {/* Rank number */}
              <span
                className={cn(
                  "font-display text-lg font-black w-5 text-center shrink-0",
                  manga.rank <= 3 ? "text-gold" : "text-gold-muted"
                )}
              >
                {manga.rank}
              </span>

              {/* Cover */}
              <div className="w-10 h-14 rounded-md overflow-hidden shrink-0">
                {manga.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={manga.coverUrl}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getSmallAbstractCover(manga.id, manga.title)
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-[0.75rem] font-semibold text-ink truncate">
                  {manga.title}
                </p>
                <p className="text-[0.68rem] text-ink-muted mt-0.5">
                  Ch. {manga.chapter}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}

/* ── Recent Updates List ── */
interface RecentListProps {
  mangas: RecentManga[];
}

export function RecentList({ mangas }: RecentListProps) {
  return (
    <SidebarSection
      icon={<Clock size={14} stroke="#8b6914" />}
      title="Baru Diperbarui"
    >
      <ul className="flex flex-col gap-2">
        {mangas.map((manga) => (
          <li key={manga.id}>
            <Link
              href={`/comic/${manga.id}`}
              className={cn(
                "w-full flex items-center gap-3 p-2 rounded-lg text-left cursor-pointer",
                "transition-colors duration-150 hover:bg-card"
              )}
            >
              {/* Cover */}
              <div className="w-12 h-16 rounded-md overflow-hidden shrink-0">
                {manga.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={manga.coverUrl}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getSmallAbstractCover(manga.id, manga.title)
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-[0.78rem] font-semibold text-ink truncate">
                  {manga.title}
                </p>
                <p className="text-[0.72rem] text-gold font-semibold mt-0.5">
                  Chapter {manga.chapter}
                </p>
                <p className="text-[0.68rem] text-ink-muted mt-0.5">
                  {manga.updatedAt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarSection>
  );
}