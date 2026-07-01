"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

// 👉 Para desactivar la promo después de julio, cambia esto a false.
//    La barra seguirá apareciendo pero con el CTA normal sin precio.
//    Si quieres quitar la barra por completo, cambia BAR_ACTIVE a false.
const PROMO_ACTIVE = true;
const BAR_ACTIVE = true;

// Rutas donde NO debe aparecer la barra (ya tienen su propio CTA o son flujos de pago)
const EXCLUDED_PATHS = ["/agenda", "/gracias", "/checkout"];

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => {
      // Aparece después de pasar el hero (~600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!BAR_ACTIVE) return null;
  if (EXCLUDED_PATHS.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        background: isDark ? "rgba(15,15,26,0.97)" : "rgba(248,245,240,0.97)",
        borderTop: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        backdropFilter: "blur(8px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        {PROMO_ACTIVE ? (
          <>
            <div className="flex flex-col leading-tight shrink-0">
              <span className="text-sm font-semibold" style={{ color: isDark ? "#E8C88A" : "#8B1A1A" }}>
                $250 MXN
              </span>
              <span className="text-[11px]" style={{ color: isDark ? "#94a3b8" : "#999" }}>
                por sesión · julio
              </span>
            </div>
            <Link
              href="/servicios"
              className="flex-1 rounded-full text-sm font-medium text-center py-2.5 transition-opacity active:opacity-80"
              style={{ background: "#8B1A1A", color: "#E8C88A" }}
            >
              Agendar sesión →
            </Link>
          </>
        ) : (
          <Link
            href="/servicios"
            className="flex-1 rounded-full text-sm font-medium text-center py-2.5 transition-opacity active:opacity-80"
            style={{
              background: isDark ? "#E2E8F0" : "#1a1a1a",
              color: isDark ? "#0f0f1a" : "#ffffff",
            }}
          >
            Agendar sesión →
          </Link>
        )}
      </div>
    </div>
  );
}