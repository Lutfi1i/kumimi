import type { Manga, RankedManga, RecentManga, MangaDetail, ChapterInfo } from "@/types/manga";

const API_BASE =
  process.env.NEXT_PUBLIC_KUMIMI_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

interface LiveTitle {
  title: string;
  url: string;
  coverUrl?: string;
}

function slugFromUrl(url?: string): string | undefined {
  const m = url?.match(/\/komik\/([^/]+)/);
  return m ? m[1] : undefined;
}

function toManga(t: LiveTitle, i: number): Manga {
  return {
    id: i + 1,
    title: t.title,
    chapter: 0,
    badge: null,
    coverUrl: t.coverUrl,
    genre: undefined,
    slug: slugFromUrl(t.url),
  };
}

export interface HomeData {
  popular: Manga[];
  latest: Manga[];
  recommended: Manga[];
  featured: Manga[];
  ranked: RankedManga[];
  recent: RecentManga[];
}

export async function fetchHomeData(): Promise<HomeData | null> {
  try {
    const pages = await Promise.all(
      [1, 2].map((p) =>
        fetch(`${API_BASE}/api/live/latest?page=${p}`, {
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        })
          .then((r) =>
            r.ok ? (r.json() as Promise<{ manga?: LiveTitle[] }>) : null,
          )
          .catch(() => null),
      ),
    );

    const list: Manga[] = pages.flatMap((p) => p?.manga ?? []).map(toManga);
    if (list.length === 0) return null;

    return {
      popular: list.slice(0, 21),
      latest: list.slice(0, 14),
      recommended: list.slice(7, 21),
      featured: list.slice(0, 3),
      ranked: list.slice(0, 8).map((m, i) => ({ ...m, rank: i + 1 })),
      recent: list.slice(0, 6).map((m) => ({ ...m, updatedAt: "Baru" })),
    };
  } catch {
    return null;
  }
}

export async function fetchMangaDetail(slug: string): Promise<MangaDetail | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/live/detail?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store", signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { status: boolean; manga?: any };
    const m = json.manga;
    if (!m) return null;

    const chapters: ChapterInfo[] = (m.chapters ?? []).map((c: any) => {
      const cm = c.chapterUrl?.match(/\/(chapter-[^/]+)/);
      return {
        chapterNumber: c.chapterNumber,
        chapterUrl: c.chapterUrl,
        title: c.title,
        slug: cm ? cm[1] : `chapter-${c.chapterNumber}`,
      };
    });

    return {
      title: m.title,
      coverUrl: m.coverUrl,
      synopsis: m.synopsis ?? "",
      genres: m.genres ?? [],
      status: m.status === "completed" ? "completed" : "ongoing",
      type: (m.type ?? "Manga") as MangaDetail["type"],
      slug,
      chapters,
    };
  } catch {
    return null;
  }
}

export async function fetchChapterPages(
  mangaSlug: string,
  chapterSlug: string,
): Promise<string[] | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/live/read?slug=${encodeURIComponent(chapterSlug)}&manga=${encodeURIComponent(mangaSlug)}`,
      { cache: "no-store", signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { status: boolean; pages?: string[] };
    return json.pages && json.pages.length > 0 ? json.pages : null;
  } catch {
    return null;
  }
}

export async function fetchGenreManga(slug: string): Promise<Manga[]> {
  try {
    const res = await fetch(
      `${API_BASE}/api/live/genre?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store", signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { manga?: LiveTitle[] };
    return (json.manga ?? []).map((t, i) => toManga(t, i));
  } catch {
    return [];
  }
}

export async function fetchSearchResults(q: string): Promise<Manga[]> {
  try {
    const res = await fetch(
      `${API_BASE}/api/live/search?q=${encodeURIComponent(q)}`,
      { cache: "no-store", signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { manga?: LiveTitle[] };
    return (json.manga ?? []).map((t, i) => toManga(t, i));
  } catch {
    return [];
  }
}
