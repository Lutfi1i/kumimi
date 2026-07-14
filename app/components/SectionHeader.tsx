"use client";

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg md:text-xl font-bold text-white">
        {title}
      </h2>

      <button className="text-sm text-white/60 hover:text-white transition">
        Lihat Semua
      </button>
    </div>
  );
}