"use client";
import { useState, FormEvent } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      fd.set("firstName", firstName.trim());
      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo suscribir.");
      setOk(true);
      setEmail("");
      setFirstName("");
    } catch (e: any) {
      setErr(e?.message || "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg mb-1">🎉</p>
        <p className="text-sm font-medium text-emerald-800 mb-1">¡Listo! Revisa tu correo</p>
        <p className="text-xs text-emerald-600">Ahí está tu mini guía anti-estrés.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 text-left">
      <input type="text" name="company" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Tu nombre"
        className="w-full rounded-full border border-black/8 px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors"
        style={{ background: "#F8F5F0" }}
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        className="w-full rounded-full border border-black/8 px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors"
        style={{ background: "#F8F5F0" }}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-zinc-900 text-white text-sm font-medium py-3 hover:bg-zinc-700 transition-colors disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Suscribirme gratis →"}
      </button>

      {err && <p className="text-xs text-red-500 text-center">{err}</p>}
    </form>
  );
}