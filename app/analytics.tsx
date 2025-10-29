// app/analytics.tsx
"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function isInAppWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // navegadores embebidos de Meta
  return /FBAN|FBAV|FB_IAB|Instagram/i.test(ua);
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      if (!GA_ID || typeof window === "undefined" || !pathname) return;
      if (isInAppWebView()) return; // ← desactiva en IG/FB

      // @ts-ignore
      window.gtag?.("config", GA_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
      });

      if (pathname.startsWith("/blog/") && pathname.split("/").length >= 3) {
        const slug = pathname.split("/")[2];
        // @ts-ignore
        window.gtag?.("event", "blog_visit", {
          content_type: "blog_post",
          slug,
        });
      }
    } catch {
      // no-op: nunca rompas la UI por analytics
    }
  }, [pathname, searchParams]);

  if (!GA_ID || isInAppWebView()) return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          try {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          } catch (e) {}
        `}
      </Script>
    </>
  );
}