// app/checkout/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import { getManual } from "@/data/manuals";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const m = getManual(params.slug);
  return {
    title: m ? `Checkout – ${m.title}` : "Checkout",
  };
}

export default function Page({ params }: Props) {
  const manual = getManual(params.slug);
  if (!manual) return notFound();

  // Env públicos (definidos en Netlify → Environment variables)
  const WHATS = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
  const BANK = process.env.NEXT_PUBLIC_BANK_NAME ?? "";
  const HOLDER = process.env.NEXT_PUBLIC_BANK_HOLDER ?? "";
  const CLABE = process.env.NEXT_PUBLIC_BANK_CLABE ?? "";
  const PAYPAL = process.env.NEXT_PUBLIC_PAYPAL_ME ?? "";

  const amountFmt = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(manual.price);

  // Mensaje para WhatsApp
  const waMsg = encodeURIComponent(
    `Hola Daniel, acabo de realizar el pago por *${manual.title}* (${amountFmt}). ` +
      `Adjunto el comprobante. Mi correo es: ____`
  );
  const waUrl = WHATS ? `https://wa.me/${WHATS}?text=${waMsg}` : undefined;

  // Link opcional a PayPal.me (monto + MXN)
  const paypalUrl = PAYPAL ? `https://paypal.me/${PAYPAL}/${manual.price}MXN` : undefined;

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      <h2 className="text-xl font-medium">{manual.title}</h2>
      <p className="text-gray-500 mb-1">{manual.description}</p>
      <p className="text-lg font-semibold mb-6">{amountFmt}</p>

      {/* Pago por transferencia */}
      <section className="mb-8 rounded-xl border p-5">
        <h3 className="font-medium mb-3">Transferencia bancaria</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-32 text-gray-500">Banco</span>
            <span className="font-medium">{BANK}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-gray-500">Titular</span>
            <span className="font-medium">{HOLDER}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-gray-500">CLABE</span>
            <code className="px-1.5 py-0.5 rounded bg-gray-50">{CLABE}</code>
            <CopyButton text={CLABE} />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-gray-500">Concepto</span>
            <code className="px-1.5 py-0.5 rounded bg-gray-50">{manual.slug}</code>
            <CopyButton text={manual.slug} />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-gray-500">Monto</span>
            <span className="font-medium">{amountFmt}</span>
          </div>
        </div>
      </section>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-3">
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Enviar comprobante por WhatsApp
          </a>
        )}
        {paypalUrl && (
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Pagar con PayPal
          </a>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Después de confirmar el pago, te compartiré el manual por WhatsApp. Si prefieres otro medio,
        indícalo en el mensaje.
      </p>
    </main>
  );
}