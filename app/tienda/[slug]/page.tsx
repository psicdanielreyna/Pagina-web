// app/tienda/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import Opiniones from "@/components/Opiniones";
import { getManual } from "@/data/manuals";

const BANK_NAME   = process.env.NEXT_PUBLIC_BANK_NAME   || "Hey Banco (BANREGIO)";
const BANK_HOLDER = process.env.NEXT_PUBLIC_BANK_HOLDER || "DANIEL OSVALDO GONZÁLEZ REYNA";
const BANK_CLABE  = process.env.NEXT_PUBLIC_BANK_CLABE  || "058597000028423030";
const PAYPAL_ME   = process.env.NEXT_PUBLIC_PAYPAL_ME   || "dangzzreyna";
const WHATSAPP    = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "5218117649180";

// Asegúrate que los keys coincidan con tus slugs reales
const COVERS: Record<string, { src: string; alt: string }> = {
  "apagar-mente": {
    src: "/images/tienda/apagar-mente.png",
    alt: "Portada «Cómo Apagar tu Mente»",
  },
  "el-arte-de-creer-en-ti": {
    src: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada «El Arte de Creer en Ti»",
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const manual = getManual(params.slug);
  if (!manual) return {};
  const title = `${manual.title} · Ebook | Daniel Reyna`;
  const description = manual.description ?? `Ebook de ${manual.title} por Daniel Reyna.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/tienda/${manual.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "product",
      url: `/tienda/${manual.slug}`,
    },
  };
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const manual = getManual(params.slug);
  if (!manual) return notFound();

  const cover = COVERS[manual.slug] ?? {
    src: "/images/tienda/apagar-mente.png",
    alt: manual.title,
  };

  // enlaces de pago
  const paypalHref = `https://paypal.me/${PAYPAL_ME}/${manual.price}`;
  const concepto = manual.slug;
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hola, te comparto mi comprobante del manual "${manual.title}".`
  )}`;

  return (
    <>
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
          {/* Portada a la izquierda */}
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

          {/* Columna derecha */}
          <div>
            {/* Precio arriba */}
            <div className="text-2xl font-bold text-slate-900 mb-2">
              ${manual.price} MXN
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {manual.title}
            </h1>

            {/* Descripción corta, si existe */}
            {manual.description && (
              <p className="mt-2 text-slate-700">{manual.description}</p>
            )}

            {/* Métodos de pago */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h2 className="font-semibold text-slate-900">
                Transferencia bancaria
              </h2>
              <dl className="grid gap-2 text-slate-700 text-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium">Banco</dt>
                  <dd>{BANK_NAME}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium">Titular</dt>
                  <dd className="text-right">{BANK_HOLDER}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium">CLABE</dt>
                  <dd className="flex items-center gap-2">
                    <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">
                      {BANK_CLABE}
                    </code>
                    <CopyButton text={BANK_CLABE} small />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium">Concepto</dt>
                  <dd className="flex items-center gap-2">
                    <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">
                      {concepto}
                    </code>
                    <CopyButton text={concepto} small />
                  </dd>
                </div>
              </dl>
            </div>

            {/* Botón PayPal */}
            <div className="mt-4">
              <Link
                href={paypalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-yellow-400 text-slate-900 font-semibold hover:brightness-95"
              >
                Pagar con PayPal
              </Link>
            </div>

            {/* WhatsApp para comprobante */}
            <div className="mt-3">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Enviar comprobante por WhatsApp
              </Link>
            </div>

            {/* CTA alterna: checkout interno */}
            <div className="mt-6">
              <Link
                href={`/checkout/${manual.slug}`}
                className="text-sm text-slate-600 underline underline-offset-4"
              >
                Prefiero ver el checkout interno
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Opiniones del ebook */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Opiniones
            title="Opiniones del ebook"
            subtitle="Qué dicen quienes ya lo leyeron"
            variant={{ ebookSlug: manual.slug }}
          />
        </div>
      </section>
    </>
  );
}