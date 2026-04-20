"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-zinc-900 px-6 py-12 md:py-14">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 mb-4">
            Newsletter semanal
          </span>
          <h2 className="text-xl md:text-2xl font-medium text-white tracking-tight">
            Una idea práctica cada semana
          </h2>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            Únete a más de 50,000 personas que cuidan su mente.<br className="hidden md:block" />
            Sin spam. Baja cuando quieras.
          </p>
        </div>

        {status === "ok" ? (
          <p className="text-sm text-emerald-400 font-medium">¡Listo! Te esperamos en el inbox 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="flex-1 md:w-56 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-emerald-400 text-emerald-900 font-medium text-sm px-5 py-2.5 hover:bg-emerald-300 transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {status === "loading" ? "..." : "Suscribirme"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}