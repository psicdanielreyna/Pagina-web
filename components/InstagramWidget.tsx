"use client";

import Script from "next/script";

export default function InstagramWidget() {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm">
      {/* Carga del script del widget */}
      <Script
        src="https://cdn.lightwidget.com/widgets/lightwidget.js"
        strategy="lazyOnload"
      />
      {/* IFRAME del feed (usa https, no //) */}
      <iframe
        title="Instagram de Daniel Reyna"
        className="lightwidget-widget w-full"
        src="https://lightwidget.com/widgets/21dd60bde97159d5b9a0f9ac723bf710.html"
        scrolling="no"
        allowTransparency={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{
          width: "100%",
          border: 0,
          overflow: "hidden",
          // Ajusta esta altura según cuántas filas/columnas muestres
          height: 600,
          borderRadius: 12,
        }}
      />
    </div>
  );
}
