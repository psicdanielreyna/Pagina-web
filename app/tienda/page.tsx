"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Producto = {
  slug: string;
  manualSlug: string;
  title: string;
  price: string;
  short: string;
  img: string;
  alt: string;
  badge?: string;
};

const productos: Producto[] = [
  {
    slug: "apagar-mente",
    manualSlug: "como-apagar-la-mente",
    title: "Cómo Apagar tu Mente",
    price: "$249 MXN",
    short: "Deja de revivir la misma conversación a las 3am. Técnicas concretas para que tu mente por fin te deje descansar.",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    badge: "Manual",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    manualSlug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    short: "Deja de pedir permiso para ser tú. Un método paso a paso para confiar en tus decisiones sin necesitar la aprobación de nadie.",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    badge: "Manual",
  },
];

const bundle = {
  title: "Pack completo — los 2 manuales",
  desc: "La mente en calma + la confianza para actuar. Los dos manuales que se complementan, con $100 de descuento.",
  priceOld: "$498 MXN",
  price: "$398 MXN",
  manualSlug: "bundle-completo",
};

function BtnComprar({
  slug,
  className,
  style,
  children,
}: {
  slug: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className ?? "text-xs px-3 py-1.5 rounded-full transition-colors disabled:opacity-60"}
      style={style ?? (!className ? { background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" } : undefined)}
    >
      {loading ? "..." : (children ?? "Comprar")}
    </button>
  );
}

export default function TiendaPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">

      {/* Header */}
      <div className="px-6 pt-12 pb-8" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
              Tienda
            </p>
            <h1 className="text-3xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
              Herramientas que cambian cómo te sientes
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Del sobrepensamiento a la calma, de la duda a la confianza. Empiezas hoy mismo.
            </p>
          </div>
          <div className="flex gap-2">
            {["Todos", "Manuales", "Bundles"].map((f) => (
              <span
                key={f}
                className="text-xs px-4 py-2 rounded-full cursor-pointer transition-colors"
                style={{
                  border: "0.5px solid var(--border)",
                  background: f === "Todos" ? "var(--btn-primary-bg)" : "var(--bg-card)",
                  color: f === "Todos" ? "var(--btn-primary-text)" : "var(--text-secondary)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {productos.map((p) => (
            <div
              key={p.slug}
              className="rounded-2xl overflow-hidden flex flex-col hover:shadow-sm transition-shadow"
              style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
            >
              <div className="relative h-52 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                <span
                  className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
                >
                  {p.badge}
                </span>
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-sm font-medium mb-1 leading-snug" style={{ color: "var(--text-primary)" }}>
                  {p.title}
                </h2>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  {p.short}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {p.price}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/tienda/${p.slug}`}
                      className="text-xs px-3 py-1.5 rounded-full transition-colors"
                      style={{ border: "0.5px solid var(--border)", color: "var(--text-secondary)" }}
                    >
                      Ver más
                    </Link>
                    <BtnComprar slug={p.manualSlug} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card próximamente */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col opacity-50"
            style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
          >
            <div className="relative h-52 flex items-center justify-center" style={{ background: "var(--bg-secondary)" }}>
              <span
                className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}
              >
                Próximamente
              </span>
              <div className="w-14 h-20 rounded-lg border-2 border-dashed" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-sm font-medium mb-1" style={{ color: "var(--text-tertiary)" }}>
                Nuevo manual
              </h2>
              <p className="text-xs flex-1" style={{ color: "var(--text-tertiary)" }}>
                Disponible pronto.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium" style={{ color: "var(--text-tertiary)" }}>—</span>
                <button
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}
                >
                  Avisar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle */}
        <div
          className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ background: "var(--accent)" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex">
              <div className="w-12 h-16 rounded-lg" style={{ background: "rgba(255,255,255,0.3)" }} />
              <div className="w-12 h-16 rounded-lg -ml-3" style={{ background: "rgba(255,255,255,0.18)" }} />
            </div>
            <div>
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-2"
                style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
              >
                Bundle
              </span>
              <h3 className="text-sm font-medium text-white mb-1">{bundle.title}</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>{bundle.desc}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs line-through" style={{ color: "rgba(255,255,255,0.45)" }}>
              {bundle.priceOld}
            </span>
            <span className="text-2xl font-medium text-white">{bundle.price}</span>
            <BtnComprar
              slug={bundle.manualSlug}
              className="text-xs font-medium px-5 py-2 rounded-full hover:opacity-90 transition-colors disabled:opacity-60"
              style={{ background: "var(--bg-card)", color: "var(--accent-text)" }}
            >
              Comprar bundle
            </BtnComprar>
          </div>
        </div>
      </div>
    </main>
  );
}