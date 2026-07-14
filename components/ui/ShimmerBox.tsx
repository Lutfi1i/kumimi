import { cn } from "@/lib/utils";

interface ShimmerBoxProps {
  className?: string;
}

export function ShimmerBox({ className }: ShimmerBoxProps) {
  return (
    <div
      className={cn(
        "w-full h-full rounded-[inherit]",
        "bg-size-[600px_100%]",
        "animate-shimmer",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, #ede0c8 25%, #f7efde 50%, #ede0c8 75%)",
        backgroundSize: "600px 100%",
        animation: "shimmer 1.6s infinite linear",
      }}
    />
  );
}