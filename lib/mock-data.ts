import type { Manga, RankedManga, RecentManga } from "@/types/manga";

const TITLES = [
  "War of the Zulefs", "Jujutsu Kaisen", "Blue Period", "Ghost Reaper Girl",
  "Punk Jam", "Dandadan", "WITCH RAI", "The Rain Falls Mercy",
  "Island Rock", "Samukaze Days", "Blue Box", "Kaoru's Magic World",
  "Under Easter", "Monster Hunter X", "Silent Chord", "Spiral Zone",
  "Crimson Tide", "Moon Palace", "Silver Cup Award", "Dragon Nest",
  "Kagura Hachi", "Mashle: Magic", "Alien Handshake", "Himari Tani",
  "Hope You're Happy", "Watashitachi Dayo", "Musunde A.Modern", "Tama of the Nation",
];

const BADGES = ["new", "hot", "update", null, null, "hot", "new", null, "update", null] as const;

export function getMockMangas(count: number, offset = 0): Manga[] {
  return Array.from({ length: count }, (_, i) => ({
    id: offset + i + 1,
    title: TITLES[(offset + i) % TITLES.length],
    chapter: Math.floor(Math.random() * 200) + 1,
    badge: BADGES[(offset + i) % BADGES.length],
    genre: GENRES[((offset + i) % (GENRES.length - 1)) + 1],
  }));
}

export function getRankedMangas(count = 8): RankedManga[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    title: TITLES[i % TITLES.length],
    chapter: Math.floor(Math.random() * 200) + 1,
    badge: null,
  }));
}

const RECENT_TIMES = [
  "2 menit lalu", "15 menit lalu", "1 jam lalu",
  "3 jam lalu", "Kemarin", "2 hari lalu",
];

export function getRecentMangas(count = 6): RecentManga[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 100,
    title: TITLES[(i + 3) % TITLES.length],
    chapter: Math.floor(Math.random() * 200) + 1,
    badge: null,
    updatedAt: RECENT_TIMES[i % RECENT_TIMES.length],
  }));
}

export const GENRES = [
  "Semua", "Action", "Romance", "Fantasy",
  "Slice of Life", "Horror", "Sci-Fi", "Comedy", "Sports", "Mystery",
];

export function getMangaById(id: number): Manga | undefined {
  const index = Math.abs(id - 1);
  const title = TITLES[index % TITLES.length];
  if (!title) return undefined;
  return {
    id,
    title,
    chapter: Math.floor((Math.sin(id) * 100) + 120) || 50, // Deterministic chapter count
    badge: BADGES[index % BADGES.length],
    genre: GENRES[(index % (GENRES.length - 1)) + 1],
  };
}