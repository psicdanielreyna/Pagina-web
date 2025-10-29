// app/checkout/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getManualAny, manualSlugsForBuild } from "@/data/manuals";

// ✅ Componentes cliente como dynamic (evita CSR bailout en SSG)
const CopyButton = dynamic(() => import("@/components/CopyButton"), { ssr: false, loading: () => null });
const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false, loading: () => null });

// ✅ Fallbacks seguros para build
const BANK_NAME   = process.env.NEXT_PUBLIC_BANK_NAME   || "Hey Banco (BANREGIO)";
const BANK_HOLDER = process.env.NEXT_PUBLIC_BANK_HOLDER || "DANIEL OSVALDO GONZÁLEZ REYNA";
const BANK_CLABE  = process.env.NEXT_PUBLIC_BANK_CLABE  || "058597000028423030";
const PAYPAL_ME   = process.env.NEXT_PUBLIC_PAYPAL_ME   || "dangzzreyna";

function Inner({ slug }: { slug: string }) {
  const manual = getManualAny(slug);
  if (!manual) return notFound();

  const concepto = manual.slug;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {manual.title}
        </h1>
        {manual.description && (
          <p className="mt-2 text-slate-600">{manual.description}</p>
        )}

        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6">
          <dl className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium">Banco</dt>
              <dd className="text-right">{BANK_NAME}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium">Titular</dt>
              <dd className="text-right">{BANK_HOLDER}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium">CLABE</dt>
              <dd className="flex items-center gap-2">
                <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">
                  {BANK_CLABE}
                </code>
                <CopyButton text={BANK_CLABE} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium">Concepto</dt>
              <dd className="flex items-center gap-2">
                <code className="rounded bg-slate-50 px-2 py-1 text-slate-900">
                  {concepto}
                </code>
                <CopyButton text={concepto} />
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {PAYPAL_ME && (
              <a
                href={`https://paypal.me/${PAYPAL_ME}/${manual.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Pagar con PayPal
              </a>
            )}

            <WhatsAppButton slug={manual.slug} title={manual.title} price={manual.price} />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Después de confirmar el pago, te compartiré el manual por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-600">Cargando…</div>}>
      <Inner slug={params.slug} />
    </Suspense>
  );
}

/** ← Asegura que /checkout/* exista en el build (incluye alias) */
export function generateStaticParams() {
  return manualSlugsForBuild().map((slug) => ({ slug }));
}