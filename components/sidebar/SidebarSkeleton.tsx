import { ShimmerBox } from "@/components/ui/ShimmerBox";
import { cn } from "@/lib/utils";
import { Star, Clock } from "lucide-react";

export function SidebarListSkeleton({ title, icon, count = 6, variant = "ranking" }: { 
  title: string; 
  icon: React.ReactNode; 
  count?: number;
  variant?: "ranking" | "recent";
}) {
  return (
    <div className="mb-8">
      <h3
        className={cn(
          "font-display text-base font-bold text-ink",
          "flex items-center gap-2 mb-3 pb-2",
          "border-b-2 border-gold-muted"
        )}
      >
        {icon}
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="flex items-center gap-3 p-2">
            {variant === "ranking" && (
              <div className="w-5 shrink-0" />
            )}
            <div className={cn(
              "rounded-md overflow-hidden shrink-0",
              variant === "ranking" ? "w-10 h-14" : "w-12 h-16"
            )}>
              <ShimmerBox />
            </div>
            <div className="min-w-0 flex-1 flex flex-col gap-1.5">
              <div className="w-full h-3 rounded-sm overflow-hidden"><ShimmerBox /></div>
              <div className="w-2/3 h-2.5 rounded-sm overflow-hidden"><ShimmerBox /></div>
              {variant === "recent" && (
                <div className="w-1/2 h-2.5 rounded-sm overflow-hidden"><ShimmerBox /></div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <>
      <SidebarListSkeleton 
        title="Peringkat Teratas" 
        icon={<Star size={14} fill="#d4b870" stroke="none" />} 
        variant="ranking"
        count={8}
      />
      <SidebarListSkeleton 
        title="Baru Diperbarui" 
        icon={<Clock size={14} stroke="#8b6914" />} 
        variant="recent"
        count={6}
      />
    </>
  );
}
