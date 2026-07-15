import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({ 
  title = "Belum Ada Data", 
  description = "Konten saat ini tidak tersedia.", 
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 md:py-16 text-center rounded-lg border-2 border-dashed border-[#e0e0e0] bg-[#f9f9f9]", className)}>
      <div className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-4">
        <FileQuestion className="w-6 h-6 text-[#999]" />
      </div>
      <h3 className="text-lg font-bold text-black mb-1">{title}</h3>
      <p className="text-sm text-[#666]">{description}</p>
    </div>
  );
}
