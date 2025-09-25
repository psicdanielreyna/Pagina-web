'use client';
import { useState } from 'react';

export default function WhatsAppButton({
  manualTitle,
  priceLabel,
}: { manualTitle: string; priceLabel: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || ''; // E.164: 52155...

  const text =
    `Hola, soy ${name || '(sin nombre)'}.` +
    ` Compré el manual "${manualTitle}" por ${priceLabel}.` +
    ` Adjunto comprobante de pago. Email: ${email || '(sin correo)'}.\nGracias.`;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className="border rounded px-3 py-2" placeholder="Tu nombre"
          value={name} onChange={e => setName(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Tu email"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer"
         className="inline-flex items-center justify-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
        Enviar comprobante por WhatsApp
      </a>
      <p className="text-sm text-gray-500">Se abrirá WhatsApp con el mensaje pre-llenado; adjunta ahí tu comprobante.</p>
    </div>
  );
}