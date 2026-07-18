import Link from "next/link";

const EXPLORE_LINKS = [
  { label: "Manga", href: "/genre/manga" },
  { label: "Manhwa", href: "/genre/manhwa" },
  { label: "Manhua", href: "/genre/manhua" },
  { label: "Rilisan Terbaru", href: "/latest" },
];

const INFO_LINKS = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Kontak", href: "/contact" },
  { label: "Kebijakan Privasi", href: "/privacy" },
  { label: "Syarat & Ketentuan", href: "/terms" },
];

const SOCIALS = [
  { label: "Discord", icon: "ti-brand-discord", href: "#" },
  { label: "Twitter", icon: "ti-brand-x", href: "#" },
  { label: "Instagram", icon: "ti-brand-instagram", href: "#" },
];

function MascotLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/kumimi-logo.svg" 
      alt="Logo" 
      className="w-7 h-7 object-contain transition-all duration-300 group-hover:scale-105" 
    />
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-ink border-t border-white/10 overflow-hidden">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff6740] via-gold to-[#ff6740]" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 select-none group">
            <MascotLogo />
            <span className="text-[24px] text-white font-bold tracking-tight leading-none group-hover:text-[#ff6740] transition-colors" style={{ fontFamily: "cursive" }}>
              Kumimi
            </span>
          </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[220px]">
              Tempat baca manga, manhwa, dan manhua favorit kamu. Update tiap hari, tanpa drama.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Jelajahi
            </h3>
            <ul className="flex flex-col gap-2">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Informasi
            </h3>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / disclaimer */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] text-white/30 leading-relaxed">
              Semua konten milik pemilik hak cipta masing-masing. Kumimi hanya menyediakan akses baca.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Kumimi. Dibuat pake perasaan{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}