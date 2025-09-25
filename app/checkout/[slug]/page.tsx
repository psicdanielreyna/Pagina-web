// app/checkout/[slug]/page.tsx
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import WhatsAppButton from "./WhatsAppButton";
import { MANUALS } from "@/data/manuals";

function getManual(slug: string) {
  return MANUALS.find((m) => m.slug === slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  const manual = getManual(params.slug);
  if (!manual) return notFound();

  const wp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME ?? "";
  const bankHolder = process.env.NEXT_PUBLIC_BANK_HOLDER ?? "";
  const bankClabe = process.env.NEXT_PUBLIC_BANK_CLABE ?? "";
  const paypalMe = process.env.NEXT_PUBLIC_PAYPAL_ME ?? "";

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">{manual.title}</h1>
      <p className="text-muted-foreground mb-6">{manual.description}</p>

      <div className="space-y-6 rounded-lg border p-5">
        <section>
          <h2 className="font-medium mb-2">Precio</h2>
          <p className="text-lg">${manual.price} MXN</p>
        </section>

        <section>
          <h2 className="font-medium mb-2">Transferencia bancaria</h2>
          <ul className="space-y-1">
            <li><strong>Banco:</strong> {bankName}</li>
            <li><strong>Titular:</strong> {bankHolder}</li>
            <li className="flex items-center gap-2">
              <span><strong>CLABE:</strong> {bankClabe}</span>
              <CopyButton text={bankClabe} />
            </li>
          </ul>
        </section>

        {paypalMe && (
          <section>
            <h2 className="font-medium mb-2">PayPal (opcional)</h2>
            <a
              className="underline"
              href={`https://paypal.me/${paypalMe}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              paypal.me/{paypalMe}
            </a>
          </section>
        )}

        {wp && (
          <WhatsAppButton
            phone={wp}
            text={`Hola, acabo de pagar el manual "${manual.title}". Te envío el comprobante, ¿me ayudas con el acceso/descarga?`}
          />
        )}
      </div>
    </main>
  );
}