export interface BookmarkEntry {
  comicId: string;
  slug: string;
  title: string;
  coverUrl?: string;
  type?: string;
  genre?: string;
  bookmarkedAt: number;
}

interface BookmarkStore {
  [comicId: string]: BookmarkEntry;
}

const STORAGE_KEY = "kumimi_bookmarks";
const EVENT_NAME = "kumimi_bookmarks_changed";

function getStore(): BookmarkStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStore(data: BookmarkStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore quota errors
  }
}

export function addBookmark(entry: Omit<BookmarkEntry, "bookmarkedAt">) {
  const store = getStore();
  store[entry.comicId] = { ...entry, bookmarkedAt: Date.now() };
  setStore(store);
}

export function removeBookmark(comicId: string) {
  const store = getStore();
  delete store[comicId];
  setStore(store);
}

export function toggleBookmark(entry: Omit<BookmarkEntry, "bookmarkedAt">): boolean {
  const store = getStore();
  if (store[entry.comicId]) {
    delete store[entry.comicId];
    setStore(store);
    return false;
  }
  store[entry.comicId] = { ...entry, bookmarkedAt: Date.now() };
  setStore(store);
  return true;
}

export function isBookmarked(comicId: string): boolean {
  const store = getStore();
  return Boolean(store[comicId]);
}

export function getAllBookmarks(): BookmarkEntry[] {
  const store = getStore();
  return Object.values(store).sort((a, b) => b.bookmarkedAt - a.bookmarkedAt);
}

export function clearAllBookmarks() {
  setStore({});
}

export function onBookmarksChanged(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}