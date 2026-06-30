"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

// 👉 Para desactivar la promo después de julio, cambia esto a false
const PROMO_ACTIVE = true;

export default function PromoBanner() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!PROMO_ACTIVE) return null;

  return (
    <div
      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-center"
      style={{ background: isDark ? "#1a1011" : "#1a1a1a" }}
    >
      <span className="hidden sm:inline text-sm" style={{ color: "#E8C88A" }} aria-hidden="true">
        ★
      </span>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
        <span className="text-xs sm:text-sm font-semibold tracking-wide" style={{ color: "#E8C88A" }}>
          Julio Regalado
        </span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          Sesiones online a $250 MXN · solo este mes · hasta agotar espacios
        </span>
      </div>
      <Link
        href="/servicios"
        className="hidden sm:inline-block rounded-full text-xs font-medium px-3.5 py-1.5 whitespace-nowrap transition-opacity hover:opacity-90"
        style={{ background: "#8B1A1A", color: "#E8C88A" }}
      >
        Agendar →
      </Link>
      <span className="hidden sm:inline text-sm" style={{ color: "#E8C88A" }} aria-hidden="true">
        ★
      </span>
    </div>
  );
}