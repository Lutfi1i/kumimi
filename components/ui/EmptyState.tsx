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
    <div className={cn("flex flex-col items-center justify-center p-8 md:py-16 text-center rounded-2xl border-2 border-dashed border-gold-muted/30 bg-card/30", className)}>
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
        <FileQuestion className="w-6 h-6 text-gold" />
      </div>
      <h3 className="font-display text-lg font-bold text-ink mb-1">{title}</h3>
      <p className="text-sm text-ink-muted">{description}</p>
    </div>
  );
}
