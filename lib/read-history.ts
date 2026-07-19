export interface ReadHistoryEntry {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genres?: string[];
  lastChapterNumber: number;
  lastChapterSlug: string;
  lastPageNumber?: number;
  readAt: number;
  readSlugs: string[];
}

interface ReadHistoryStore {
  [comicId: string]: ReadHistoryEntry;
}

const STORAGE_KEY = "kumimi_read_history";

function getStore(): ReadHistoryStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStore(data: ReadHistoryStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function markChapterRead(params: {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genres?: string[];
  chapterNumber: number;
  chapterSlug: string;
  pageNumber?: number;
}) {
  const store = getStore();
  const existing = store[params.comicId];

  const readSlugs = existing ? [...existing.readSlugs] : [];
  if (!readSlugs.includes(params.chapterSlug)) {
    readSlugs.push(params.chapterSlug);
  }

  // Preserve page number if same chapter, or update to new
  const pageToStore = params.pageNumber ?? (existing?.lastChapterSlug === params.chapterSlug ? existing?.lastPageNumber : 1);

  store[params.comicId] = {
    comicId: params.comicId,
    slug: params.slug,
    title: params.title,
    coverUrl: params.coverUrl,
    type: params.type,
    genres: params.genres,
    lastChapterNumber: params.chapterNumber,
    lastChapterSlug: params.chapterSlug,
    lastPageNumber: pageToStore,
    readAt: Date.now(),
    readSlugs,
  };

  setStore(store);
}

export function isChapterRead(comicId: string, chapterSlug: string): boolean {
  const store = getStore();
  return store[comicId]?.readSlugs.includes(chapterSlug) ?? false;
}

export function getReadSlugs(comicId: string): string[] {
  const store = getStore();
  return store[comicId]?.readSlugs ?? [];
}

export function getAllReadHistory(): ReadHistoryEntry[] {
  const store = getStore();
  return Object.values(store).sort((a, b) => b.readAt - a.readAt);
}

export function removeFromHistory(comicId: string) {
  const store = getStore();
  delete store[comicId];
  setStore(store);
}

export function clearAllHistory() {
  setStore({});
}