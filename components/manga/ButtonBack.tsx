'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonBack(){
  const router = useRouter();

  const handleBack = (): void => {
    router.push("/");
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-xs font-bold text-[#ff6740] hover:underline"
    >
      <ArrowLeft size={14} />
      Kembali ke Beranda
    </button>
  );
}