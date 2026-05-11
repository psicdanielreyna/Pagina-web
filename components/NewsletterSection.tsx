"use client";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!turnstileToken) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (!res.ok) turnstileRef.current?.reset();
    } catch {
      setStatus("error");
      turnstileRef.current?.reset();
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
            Únete a más de 10,000 personas que cuidan su mente.<br className="hidden md:block" />
            Sin spam. Baja cuando quieras.
          </p>
        </div>

        {status === "ok" ? (
          <p className="text-sm text-emerald-400 font-medium">¡Listo! Te esperamos en el inbox 🎉</p>
        ) : (
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
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
                disabled={status === "loading" || !turnstileToken}
                className="rounded-full bg-emerald-400 text-emerald-900 font-medium text-sm px-5 py-2.5 hover:bg-emerald-300 transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Suscribirme"}
              </button>
            </form>
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark" }}
            />
            {status === "error" && (
              <p className="text-xs text-red-400">Ocurrió un error. Intenta de nuevo.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}