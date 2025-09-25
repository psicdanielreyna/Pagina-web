// app/checkout/[slug]/WhatsAppButton.tsx
"use client";

export default function WhatsAppButton({
  phone,
  text,
}: {
  phone: string;
  text: string;
}) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-medium"
    >
      Enviar comprobante por WhatsApp
    </a>
  );
}