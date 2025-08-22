"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setMsg(null);
    setOk(null);
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setOk(!!data.ok);
      setMsg(data.message || (data.ok ? "Listo" : "Algo salió mal"));

      if (data.ok) setEmail("");
    } catch {
      setOk(false);
      setMsg("No se pudo enviar. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Newsletter</h3>
      <p className="mt-2 text-slate-600">
        Consejos breves y herramientas que sí puedes aplicar.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex gap-3">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Quiero recibirlo"}
        </button>
      </form>

      {msg && (
        <p className={`mt-3 text-sm ${ok ? "text-emerald-700" : "text-rose-600"}`}>
          {msg}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-500">
        *Cuando tengas tu backend listo, conectamos este formulario a tu endpoint real.
      </p>
    </div>
  );
}
