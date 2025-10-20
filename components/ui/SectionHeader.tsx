// components/ui/SectionHeader.tsx
import React from "react";

type Props = {
  title: string;
  eyebrow?: string;   // pequeño texto arriba (opcional)
  subtitle?: string;  // línea de apoyo (opcional)
  align?: "center" | "left";
};

export default function SectionHeader({
  title,
  eyebrow,
  subtitle,
  align = "center",
}: Props) {
  const base =
    "mx-auto max-w-4xl px-4 " + (align === "center" ? "text-center" : "text-left");

  return (
    <div className={base}>
      {eyebrow && (
        <div className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-emerald-700/80">
          {eyebrow}
        </div>
      )}

      <h2 className="text-[40px] font-extrabold leading-tight text-emerald-900 md:text-[48px]">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-2 max-w-3xl text-sm text-emerald-900/80 md:text-base">
          {subtitle}
        </p>
      )}

      {/* barrita elegante */}
      <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-emerald-800/80" />
    </div>
  );
}