"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 👉 Tu Pixel ID de Meta
export const META_PIXEL_ID = "233510745";

// Helper para disparar eventos desde cualquier parte del sitio.
// Uso: import { fbq } from "@/components/MetaPixel"; fbq("track", "Purchase", {...})
export function fbq(...args: any[]) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(...args);
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Dispara PageView en cada cambio de ruta (Next.js es SPA, no recarga la página)
  useEffect(() => {
    fbq("track", "PageView");
  }, [pathname, searchParams]);

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}