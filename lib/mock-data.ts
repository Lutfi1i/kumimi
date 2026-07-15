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

const AUTHORS = [
  "Gege Akutami", "Tsuguhito Yuki", "Tatsuki Fujimoto", "Akane Shimizu",
  "Kuroe Karasuki", "Yukinobu Tatsu", "Yoh Yoshinari", "Ken Akamatsu",
  "Junji Ito", "Ryoji Minagawa", "Takeshi Obata", "Yuu Iseki",
  "Satsuki Yoshino", "Shunsuke Saijou", "Risa Goto", "Yumi Unita",
];

const BADGES = ["new", "hot", "update", null, null, "hot", "new", null, "update", null] as const;

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop", // anime art
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop", // illustration
  "https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=300&auto=format&fit=crop", // manga look
  "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=300&auto=format&fit=crop", // art
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300&auto=format&fit=crop", // book
  "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=300&auto=format&fit=crop", // design
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop", // magical
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop", // fantasy
];

export function getMockMangas(count: number, offset = 0): Manga[] {
  const TYPES = ["Manga", "Manhwa", "Manhua"] as const;
  return Array.from({ length: count }, (_, i) => {
    const views = Math.floor(Math.random() * 900) + 10;
    const viewsText = views > 100 ? `${(views / 100).toFixed(1)}k` : views.toString();
    return {
      id: offset + i + 1,
      title: TITLES[(offset + i) % TITLES.length],
      chapter: Math.floor(Math.random() * 200) + 1,
      badge: BADGES[(offset + i) % BADGES.length],
      genre: GENRES[((offset + i) % (GENRES.length - 1)) + 1],
      author: AUTHORS[(offset + i) % AUTHORS.length],
      views: `${viewsText}`,
      type: TYPES[(offset + i) % TYPES.length],
      coverUrl: COVER_IMAGES[(offset + i) % COVER_IMAGES.length],
    };
  });
}

export function getRankedMangas(count = 8): RankedManga[] {
  return Array.from({ length: count }, (_, i) => {
    const views = Math.floor(Math.random() * 900) + 10;
    const viewsText = views > 100 ? `${(views / 100).toFixed(1)}k` : views.toString();
    return {
      id: i + 1,
      rank: i + 1,
      title: TITLES[i % TITLES.length],
      chapter: Math.floor(Math.random() * 200) + 1,
      badge: null,
      author: AUTHORS[i % AUTHORS.length],
      views: `${viewsText}`,
      coverUrl: COVER_IMAGES[i % COVER_IMAGES.length],
    };
  });
}

const RECENT_TIMES = [
  "2 menit lalu", "15 menit lalu", "1 jam lalu",
  "3 jam lalu", "Kemarin", "2 hari lalu",
];

export function getRecentMangas(count = 6): RecentManga[] {
  return Array.from({ length: count }, (_, i) => {
    const views = Math.floor(Math.random() * 900) + 10;
    const viewsText = views > 100 ? `${(views / 100).toFixed(1)}k` : views.toString();
    return {
      id: i + 100,
      title: TITLES[(i + 3) % TITLES.length],
      chapter: Math.floor(Math.random() * 200) + 1,
      badge: null,
      updatedAt: RECENT_TIMES[i % RECENT_TIMES.length],
      author: AUTHORS[(i + 3) % AUTHORS.length],
      views: `${viewsText}`,
      coverUrl: COVER_IMAGES[(i + 3) % COVER_IMAGES.length],
    };
  });
}

export const GENRES = [
  "Semua", "Action", "Romance", "Fantasy",
  "Slice of Life", "Horror", "Sci-Fi", "Comedy", "Sports", "Mystery",
];

export function getMangaById(id: number): Manga | undefined {
  const TYPES = ["Manga", "Manhwa", "Manhua"] as const;
  const index = Math.abs(id - 1);
  const title = TITLES[index % TITLES.length];
  if (!title) return undefined;
  const views = Math.floor(Math.random() * 900) + 10;
  const viewsText = views > 100 ? `${(views / 100).toFixed(1)}k` : views.toString();
  return {
    id,
    title,
    chapter: Math.floor((Math.sin(id) * 100) + 120) || 50, // Deterministic chapter count
    badge: BADGES[index % BADGES.length],
    genre: GENRES[(index % (GENRES.length - 1)) + 1],
    author: AUTHORS[index % AUTHORS.length],
    views: `${viewsText}`,
    type: TYPES[index % TYPES.length],
    coverUrl: COVER_IMAGES[index % COVER_IMAGES.length],
  };
}