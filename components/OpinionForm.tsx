// components/OpinionForm.tsx
"use client";

import { useState } from "react";

export default function OpinionForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // construimos el payload que usará tanto Formspree como el webhook
    const payload = {
      initials: String(data.get("initials") || "").trim(),
      type: (String(data.get("type") || "therapy") as "therapy" | "ebook"),
      ebookSlug: String(data.get("ebookSlug") || "").trim(),
      rating: Number(data.get("rating") || 5),
      text: String(data.get("text") || "").trim(),
      consent: data.get("consent") ? true : false,
    };

    try {
      // 1) Enviar a Formspree (se puede mandar JSON)
      const fsRes = await fetch("https://formspree.io/f/mblznpjl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2) Enviar a tu Netlify Function (no bloquea si falla)
      fetch("/.netlify/functions/opinion-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // si configuraste OPINION_WEBHOOK_SECRET en la función y quieres firmar:
        // headers: { "Content-Type": "application/json", "x-opinion-signature": "<tu-secreto>" },
        body: JSON.stringify(payload),
      }).catch(() => { /* silencioso */ });

      if (!fsRes.ok) {
        const t = await fsRes.text();
        throw new Error(`Formspree: ${fsRes.status} ${t}`);
      }

      // éxito → redirigir
      window.location.href = "/opiniones/gracias";
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al enviar tu opinión.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <label className="block text-sm font-medium">Iniciales (ej. A. C.)</label>
        <input name="initials" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Tipo</label>
        <select name="type" required className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="therapy">Terapia</option>
          <option value="ebook">Ebook</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Si elegiste Ebook, ¿cuál?</label>
        <select name="ebookSlug" className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="">—</option>
          <option value="como-apagar-la-mente">Cómo Apagar la Mente</option>
          <option value="el-arte-de-creer-en-ti">El Arte de Creer en Ti</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Calificación</label>
        <select name="rating" required className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Tu opinión</label>
        <textarea name="text" required rows={5} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div className="flex items-start gap-2">
        <input id="consent" name="consent" type="checkbox" required className="mt-1" />
        <label htmlFor="consent" className="text-sm text-slate-700">
          Autorizo publicar mi opinión con mis iniciales. Puedo solicitar su eliminación cuando quiera.
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-emerald-700 px-5 py-2.5 text-white font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}