import { cn } from "@/lib/utils";
import type { BadgeType } from "@/types/manga";

const BADGE_CONFIG: Record<
  NonNullable<BadgeType>,
  { label: string; className: string }
> = {
  new: { label: "NEW", className: "bg-red-500" },
  hot: { label: "HOT", className: "bg-amber-600" },
  update: { label: "UP", className: "bg-emerald-700" },
};

interface MangaBadgeProps {
  type: BadgeType;
  className?: string;
}

export function MangaBadge({ type, className }: MangaBadgeProps) {
  if (!type) return null;
  const config = BADGE_CONFIG[type];
  return (
    <span
      className={cn(
        "absolute top-1.5 left-1.5 z-10",
        "text-[0.6rem] font-bold tracking-widest uppercase",
        "text-white px-1.5 py-0.5 rounded",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}