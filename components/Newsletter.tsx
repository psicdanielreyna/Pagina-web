"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Solución temporal: abre el cliente de correo
    window.location.href = `mailto:daniel@tu-dominio.com?subject=Suscripción%20newsletter&body=Quiero%20suscribirme.%20Mi%20correo:%20${encodeURIComponent(
      email
    )}`;
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-900">Newsletter</h2>
      <p className="mt-1 text-slate-600">
        Consejos breves y herramientas que sí puedes aplicar.
      </p>

      <form className="mt-6 flex gap-3" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600/40"
        />
        <button
          type="submit"
          className="rounded-full bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800"
        >
          Quiero recibirlo
        </button>
      </form>

      <p className="mt-2 text-xs text-slate-500">
        *Cuando tengas tu backend listo, conectamos este formulario a tu endpoint real.
      </p>
    </div>
  );
}
