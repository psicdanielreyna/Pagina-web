// app/tienda/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getManual, resolveManualSlug, manualSlugsForBuild } from "@/data/manuals";
import BtnComprarProducto from "./BtnComprarProducto";

export const dynamicParams = true;

export function generateStaticParams() {
  return manualSlugsForBuild().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const manual = getManual(params.slug);
  if (!manual) return { title: "Manual no encontrado" };
  return {
    title: `${manual.title} · Manual PDF | Daniel Reyna`,
    description: manual.description ?? `Manual ${manual.title} por Daniel Reyna.`,
    alternates: { canonical: `/tienda/${params.slug}` },
  };
}

const COVERS: Record<string, { src: string; alt: string }> = {
  "apagar-mente": { src: "/images/tienda/apagar-mente.png", alt: "Portada Cómo Apagar tu Mente" },
  "como-apagar-la-mente": { src: "/images/tienda/apagar-mente.png", alt: "Portada Cómo Apagar tu Mente" },
  "el-arte-de-creer-en-ti": { src: "/images/tienda/el-arte-de-creer-en-ti.png", alt: "Portada El Arte de Creer en Ti" },
};

const INCLUYE = [
  "PDF descargable de alta calidad",
  "Ejercicios prácticos aplicables desde el día 1",
  "Técnicas basadas en Terapia Cognitivo-Conductual",
  "Entrega inmediata por correo electrónico",
];

function Inner({ slug }: { slug: string }) {
  const manual = getManual(slug);
  if (!manual) return notFound();

  const manualSlug = resolveManualSlug(slug);
  const cover = COVERS[slug] ?? COVERS[manualSlug] ?? {
    src: "/images/tienda/apagar-mente.png",
    alt: manual.title,
  };

  return (
    <main style={{ background: "#F8F5F0" }} className="min-h-screen">
      <div className="border-b border-black/8 px-6 py-4" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs text-zinc-400">
            <a href="/tienda" className="hover:text-zinc-700 transition-colors">Tienda</a>
            <span className="mx-2">·</span>
            <span className="text-zinc-600">{manual.title}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden border border-black/8 bg-emerald-50 flex items-center justify-center p-10">
          <div className="relative w-full aspect-square">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 560px"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mb-4">
              Manual PDF
            </span>
            <h1 className="text-3xl font-medium text-zinc-900 tracking-tight mb-2">
              {manual.title}
            </h1>
            {manual.description && (
              <p className="text-sm text-zinc-500 leading-relaxed">{manual.description}</p>
            )}
          </div>

          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-medium text-zinc-900">${manual.price}</span>
              <span className="text-sm text-zinc-400">MXN</span>
            </div>
            <BtnComprarProducto slug={manualSlug} />
            <p className="text-xs text-zinc-400 text-center mt-3">
              Pago seguro con Stripe · Tarjeta o transferencia bancaria
            </p>
          </div>

          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <h3 className="text-sm font-medium text-zinc-900 mb-4">¿Qué incluye?</h3>
            <ul className="space-y-3">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-600">
                  <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-5 flex gap-4 items-start" style={{ background: "#E1F5EE" }}>
            <span className="text-2xl">🔒</span>
            <div>
              <p className="text-sm font-medium text-emerald-900 mb-1">Compra segura y garantizada</p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Si tienes algún problema con tu compra, escríbeme a{" "}
                <a href="mailto:danielreyna@danielreyna.com" className="underline">
                  danielreyna@danielreyna.com
                </a>{" "}
                y lo resolvemos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-400">Cargando…</div>}>
      <Inner slug={params.slug} />
    </Suspense>
  );
}