// components/TrackCTAs.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isInAppWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /FBAN|FBAV|FB_IAB|Instagram/i.test(ua);
}

export default function TrackCTAs() {
  const pathname = usePathname();

  useEffect(() => {
    if (isInAppWebView()) return; // ← no adjuntar listeners en IG/FB

    function onClick(e: MouseEvent) {
      try {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
        const href = anchor?.getAttribute?.("href") || "";
        const isLead =
          href.startsWith("/agendar") ||
          href.startsWith("/agenda") ||
          href.startsWith("/servicios");
        if (isLead) {
          // @ts-ignore
          window.gtag?.("event", "generate_lead", {
            method: "cta_click",
            cta_href: href,
            page: pathname,
          });
        }
      } catch {
        /* no-op */
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}