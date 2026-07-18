export interface GenreItem {
  label: string;
  slug: string;
}

// Kategori genre Kumimi. `slug` mengikuti struktur URL komiku.org (/genre/<slug>/)
// sehingga bisa langsung dipakai oleh endpoint backend /api/live/genre?slug=<slug>.
export const GENRES: GenreItem[] = [
  { label: "Semua", slug: "" },
  { label: "Action", slug: "action" },
  { label: "Romance", slug: "romance" },
  { label: "Fantasy", slug: "fantasy" },
  { label: "Slice of Life", slug: "slice-of-life" },
  { label: "Horror", slug: "horror" },
  { label: "Comedy", slug: "comedy" },
  { label: "Sports", slug: "sports" },
  { label: "Mystery", slug: "mystery" },
  { label: "Drama", slug: "drama" },
  { label: "Supernatural", slug: "supernatural" },
  { label: "Adventure", slug: "adventure" },
  { label: "Psychological", slug: "psychological" },
  { label: "Shoujo", slug: "shoujo" },
  { label: "Shounen", slug: "shounen" },
  { label: "Gyaru", slug: "gyaru" },
  { label: "Ecchi", slug: "ecchi" },
  { label: "Harem", slug: "harem" },
  { label: "Isekai", slug: "isekai" },
  { label: "Josei", slug: "josei" },
  { label: "Mature", slug: "mature" },
  { label: "Seinen", slug: "seinen" },
  { label: "Yuri", slug: "yuri" },
  { label: "Tragedy", slug: "tragedy" },
  { label: "Historical", slug: "historical" },
  { label: "Military", slug: "military" },
  { label: "Music", slug: "music" },
  { label: "School", slug: "school" },
  { label: "Super Power", slug: "super-power" },
  { label: "Webtoon", slug: "webtoon" }
];
