"use client";

import { useState, FormEvent } from "react";

export function UnsubscribeForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    try {
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      const res = await fetch("/api/unsubscribe", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error desconocido");
      setOk(data.message || "Te has dado de baja correctamente.");
    } catch (e: any) {
      setErr(e?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tucorreo@ejemplo.com"
        className="w-full rounded-md border px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Procesando..." : "Confirmar baja"}
      </button>
      {ok && <p className="text-emerald-600 text-sm">{ok}</p>}
      {err && <p className="text-red-600 text-sm">{err}</p>}
    </form>
  );
}