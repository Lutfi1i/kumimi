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
  const m = url?.match(/\/(?:komik|manga)\/([^/]+)/);
  return m ? m[1] : undefined;
}

function getSlug(m: any): string {
  if (!m.title) return String(m.id);
  return m.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 8000, ...fetchOptions } = options;

  // Add API authorization token for backend API endpoints
  const headers = new Headers(fetchOptions.headers || {});
  if (url.startsWith(API_BASE) || url.startsWith('/api')) {
    headers.set('Authorization', `Bearer ${process.env.KUMIMI_API_KEY || 'MiguelNiger1223'}`);
  }
  fetchOptions.headers = headers;

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
        slug: getSlug(m),
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
    const [rekomendasiRes, popularRes, latestRes] = await Promise.all([
      fetchWithTimeout(`${API_BASE}/api/live/rekomendasi`, { cache: "no-store", timeout: 8000 }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetchWithTimeout(`${API_BASE}/api/live/popular`, { cache: "no-store", timeout: 8000 }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetchWithTimeout(`${API_BASE}/api/live/latest?page=1&limit=20`, { cache: "no-store", timeout: 8000 }).then(r => r.ok ? r.json() : null).catch(() => null),
    ]);

    const liveToManga = (m: any): Manga => ({
      id: 0,
      title: m.title || "Untitled",
      chapter: m.latestChapter ? Number((m.latestChapter.match(/\d+/) || ["0"])[0]) : 0,
      badge: null,
      coverUrl: m.coverUrl || undefined,
      genre: undefined,
      slug: m.slug || "",
      author: undefined,
      views: undefined,
      type: m.type || undefined,
    });

    const popularList: Manga[] = (popularRes?.data ?? []).map(liveToManga);
    const recommendedList: Manga[] = (rekomendasiRes?.data ?? []).map(liveToManga);
    const latestRaw = latestRes?.manga || latestRes?.data || [];
    const latestList: Manga[] = latestRaw.map(liveToManga);

    if (popularList.length === 0 && recommendedList.length === 0 && latestList.length === 0) {
      const types = ['manga', 'manhwa', 'manhua'];
      const allResults = await Promise.all(
        types.flatMap((type) =>
          [1].map((p) =>
            fetchWithTimeout(`${API_BASE}/api/live/latest?source=komiku&type=${type}&page=${p}&limit=20`, {
              cache: "no-store",
              timeout: 8000,
            })
              .then((r) => r.ok ? (r.json() as Promise<{ manga?: LiveTitle[] }>) : null)
              .catch(() => null)
          )
        )
      );
      const list: Manga[] = allResults.flatMap((p) => p?.manga ?? []).map(toManga);
      if (list.length === 0) return null;
      return {
        popular: list.slice(0, 21),
        latest: list.slice(0, 14),
        recommended: list.slice(7, 21),
        featured: list.slice(0, 3),
        ranked: list.slice(0, 8).map((m, i) => ({ ...m, rank: i + 1 })),
        recent: list.slice(0, 6).map((m) => ({ ...m, updatedAt: "Baru" })),
      };
    }

    const finalPopular = popularList.length > 0 ? popularList : latestList.slice(0, 21);
    const finalRecommended = recommendedList.length > 0 ? recommendedList : finalPopular.slice(7, 21);
    const finalLatest = latestList.length > 0 ? latestList : finalPopular.slice(0, 14);

    return {
      popular: finalPopular.slice(0, 21),
      latest: finalLatest.slice(0, 14),
      recommended: finalRecommended.slice(0, 14),
      featured: finalRecommended.slice(0, 3),
      ranked: finalPopular.slice(0, 8).map((m, i) => ({ ...m, rank: i + 1 })),
      recent: finalLatest.slice(0, 6).map((m) => ({ ...m, updatedAt: "Baru" })),
    };
  } catch {
    return null;
  }
});

export const fetchMangaDetail = cache(async (slug: string, originalSlug?: string): Promise<MangaDetail | null> => {
  if (!/^\d+$/.test(slug)) {
    try {
      const searchTerm = slug.replace(/-/g, " ");
      const searchRes = await fetchWithTimeout(
        `${API_BASE}/api/manga?search=${encodeURIComponent(searchTerm)}`,
        { cache: "no-store", timeout: 8000 }
      );
      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        const results: any[] = searchJson.data || [];
        const matchedManga = results.find((m) => getSlug(m) === slug);
        if (matchedManga) {
          return fetchMangaDetail(String(matchedManga.id), slug);
        }
      }
    } catch (err) {
      console.error("fetchMangaDetail slug search error:", err);
    }
  }

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

        fetchWithTimeout(`${API_BASE}/api/manga/${slug}/view`, { method: "POST" }).catch(() => {});

        if (chapters.length > 0) {
          return {
            title: m.title,
            coverUrl: m.coverUrl || m.cover_url || undefined,
            synopsis: m.synopsis ?? "",
            genres: m.genres ?? [],
            status: m.status?.toLowerCase() === "completed" ? "completed" : "ongoing",
            type: (m.type ?? "Manga") as MangaDetail["type"],
            slug: originalSlug || slug,
            chapters,
            author: m.author ?? undefined,
          };
        }
      }
    } catch (err) {
      console.error("fetchMangaDetail DB error:", err);
    }
  }

  try {
    const liveSlug = originalSlug || slug;
    const res = await fetchWithTimeout(
      `${API_BASE}/api/live/detail?slug=${encodeURIComponent(liveSlug)}`,
      { cache: "no-store", timeout: 10000 },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { status: boolean; manga?: any };
    const m = json.manga;
    if (!m) return null;

    const chapters: ChapterInfo[] = (m.chapters ?? []).map((c: any) => {
      let slug = `chapter-${c.chapterNumber}`;
      if (c.chapterUrl) {
        const cleaned = c.chapterUrl.replace(/\/$/, "");
        const parts = cleaned.split("/");
        slug = parts[parts.length - 1] || slug;
      }
      return {
        chapterNumber: c.chapterNumber,
        chapterUrl: c.chapterUrl,
        title: c.title,
        slug,
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
  originalSlug?: string
): Promise<string[] | null> => {
  if (!/^\d+$/.test(mangaSlug)) {
    try {
      const searchTerm = mangaSlug.replace(/-/g, " ");
      const searchRes = await fetchWithTimeout(
        `${API_BASE}/api/manga?search=${encodeURIComponent(searchTerm)}`,
        { cache: "no-store", timeout: 8000 }
      );
      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        const results: any[] = searchJson.data || [];
        const matchedManga = results.find((m) => getSlug(m) === mangaSlug);
        if (matchedManga) {
          return fetchChapterPages(String(matchedManga.id), chapterSlug, mangaSlug);
        }
      }
    } catch (err) {
      console.error("fetchChapterPages slug search error:", err);
    }
  }

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
    const liveManga = originalSlug || mangaSlug;
    const res = await fetchWithTimeout(
      `${API_BASE}/api/live/read?slug=${encodeURIComponent(chapterSlug)}&manga=${encodeURIComponent(liveManga)}`,
      { cache: "no-store", timeout: 10000 },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { status: boolean; pages?: any[] };
    if (!json.pages || json.pages.length === 0) return null;
    return json.pages.map((p: any) => {
      if (typeof p === "object" && p.image_url) {
        return p.image_url;
      }
      return p;
    });
  } catch {
    return null;
  }
});

export const fetchGenreMangaPaged = cache(async (
  slug: string,
  type?: string,
  page = 1,
  limit = 21
): Promise<{ data: Manga[]; total: number; totalPages: number }> => {
  let dbTotal = 0;
  
  // Query DB and Live Scraper in parallel for hybrid list
  const dbPromise = (async () => {
    try {
      const params = new URLSearchParams();
      if (slug && slug !== "all") params.append("genre", slug);
      if (type) params.append("type", type);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const res = await fetchWithTimeout(`${API_BASE}/api/manga?${params.toString()}`, {
        cache: "no-store",
        timeout: 6000,
      });
      if (res.ok) {
        const json = await res.json();
        dbTotal = json.pagination?.total ?? 0;
        const list = json.data || [];
        return list.map((m: any) => ({
          id: m.id,
          title: m.title,
          chapter: 0,
          badge: null,
          coverUrl: m.coverUrl || m.cover_url || undefined,
          genre: m.genres?.[0] || undefined,
          slug: getSlug(m),
          author: m.author || undefined,
          views: m.views ? String(m.views) : undefined,
          type: m.type || undefined,
        })) as Manga[];
      }
    } catch (err) {
      console.error("fetchGenreMangaPaged DB error:", err);
    }
    return [] as Manga[];
  })();

  const livePromise = (async () => {
    try {
      const params = new URLSearchParams();
      if (slug) params.append("slug", slug);
      if (type) params.append("type", type);
      params.append("page", page.toString());

      const res = await fetchWithTimeout(
        `${API_BASE}/api/live/genre?${params.toString()}`,
        { cache: "no-store", timeout: 8000 }
      );
      if (res.ok) {
        const json = (await res.json()) as { manga?: LiveTitle[] };
        return (json.manga ?? []).map((t, i) => {
          const manga = toManga(t, i);
          if (!manga.genre && slug !== "all") manga.genre = slug;
          if (type && ['Manga', 'Manhwa', 'Manhua'].includes(type)) manga.type = type as any;
          return manga;
        });
      }
    } catch (err) {
      console.error("fetchGenreMangaPaged Live error:", err);
    }
    return [] as Manga[];
  })();

  try {
    const [dbData, liveData] = await Promise.all([dbPromise, livePromise]);

    // Merge: DB items on top, then append Live items while removing duplicates by title
    const seenTitles = new Set<string>();
    const merged: Manga[] = [];

    const addManga = (m: Manga) => {
      const norm = m.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        merged.push(m);
      }
    };

    dbData.forEach(addManga);
    liveData.forEach(addManga);

    // If we have actual DB total, use it. Otherwise fallback to estimated count from live scraper
    const hasNext = liveData.length >= 20 || dbData.length >= limit;
    const finalTotal = dbTotal > 0 ? dbTotal : (hasNext ? (page + 1) * limit : merged.length);
    const finalTotalPages = dbTotal > 0 ? Math.ceil(dbTotal / limit) : (hasNext ? page + 10 : page);
    
    return {
      data: merged,
      total: finalTotal,
      totalPages: finalTotalPages,
    };
  } catch {
    return { data: [], total: 0, totalPages: 1 };
  }
});

export const fetchGenreManga = cache(async (slug: string, type?: string): Promise<Manga[]> => {
  const dbPromise = (async () => {
    try {
      const params = new URLSearchParams();
      if (slug && slug !== "all") params.append("genre", slug);
      if (type) params.append("type", type);

      const res = await fetchWithTimeout(`${API_BASE}/api/manga?${params.toString()}`, {
        cache: "no-store",
        timeout: 6000,
      });
      if (res.ok) {
        const json = await res.json();
        const list = json.data || [];
        return list.map((m: any) => ({
          id: m.id,
          title: m.title,
          chapter: 0,
          badge: null,
          coverUrl: m.coverUrl || m.cover_url || undefined,
          genre: m.genres?.[0] || undefined,
          slug: getSlug(m),
          author: m.author || undefined,
          views: m.views ? String(m.views) : undefined,
          type: m.type || undefined,
        })) as Manga[];
      }
    } catch (err) {
      console.error("fetchGenreManga DB error:", err);
    }
    return [] as Manga[];
  })();

  const livePromise = (async () => {
    try {
      const params = new URLSearchParams();
      if (slug) params.append("slug", slug);
      if (type) params.append("type", type);

      const res = await fetchWithTimeout(
        `${API_BASE}/api/live/genre?${params.toString()}`,
        { cache: "no-store", timeout: 8000 }
      );
      if (res.ok) {
        const json = (await res.json()) as { manga?: LiveTitle[] };
        return (json.manga ?? []).map((t, i) => {
          const manga = toManga(t, i);
          if (!manga.genre && slug !== "all") manga.genre = slug;
          if (type && ['Manga', 'Manhwa', 'Manhua'].includes(type)) manga.type = type as any;
          return manga;
        });
      }
    } catch (err) {
      console.error("fetchGenreManga Live error:", err);
    }
    return [] as Manga[];
  })();

  try {
    const [dbData, liveData] = await Promise.all([dbPromise, livePromise]);
    const seenTitles = new Set<string>();
    const merged: Manga[] = [];

    const addManga = (m: Manga) => {
      const norm = m.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        merged.push(m);
      }
    };

    dbData.forEach(addManga);
    liveData.forEach(addManga);

    return merged;
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
          slug: getSlug(m),
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

    for (const m of dbResults) {
      const norm = m.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        merged.push(m);
      }
    }

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
