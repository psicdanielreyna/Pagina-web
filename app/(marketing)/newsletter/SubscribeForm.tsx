"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // solo control de éxito

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        // importantísimo para Netlify/Next edge: no cachear
        cache: "no-store",
      });

      // si tu endpoint responde { ok: true }, marcamos éxito
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && (data?.ok === true || data?.ok === "true")) {
        setSuccess(true);
        setEmail("");
      } else {
        // Silencioso: NO mostramos mensaje de error
        // Puedes loguearlo en consola para debug:
        // console.debug("subscribe error", { status: res.status, data });
      }
    } catch {
      // Silencioso también
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        aria-label="Correo para suscribirte"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Suscribirme"}
      </button>

      {/* Solo éxito, jamás error */}
      {success && (
        <p className="text-sm text-green-700" aria-live="polite">
          ¡Listo! 🎉 Revisa tu correo 📩
        </p>
      )}
    </form>
  );
}