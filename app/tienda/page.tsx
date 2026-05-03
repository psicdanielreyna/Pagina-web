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
    short: "Técnicas efectivas para calmar el sobrepensamiento.",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    badge: "Manual",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    manualSlug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    short: "Estrategias para fortalecer tu autoestima y confianza.",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    badge: "Manual",
  },
];

const bundle = {
  title: "Pack completo — los 2 manuales",
  desc: "Ahorra $100 MXN comprando los dos juntos. Entrega inmediata por correo.",
  priceOld: "$498 MXN",
  price: "$398 MXN",
  manualSlug: "bundle-completo",
};

function BtnComprar({ slug, className, children }: { slug: string; className?: string; children?: React.ReactNode }) {
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
      className={className ?? "text-xs text-white bg-zinc-900 px-3 py-1.5 rounded-full hover:bg-zinc-700 transition-colors disabled:opacity-60"}
    >
      {loading ? "..." : (children ?? "Comprar")}
    </button>
  );
}

export default function TiendaPage() {
  return (
    <main style={{ background: "#F8F5F0" }} className="min-h-screen">

      {/* Header */}
      <div className="border-b border-black/8 px-6 pt-12 pb-8" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-2">Tienda</p>
            <h1 className="text-3xl font-medium text-zinc-900 tracking-tight">Recursos para tu bienestar</h1>
            <p className="text-sm text-zinc-500 mt-1">Manuales prácticos en PDF · Entrega inmediata por correo</p>
          </div>
          <div className="flex gap-2">
            {["Todos", "Manuales", "Bundles"].map((f) => (
              <span
                key={f}
                className={`text-xs px-4 py-2 rounded-full border border-black/8 cursor-pointer ${
                  f === "Todos" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-500"
                }`}
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
              className="bg-white rounded-2xl border border-black/8 overflow-hidden flex flex-col hover:shadow-sm transition-shadow"
            >
              <div className="relative h-52 bg-emerald-50 flex items-center justify-center">
                <span className="absolute top-3 left-3 text-xs font-medium bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
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
                <h2 className="text-sm font-medium text-zinc-900 mb-1 leading-snug">{p.title}</h2>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1">{p.short}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-zinc-900">{p.price}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/tienda/${p.slug}`}
                      className="text-xs text-zinc-500 px-3 py-1.5 rounded-full border border-black/8 hover:bg-black/5 transition-colors"
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
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden flex flex-col opacity-50">
            <div className="relative h-52 bg-zinc-50 flex items-center justify-center">
              <span className="absolute top-3 right-3 text-xs font-medium bg-zinc-100 text-zinc-400 px-3 py-1 rounded-full">
                Próximamente
              </span>
              <div className="w-14 h-20 rounded-lg border-2 border-dashed border-zinc-200" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-sm font-medium text-zinc-400 mb-1">Nuevo manual</h2>
              <p className="text-xs text-zinc-300 flex-1">Disponible pronto.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-zinc-300">—</span>
                <button className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-full">Avisar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle */}
        <div
          className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ background: "#1D9E75" }}
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
              className="text-xs font-medium bg-white px-5 py-2 rounded-full hover:bg-emerald-50 transition-colors disabled:opacity-60"
            >
              Comprar bundle
            </BtnComprar>
          </div>
        </div>
      </div>
    </main>
  );
}