export interface GenreItem {
  label: string;
  slug: string;
}

// Kategori genre Kumimi. `slug` mengikuti struktur URL mangaku.guru (/genre/<slug>/)
// sehingga bisa langsung dipakai oleh endpoint backend /api/live/genre?slug=<slug>.
export const GENRES: GenreItem[] = [
  { label: "Semua", slug: "" },
  { label: "Action", slug: "action" },
  { label: "Romance", slug: "romance" },
  { label: "Fantasy", slug: "fantasy" },
  { label: "Slice of Life", slug: "slice-of-life" },
  { label: "Horror", slug: "horror" },
  { label: "Sci-Fi", slug: "sci-fi" },
  { label: "Comedy", slug: "comedy" },
  { label: "Sports", slug: "sports" },
  { label: "Mystery", slug: "mystery" },
];
