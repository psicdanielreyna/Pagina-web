"use client";

type Props = {
  slug: string;
  title: string;
  price: number;
  className?: string;
};

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";

export default function WhatsAppButton({ slug, title, price, className }: Props) {
  const text = `Hola, ya realicé el pago del manual "${title}" ($${price} MXN). Concepto: ${slug}. Te comparto el comprobante, ¿me lo puedes enviar por favor?`;
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center rounded-full px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
      }
    >
      Enviar comprobante por WhatsApp
    </a>
  );
}