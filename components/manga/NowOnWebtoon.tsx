import Link from "next/link";

export function NowOnWebtoon() {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="font-bold text-[26px] text-neutral-900 dark:text-white">Now on WEBTOON</h2>
      </div>

      <Link
        href="/originals"
        className="block w-full h-[90px] rounded-lg overflow-hidden bg-gradient-to-r from-[#00d564] via-[#02b15c] to-[#00a651] hover:opacity-95 transition-opacity"
      >
        <div className="w-full h-full flex items-center justify-center gap-3 px-6">
          <span className="font-black text-white text-[28px] tracking-tight">
            WEBTOON
          </span>
          <span className="w-px h-8 bg-white/30" />
          <span className="font-bold text-white/90 text-[18px] tracking-tight">
            ORIGINALS
          </span>
          <span className="ml-auto text-white/80 text-[14px] font-bold">
            Jelajahi →
          </span>
        </div>
      </Link>
    </section>
  );
}