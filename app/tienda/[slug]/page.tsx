// app/tienda/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getManual, resolveManualSlug, manualSlugsForBuild } from "@/data/manuals";

const CopyButton = dynamic(() => import("@/components/CopyButton"), { ssr: false });
const Opiniones  = dynamic(() => import("@/components/Opiniones"), { ssr: false, loading: () => null });

export const dynamicParams = true;

// ✅ Pre-genera slugs reales y alias
export function generateStaticParams() {
  return manualSlugsForBuild().map((slug) => ({ slug }));
}

// ⚠️ Usa el slug “de vista” (el que viene en la URL) para canonical/OG
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const manual = getManual(params.slug);
    if (!manual) {
      return {
        title: "Manual no encontrado",
        description: "Este recurso no está disponible actualmente.",
        robots: { index: false },
      };
    }
    const viewSlug = params.slug;
    const title = `${manual.title} · Ebook | Daniel Reyna`;
    const description = manual.description ?? `Ebook de ${manual.title} por Daniel Reyna.`;
    return {
      title,
      description,
      alternates: { canonical: `/tienda/${viewSlug}` },
      openGraph: {
        title,
        description,
        type: "website",
        url: `/tienda/${viewSlug}`,
      },
    };
  } catch {
    return { title: "Manual", description: "" };
  }
}

// Portadas: incluye claves para alias y slug real
const COVERS: Record<string, { src: string; alt: string }> = {
  "apagar-mente":               { src: "/images/tienda/apagar-mente.png", alt: "Portada «Cómo Apagar tu Mente»" },
  "como-apagar-la-mente":       { src: "/images/tienda/apagar-mente.png", alt: "Portada «Cómo Apagar tu Mente»" },
  "el-arte-de-creer-en-ti":     { src: "/images/tienda/el-arte-de-creer-en-ti.png", alt: "Portada «El Arte de Creer en Ti»" },
};

function Inner({ slug }: { slug: string }) {
  const manual = getManual(slug);
  if (!manual) return notFound();

  const viewSlug = slug;
  const cover =
    COVERS[viewSlug] ??
    COVERS[resolveManualSlug(viewSlug)] ?? {
      src: "/images/tienda/apagar-mente.png",
      alt: manual.title,
    };

  const BANK_NAME   = process.env.NEXT_PUBLIC_BANK_NAME   || "Hey Banco (BANREGIO)";
  const BANK_HOLDER = process.env.NEXT_PUBLIC_BANK_HOLDER || "DANIEL OSVALDO GONZÁLEZ REYNA";
  const BANK_CLABE  = process.env.NEXT_PUBLIC_BANK_CLABE  || "058597000028423030";
  const PAYPAL_ME   = process.env.NEXT_PUBLIC_PAYPAL_ME   || "dangzzreyna";
  const WHATSAPP    = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "5218117649180";

  const paypalHref  = `https://paypal.me/${PAYPAL_ME}/${manual.price}`;
  const concepto    = resolveManualSlug(viewSlug);
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hola, te comparto mi comprobante del manual "${manual.title}".`
  )}`;

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
            <div className="relative aspect-[4/3] bg-slate-50">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 640px"
                priority
              />
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold text-slate-900 mb-2">${manual.price} MXN</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{manual.title}</h1>
            {manual.description && <p className="mt-2 text-slate-700">{manual.description}</p>}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h2 className="font-semibold text-slate-900">Transferencia bancaria</h2>
              <dl className="grid gap-2 text-slate-700 text-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium">Banco</dt><dd>{BANK_NAME}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium">Titular</dt><dd className="text-right">{BANK_HOLDER}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium">CLABE</dt>
                  <dd className="flex items-center gap-2">
                    <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">{BANK_CLABE}</code>
                    <CopyButton text={BANK_CLABE} small />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium">Concepto</dt>
                  <dd className="flex items-center gap-2">
                    <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">{concepto}</code>
                    <CopyButton text={concepto} small />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4">
              <Link href={paypalHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-yellow-400 text-slate-900 font-semibold hover:brightness-95">
                Pagar con PayPal
              </Link>
            </div>

            <div className="mt-3">
              <Link href={whatsappHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700">
                Enviar comprobante por WhatsApp
              </Link>
            </div>

            <div className="mt-6">
              <Link href={`/checkout/${resolveManualSlug(viewSlug)}`}
                className="text-sm text-slate-600 underline underline-offset-4">
                Prefiero ver el checkout interno
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Opiniones
            title="Opiniones del ebook"
            subtitle="Qué dicen quienes ya lo leyeron"
            variant={{ ebookSlug: resolveManualSlug(viewSlug) }}
          />
        </div>
      </section>
    </>
  );
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-600">Cargando…</div>}>
      <Inner slug={params.slug} />
    </Suspense>
  );
}