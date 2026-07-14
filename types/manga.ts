export type BadgeType = "new" | "hot" | "update" | null;

export interface Manga {
  id: number;
  title: string;
  chapter: number;
  badge: BadgeType;
  coverUrl?: string;
  genre?: string;
}

export interface RecentManga extends Manga {
  updatedAt: string;
}

export interface RankedManga extends Manga {
  rank: number;
}