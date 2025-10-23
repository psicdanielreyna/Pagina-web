// components/ui/Stars.tsx
import { Star } from "lucide-react";

export default function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="flex items-center" aria-label={`${v} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < v ? "fill-emerald-600 text-emerald-600" : "text-emerald-300"}`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{v} de 5</span>
    </div>
  );
}