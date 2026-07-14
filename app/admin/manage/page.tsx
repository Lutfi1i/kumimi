"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Plus, 
  Search, 
  ArrowLeft,
  LayoutDashboard,
  Settings,
  Users,
  Edit,
  Trash2,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { getMockMangas } from "@/lib/mock-data";
import { Manga, BadgeType } from "@/types/manga";

export default function AdminManage() {
  const [mangas, setMangas] = useState<Manga[]>(() => getMockMangas(12));
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingManga, setEditingManga] = useState<Manga | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState(1);
  const [badge, setBadge] = useState<BadgeType>(null);

  const handleOpenAddModal = () => {
    setEditingManga(null);
    setTitle("");
    setChapter(1);
    setBadge(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (manga: Manga) => {
    setEditingManga(manga);
    setTitle(manga.title);
    setChapter(manga.chapter);
    setBadge(manga.badge);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingManga) {
      // Edit
      setMangas(prev => 
        prev.map(m => m.id === editingManga.id ? { ...m, title, chapter, badge } : m)
      );
    } else {
      // Add new
      const newManga: Manga = {
        id: mangas.length > 0 ? Math.max(...mangas.map(m => m.id)) + 1 : 1,
        title,
        chapter,
        badge
      };
      setMangas(prev => [newManga, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus komik ini?")) {
      setMangas(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMangas = mangas.filter(manga => 
    manga.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream/30 text-ink font-body">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 hover:bg-cream rounded-lg transition-colors text-ink-muted hover:text-gold" title="Kembali ke Dashboard">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-gold font-display font-black text-2xl tracking-tight">Kumimi</span>
              <span className="text-xs bg-gold/10 text-gold-dark px-2.5 py-0.5 rounded-full font-semibold">Admin Panel</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold leading-tight">Admin Kumimi</p>
            <p className="text-xs text-ink-muted">Super Admin</p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-white border border-border rounded-xl p-4 flex flex-col gap-1">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink-soft hover:bg-cream/50 hover:text-gold transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link 
              href="/admin/manage" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/10 text-gold-dark font-semibold transition-colors"
            >
              <BookOpen size={18} />
              Kelola Manga
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink-soft hover:bg-cream/50 hover:text-gold transition-colors"
            >
              <Users size={18} />
              Pengguna
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink-soft hover:bg-cream/50 hover:text-gold transition-colors"
            >
              <Settings size={18} />
              Pengaturan
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* Header Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-display text-ink flex items-center gap-2">
                <BookOpen className="text-gold" size={24} />
                Database Manga & Komik
              </h2>
              <p className="text-sm text-ink-muted">Kelola koleksi manga, chapter, dan kategori badge.</p>
            </div>
            
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-150 shadow-md shadow-gold/15 hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus size={16} /> Tambah Manga Baru
            </button>
          </div>

          {/* Search and Stats bar */}
          <div className="bg-white border border-border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul manga..."
                className="w-full bg-cream/20 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-gold transition-colors"
              />
            </div>
            
            <div className="flex gap-4 text-xs font-semibold text-ink-soft w-full md:w-auto justify-end">
              <span className="bg-cream px-3 py-1.5 rounded-lg border border-border">
                Total Item: <span className="text-gold">{mangas.length}</span>
              </span>
              <span className="bg-cream px-3 py-1.5 rounded-lg border border-border">
                Hot: <span className="text-rose-500">{mangas.filter(m => m.badge === 'hot').length}</span>
              </span>
              <span className="bg-cream px-3 py-1.5 rounded-lg border border-border">
                New: <span className="text-emerald-500">{mangas.filter(m => m.badge === 'new').length}</span>
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-cream/10 text-xs text-ink-muted font-bold uppercase">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">Judul Manga</th>
                    <th className="py-4 px-6 text-center">Chapter Terakhir</th>
                    <th className="py-4 px-6 text-center">Badge</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-sm">
                  {filteredMangas.length > 0 ? (
                    filteredMangas.map((manga) => (
                      <tr key={manga.id} className="hover:bg-cream/15 transition-colors group">
                        <td className="py-4 px-6 font-mono text-xs text-ink-muted">#MNG-{manga.id}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-ink hover:text-gold transition-colors block">
                            {manga.title}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center font-semibold">Ch. {manga.chapter}</td>
                        <td className="py-4 px-6 text-center">
                          {manga.badge ? (
                            <span className={`inline-block text-[0.65rem] font-bold uppercase px-2.5 py-0.5 rounded ${
                              manga.badge === 'hot' 
                                ? 'bg-rose-500/10 text-rose-600' 
                                : manga.badge === 'new'
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : 'bg-amber-500/10 text-amber-600'
                            }`}>
                              {manga.badge}
                            </span>
                          ) : (
                            <span className="text-xs text-ink-muted">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(manga)}
                              className="p-1.5 hover:bg-cream rounded-lg text-ink-soft hover:text-gold transition-colors cursor-pointer"
                              title="Edit Manga"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(manga.id)}
                              className="p-1.5 hover:bg-rose-500/10 rounded-lg text-ink-soft hover:text-rose-600 transition-colors cursor-pointer"
                              title="Hapus Manga"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-ink-muted">
                        Tidak ada manga ditemukan dengan pencarian "{search}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Edit/Add Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-cream/20 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg text-ink flex items-center gap-2">
                <Sparkles className="text-gold" size={18} />
                {editingManga ? "Edit Detail Manga" : "Tambah Manga Baru"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-gold p-1 hover:bg-cream rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider block">Judul Manga</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Jujutsu Kaisen"
                  className="w-full bg-cream/10 border border-border rounded-lg px-4 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider block">Chapter Terakhir</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={chapter}
                    onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
                    className="w-full bg-cream/10 border border-border rounded-lg px-4 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider block">Badge Status</label>
                  <select
                    value={badge || ""}
                    onChange={(e) => setBadge((e.target.value as BadgeType) || null)}
                    className="w-full bg-cream/10 border border-border rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Normal (Tanpa Badge)</option>
                    <option value="new">New</option>
                    <option value="hot">Hot</option>
                    <option value="update">Update</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-border text-sm font-semibold text-ink-soft hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-semibold rounded-lg transition-colors shadow-md shadow-gold/10 cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
