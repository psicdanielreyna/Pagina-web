// app/checkout/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import WhatsAppButton from "./WhatsAppButton";
import { MANUALS } from "@/data/manuals";

// Vars públicas (ya las tienes en .env)
const BANK_NAME    = process.env.NEXT_PUBLIC_BANK_NAME    ?? "—";
const BANK_HOLDER  = process.env.NEXT_PUBLIC_BANK_HOLDER  ?? "—";
const BANK_CLABE   = process.env.NEXT_PUBLIC_BANK_CLABE   ?? "—";
const PAYPAL_ME    = process.env.NEXT_PUBLIC_PAYPAL_ME    ?? "";

// Si aún no lo tienes, añade cover {src,alt} a cada manual en data/manuals.ts
function getManual(slug: string) {
  return MANUALS.find(m => m.slug === slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  const manual = getManual(params.slug);
  if (!manual) return notFound();

  const concept = manual.slug; // lo que pides que pongan como concepto

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">

        {/* Portada */}
        <div className="rounded-2xl border border-slate-100 overflow-hidden">
          <div className="relative aspect-[4/3] bg-slate-50">
            {manual.cover?.src && (
              <Image
                src={manual.cover.src}
                alt={manual.cover.alt ?? manual.title}
                fill
                className="object-contain"
                sizes="(max-width:1024px) 100vw, 640px"
                priority
              />
            )}
          </div>
        </div>

        {/* Info / pago */}
        <div>
          <p className="text-xl font-extrabold text-slate-900">
            ${manual.price} MXN
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">
            {manual.title}
          </h1>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
            <p className="font-semibold text-slate-900">Transferencia bancaria</p>

            <dl className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-y-2 gap-x-3 text-sm">
              <dt className="text-slate-600">Banco</dt>
              <dd className="text-right text-slate-900">{BANK_NAME}</dd>
              <dd />

              <dt className="text-slate-600">Titular</dt>
              <dd className="text-right text-slate-900">{BANK_HOLDER}</dd>
              <dd />

              <dt className="text-slate-600">CLABE</dt>
              <dd>
                <code className="rounded bg-slate-50 px-3 py-1 text-slate-900">
                  {BANK_CLABE}
                </code>
              </dd>
              <dd><CopyButton text={BANK_CLABE} small /></dd>

              <dt className="text-slate-600">Concepto</dt>
              <dd>
                <code className="rounded bg-slate-50 px-3 py-1 text-slate-900">
                  {concept}
                </code>
              </dd>
              <dd><CopyButton text={concept} small /></dd>
            </dl>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            {!!PAYPAL_ME && (
              <a
                href={`https://paypal.me/${PAYPAL_ME}/${manual.price}`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#FFC439] text-slate-900 hover:brightness-95"
              >
                Pagar con PayPal
              </a>
            )}
            <WhatsAppButton slug={manual.slug} title={manual.title} price={manual.price} />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Después de confirmar el pago, te compartiré el manual por WhatsApp. Si prefieres otro medio, indícalo en el mensaje.
          </p>
        </div>
      </div>
    </section>
  );
}