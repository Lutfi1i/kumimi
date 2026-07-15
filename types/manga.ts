export type BadgeType = "new" | "hot" | "update" | null;

export interface Manga {
  id: number;
  title: string;
  chapter: number;
  badge: BadgeType;
  coverUrl?: string;
  genre?: string;
  slug?: string;
  author?: string;
  views?: string;
  type?: "Manga" | "Manhwa" | "Manhua";
  status?: string;
  rating?: number;
}

export interface RecentManga extends Manga {
  updatedAt: string;
}

export interface RankedManga extends Manga {
  rank: number;
}

export interface ChapterInfo {
  chapterNumber: number;
  chapterUrl: string;
  title: string | null;
  slug: string;
}

export interface MangaDetail {
  title: string;
  coverUrl?: string;
  synopsis: string;
  genres: string[];
  status: "ongoing" | "completed";
  type: "Manga" | "Manhwa" | "Manhua";
  slug: string;
  chapters: ChapterInfo[];
  author?: string;
}
