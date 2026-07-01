import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getManual, resolveManualSlug, manualSlugsForBuild } from "@/data/manuals";
import BtnComprarProducto from "./BtnComprarProducto";
import Opiniones from "@/components/Opiniones";

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
  "Lo lees a tu ritmo, desde cualquier dispositivo",
  "Ejercicios prácticos aplicables desde el día 1",
  "Técnicas de TCC — las mismas que uso en consulta",
  "Empiezas hoy: te llega al correo en segundos",
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
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">

      {/* Breadcrumb */}
      <div className="px-6 py-4" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            <a href="/tienda" className="hover:underline" style={{ color: "var(--text-tertiary)" }}>
              Tienda
            </a>
            <span className="mx-2">·</span>
            <span style={{ color: "var(--text-secondary)" }}>{manual.title}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Imagen */}
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-center p-10"
          style={{ border: "0.5px solid var(--border)", background: "var(--accent-light)" }}
        >
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

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
              style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
            >
              Manual PDF
            </span>
            <h1 className="text-3xl font-medium tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
              {manual.title}
            </h1>
            {manual.description && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {manual.description}
              </p>
            )}
          </div>

          {/* Precio y compra */}
          <div
            className="rounded-2xl p-6"
            style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}
          >
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-medium" style={{ color: "var(--text-primary)" }}>
                ${manual.price}
              </span>
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>MXN</span>
            </div>
            <BtnComprarProducto slug={manualSlug} />
            <p className="text-xs text-center mt-3" style={{ color: "var(--text-tertiary)" }}>
              Pago seguro con Stripe · Tarjeta o transferencia bancaria
            </p>
          </div>

          {/* Qué incluye */}
          <div
            className="rounded-2xl p-6"
            style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}
          >
            <h3 className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              ¿Qué incluye?
            </h3>
            <ul className="space-y-3">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Garantía */}
          <div
            className="rounded-2xl p-5 flex gap-4 items-start"
            style={{ background: "var(--accent-light)" }}
          >
            <span className="text-2xl">🔒</span>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--accent-text)" }}>
                Compra segura y garantizada
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--accent-text)" }}>
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

      {/* Opiniones */}
      <div
        className="border-t px-6 py-12"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl">
          <Opiniones tipo="manual" slug={manualSlug} title="Opiniones del manual" />
        </div>
      </div>

    </main>
  );
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm" style={{ color: "var(--text-tertiary)" }}>Cargando…</div>}>
      <Inner slug={params.slug} />
    </Suspense>
  );
}