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
    <div className={cn(
      "flex flex-col items-center justify-center p-8 md:py-16 text-center rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151618] transition-colors duration-200", 
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 transition-colors">
        <FileQuestion className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-450">{description}</p>
    </div>
  );
}
