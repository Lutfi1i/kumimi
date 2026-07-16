import { cache } from "react";
import type { Manga, RankedManga, RecentManga, MangaDetail, ChapterInfo } from "@/types/manga";

const API_BASE =
  process.env.NEXT_PUBLIC_KUMIMI_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

interface LiveTitle {
  title: string;
  url: string;
  coverUrl?: string;
  type?: "Manga" | "Manhwa" | "Manhua";
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
    type: t.type,
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

/**
 * Robust fetch helper with timeout that supports older Node.js/browsers
 * by falling back to AbortController if AbortSignal.timeout is not present.
 */
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 8000, ...fetchOptions } = options;

  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
    try {
      return await fetch(url, {
        ...fetchOptions,
        signal: AbortSignal.timeout(timeout),
      });
    } catch (err: any) {
      if (err.name === "TimeoutError" || err.message?.includes("timeout")) {
        throw new Error(`Fetch timed out after ${timeout}ms`);
      }
      throw err;
    }
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (err: any) {
    clearTimeout(id);
    if (err.name === "AbortError" || err.name === "TimeoutError") {
      throw new Error(`Fetch timed out after ${timeout}ms`);
    }
    throw err;
  }
}

export const fetchHomeData = cache(async (): Promise<HomeData | null> => {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/home`, {
      cache: "no-store",
      timeout: 8000,
    });

    if (res.ok) {
      const data = await res.json();
      
      const dbToManga = (m: any, index: number): Manga => ({
        id: m.id,
        title: m.title,
        chapter: m.latestChapterNumber ?? 0,
        badge: m.updatedWithin24h ? "update" : null,
        coverUrl: m.coverUrl || m.cover_url || undefined,
        genre: m.genres?.[0] || undefined,
        slug: String(m.id),
        author: m.author || undefined,
        views: m.views ? String(m.views) : undefined,
        type: m.type || undefined,
      });

      const popular: Manga[] = (data.popular ?? []).map((m: any, i: number) => dbToManga(m, i));
      const latest: Manga[] = (data.updated24h ?? []).map((m: any, i: number) => dbToManga(m, i));
      const recommended: Manga[] = (data.recommended ?? []).map((m: any, i: number) => dbToManga(m, i));
      const trending: Manga[] = (data.trending ?? []).map((m: any, i: number) => dbToManga(m, i));

      if (popular.length > 0) {
        return {
          popular,
          latest: latest.length > 0 ? latest : popular.slice(0, 14),
          recommended: recommended.length > 0 ? recommended : popular.slice(7, 21),
          featured: trending.slice(0, 3).length > 0 ? trending.slice(0, 3) : popular.slice(0, 3),
          ranked: popular.slice(0, 8).map((m, i) => ({ ...m, rank: i + 1 })),
          recent: trending.slice(0, 6).map((m) => ({ ...m, updatedAt: "Baru" })),
        };
      }
    }
  } catch (err) {
    console.error("fetchHomeData DB error, falling back to live scraper:", err);
  }

  try {
    const pages = await Promise.all(
      [1, 2].map((p) =>
        fetchWithTimeout(`${API_BASE}/api/live/latest?page=${p}`, {
          cache: "no-store",
          timeout: 8000,
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
});

export const fetchMangaDetail = cache(async (slug: string): Promise<MangaDetail | null> => {
  if (/^\d+$/.test(slug)) {
    try {
      const mangaRes = await fetchWithTimeout(`${API_BASE}/api/manga/${slug}`, {
        cache: "no-store",
        timeout: 8000,
      });
      if (mangaRes.ok) {
        const m = await mangaRes.json();
        
        const chaptersRes = await fetchWithTimeout(`${API_BASE}/api/manga/${slug}/chapters?order=desc`, {
          cache: "no-store",
          timeout: 8000,
        });
        
        let chapters: ChapterInfo[] = [];
        if (chaptersRes.ok) {
          const chList = await chaptersRes.json();
          chapters = chList.map((c: any) => ({
            chapterNumber: Number(c.chapter_number),
            chapterUrl: "",
            title: c.title,
            slug: String(c.chapter_number),
          }));
        }

        // Record a page view in a non-blocking way
        fetchWithTimeout(`${API_BASE}/api/manga/${slug}/view`, { method: "POST" }).catch(() => {});

        return {
          title: m.title,
          coverUrl: m.coverUrl || m.cover_url || undefined,
          synopsis: m.synopsis ?? "",
          genres: m.genres ?? [],
          status: m.status?.toLowerCase() === "completed" ? "completed" : "ongoing",
          type: (m.type ?? "Manga") as MangaDetail["type"],
          slug,
          chapters,
          author: m.author ?? undefined,
        };
      }
    } catch (err) {
      console.error("fetchMangaDetail DB error:", err);
    }
  }

  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/api/live/detail?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store", timeout: 10000 },
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
      author: m.author ?? undefined,
    };
  } catch {
    return null;
  }
});

export const fetchChapterPages = cache(async (
  mangaSlug: string,
  chapterSlug: string,
): Promise<string[] | null> => {
  if (/^\d+$/.test(mangaSlug)) {
    try {
      const match = chapterSlug.match(/chapter-([\d.]+)/) || chapterSlug.match(/^([\d.]+)$/);
      const chapterNumber = match ? match[1] : chapterSlug;
      
      const res = await fetchWithTimeout(
        `${API_BASE}/api/manga/${mangaSlug}/chapters/${chapterNumber}`,
        { cache: "no-store", timeout: 10000 },
      );
      if (res.ok) {
        const json = await res.json();
        if (json.pages && json.pages.length > 0) {
          return json.pages.map((p: any) => {
            const url = p.proxied_url || p.source_url;
            return url.startsWith("http") ? url : `${API_BASE}${url}`;
          });
        }
      }
    } catch (err) {
      console.error("fetchChapterPages DB error:", err);
    }
  }

  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/api/live/read?slug=${encodeURIComponent(chapterSlug)}&manga=${encodeURIComponent(mangaSlug)}`,
      { cache: "no-store", timeout: 10000 },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { status: boolean; pages?: string[] };
    return json.pages && json.pages.length > 0 ? json.pages : null;
  } catch {
    return null;
  }
});

export const fetchGenreManga = cache(async (slug: string, type?: string): Promise<Manga[]> => {
  try {
    const params = new URLSearchParams();
    if (slug && slug !== "all") {
      params.append("genre", slug);
    }
    if (type) {
      params.append("type", type);
    }

    const res = await fetchWithTimeout(`${API_BASE}/api/manga?${params.toString()}`, {
      cache: "no-store",
      timeout: 8000,
    });
    if (res.ok) {
      const json = await res.json();
      const list = json.data || [];
      if (list.length > 0) {
        return list.map((m: any, i: number) => ({
          id: m.id,
          title: m.title,
          chapter: 0,
          badge: null,
          coverUrl: m.coverUrl || m.cover_url || undefined,
          genre: m.genres?.[0] || undefined,
          slug: String(m.id),
          author: m.author || undefined,
          views: m.views ? String(m.views) : undefined,
          type: m.type || undefined,
        }));
      }
    }
  } catch (err) {
    console.error("fetchGenreManga DB error:", err);
  }

  try {
    const params = new URLSearchParams();
    if (slug) params.append("slug", slug);
    if (type) params.append("type", type);

    const res = await fetchWithTimeout(
      `${API_BASE}/api/live/genre?${params.toString()}`,
      { cache: "no-store", timeout: 8000 },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { manga?: LiveTitle[] };
    return (json.manga ?? []).map((t, i) => {
      const manga = toManga(t, i);
      if (!manga.genre && slug !== "all") {
        manga.genre = slug;
      }
      return manga;
    });
  } catch {
    return [];
  }
});

export const fetchSearchResults = cache(async (q: string): Promise<Manga[]> => {
  const dbPromise = fetchWithTimeout(`${API_BASE}/api/manga?search=${encodeURIComponent(q)}`, {
    cache: "no-store",
    timeout: 8000,
  })
    .then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        return (json.data || []).map((m: any) => ({
          id: m.id,
          title: m.title,
          chapter: 0,
          badge: null,
          coverUrl: m.coverUrl || m.cover_url || undefined,
          genre: m.genres?.[0] || undefined,
          slug: String(m.id),
          author: m.author || undefined,
          views: m.views ? String(m.views) : undefined,
          type: m.type || undefined,
          status: m.status || undefined,
          rating: m.rating ? Number(m.rating) : undefined,
        }));
      }
      return [];
    })
    .catch((err) => {
      console.error("fetchSearchResults DB error:", err);
      return [];
    });

  const livePromise = fetchWithTimeout(
    `${API_BASE}/api/live/search?q=${encodeURIComponent(q)}`,
    { cache: "no-store", timeout: 8000 }
  )
    .then(async (res) => {
      if (res.ok) {
        const json = (await res.json()) as { manga?: LiveTitle[] };
        return (json.manga ?? []).map((t, i) => toManga(t, i));
      }
      return [];
    })
    .catch((err) => {
      console.error("fetchSearchResults live error:", err);
      return [];
    });

  try {
    const [dbResults, liveResults] = await Promise.all([dbPromise, livePromise]);
    
    const seenTitles = new Set<string>();
    const merged: Manga[] = [];

    // Add DB results first (preferred)
    for (const m of dbResults) {
      const norm = m.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        merged.push(m);
      }
    }

    // Add Live results if they haven't been added yet
    for (const m of liveResults) {
      const norm = m.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        merged.push(m);
      }
    }

    return merged;
  } catch (err) {
    console.error("fetchSearchResults merge error:", err);
    return [];
  }
});
