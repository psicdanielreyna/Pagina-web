"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"ok"|"error">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-evergreen/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-center text-xl font-semibold text-evergreen">
        Suscríbete al newsletter
      </h3>
      <p className="mt-1 text-center text-sm text-evergreen/70">
        Consejos breves y prácticos para sentirte mejor. <br className="hidden sm:block" />
        Sin spam. ✨
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 flex-1 rounded-lg border border-evergreen/15 bg-white px-4 outline-none ring-evergreen/30 placeholder:text-evergreen/40 focus:ring-2"
          aria-label="Correo electrónico"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-evergreen px-5 text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Suscribirme"}
        </button>
      </form>

      {status === "ok" && (
        <p className="mt-3 text-center text-sm text-emerald-700">
          ¡Listo! Revisa tu bandeja para confirmar la suscripción.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-sm text-red-600">
          Ocurrió un problema. Intenta de nuevo en unos segundos.
        </p>
      )}
    </div>
  );
}
