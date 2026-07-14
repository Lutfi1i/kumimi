"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Eye, 
  TrendingUp, 
  Plus, 
  Search, 
  Settings, 
  ArrowLeft,
  Bell,
  Clock,
  ChevronRight
} from "lucide-react";
import { getMockMangas } from "@/lib/mock-data";

export default function AdminDashboard() {
  const [mangas] = useState(() => getMockMangas(6));

  const stats = [
    { label: "Total Manga", value: "1,248", change: "+12% minggu ini", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Pembaca", value: "84,520", change: "+8% minggu ini", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Total Views", value: "1.2M", change: "+24% minggu ini", icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Rasio Konversi", value: "4.8%", change: "+1.2% minggu ini", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="min-h-screen bg-cream/30 text-ink font-body">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-cream rounded-lg transition-colors text-ink-muted hover:text-gold" title="Kembali ke Beranda">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-gold font-display font-black text-2xl tracking-tight">Kumimi</span>
              <span className="text-xs bg-gold/10 text-gold-dark px-2.5 py-0.5 rounded-full font-semibold">Admin Panel</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-cream rounded-full transition-colors text-ink-muted hover:text-gold">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          <div className="h-8 w-px bg-border"></div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold leading-tight">Admin Kumimi</p>
              <p className="text-xs text-ink-muted">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-white border border-border rounded-xl p-4 flex flex-col gap-1">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/10 text-gold-dark font-semibold transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link 
              href="/admin/manage" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink-soft hover:bg-cream/50 hover:text-gold transition-colors"
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

          <div className="bg-gradient-to-br from-gold/10 to-gold-muted/5 border border-gold/20 rounded-xl p-5 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-sm text-gold-dark mb-1">Perlu bantuan?</h4>
              <p className="text-xs text-ink-muted mb-3 leading-relaxed">Lihat dokumentasi API atau hubungi developer pendukung.</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline">
                Buka Panduan <ChevronRight size={12} />
              </a>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-[0.05] text-gold pointer-events-none">
              <Settings size={120} />
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-display font-black text-ink mb-2">
                Selamat Datang Kembali, <span className="text-gold">Admin</span>!
              </h2>
              <p className="text-ink-muted text-sm leading-relaxed mb-6">
                Ini adalah dashboard utama untuk mengelola konten komik, melacak performa pembaca, serta memperbarui judul-judul terbaru di Kumimi.
              </p>
              <Link
                href="/admin/manage"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 shadow-md shadow-gold/15 hover:-translate-y-0.5"
              >
                <Plus size={16} /> Kelola Database Manga
              </Link>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-gold/20 to-transparent rounded-full filter blur-2xl pointer-events-none"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white border border-border rounded-xl p-5 hover:border-gold/30 hover:shadow-md hover:shadow-gold/5 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">{stat.label}</span>
                    <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-ink mb-1">{stat.value}</h3>
                  <span className="text-xs text-emerald-600 font-semibold">{stat.change}</span>
                </div>
              );
            })}
          </div>

          {/* Table & Updates */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Manga Table */}
            <div className="bg-white border border-border rounded-2xl p-6 xl:col-span-2 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-ink">Update Komik Terbaru</h3>
                  <p className="text-xs text-ink-muted">Manga yang baru saja diperbarui atau ditambahkan.</p>
                </div>
                <Link href="/admin/manage" className="text-xs font-semibold text-gold hover:underline flex items-center gap-1">
                  Lihat Semua <ChevronRight size={14} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs text-ink-muted font-bold uppercase">
                      <th className="pb-3 pl-2">ID</th>
                      <th className="pb-3">Judul Manga</th>
                      <th className="pb-3 text-center">Chapter</th>
                      <th className="pb-3 text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-sm">
                    {mangas.map((manga) => (
                      <tr key={manga.id} className="hover:bg-cream/20 transition-colors">
                        <td className="py-3.5 pl-2 font-mono text-xs text-ink-muted">#MNG-{manga.id}</td>
                        <td className="py-3.5 font-bold text-ink hover:text-gold transition-colors">
                          <Link href="#">{manga.title}</Link>
                        </td>
                        <td className="py-3.5 text-center font-semibold">Ch. {manga.chapter}</td>
                        <td className="py-3.5 text-right pr-2">
                          {manga.badge ? (
                            <span className={`inline-block text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded ${
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admin Logs / Activities */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-ink mb-1">Aktivitas Sistem</h3>
                <p className="text-xs text-ink-muted mb-6">Log aksi administrasi terakhir di website.</p>

                <div className="space-y-4">
                  {[
                    { action: "Menambahkan chapter baru", target: "Dandadan Ch. 154", time: "5 menit lalu", type: "add" },
                    { action: "Mengubah metadata komik", target: "Jujutsu Kaisen", time: "1 jam lalu", type: "edit" },
                    { action: "Menghapus entri manga duplikat", target: "Silver Cup Award", time: "4 jam lalu", type: "delete" },
                    { action: "Pembaruan hak akses user", target: "lutfi1i (Moderator)", time: "1 hari lalu", type: "auth" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-3 items-start text-xs">
                      <div className="p-1.5 bg-cream rounded-lg mt-0.5 shrink-0">
                        <Clock size={14} className="text-gold" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-ink font-semibold leading-tight">{log.action}</p>
                        <p className="text-gold-dark font-medium mt-0.5 truncate">{log.target}</p>
                        <span className="text-[10px] text-ink-muted">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-ink-muted">
                <span>Versi CMS v1.4.2</span>
                <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  Sistem Aktif
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
