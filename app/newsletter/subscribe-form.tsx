"use client";

import { useState, FormEvent } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      fd.set("firstName", firstName.trim());

      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo suscribir.");

      setOk("¡Listo! Revisa tu correo (te mandé la mini guía en PDF).");
      setEmail("");
      setFirstName("");
    } catch (e: any) {
      setErr(e?.message || "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot anti-bots */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Primer nombre</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none ring-0 focus:border-foreground/50"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none ring-0 focus:border-foreground/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "¡Suscribirme!"}
      </button>

      {ok && <p className="text-sm text-emerald-600">{ok}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      <p className="text-xs text-muted-foreground">
        Al suscribirte recibirás la{" "}
        <a className="underline" href="/downloads/mini-guia-anti-estres.pdf">
          mini guía anti-estrés (PDF)
        </a>{" "}
        en tu correo.
      </p>
    </form>
  );
}