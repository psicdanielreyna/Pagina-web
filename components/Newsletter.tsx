// components/Newsletter.tsx
"use client";

import { useState } from "react";

type Props = {
  variant?: "banner" | "card";
};

export default function Newsletter({ variant = "banner" }: Props) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const isBanner = variant === "banner";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setMsg(null);

    const fd = new FormData(e.currentTarget);
    // honeypot anti-bots
    if (fd.get("company")) {
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setMsg("Algo salió mal. Intenta de nuevo en unos segundos.");
      } else if (data.alreadySubscribed) {
        setMsg("¡Ya estabas suscrito! Te escribiré pronto ✉️");
      } else {
        // suscripción nueva
        if (data.deferred) {
          // correo diferido (p.ej. SEND_EMAILS !== "true" o fallo temporal)
          setMsg(
            "¡Listo! Te agregué a la lista. Si no te llega el correo en unos minutos, avísame."
          );
        } else {
          setMsg("¡Listo! Revisa tu bandeja (y Spam/Promociones).");
        }
        // limpia el input solo en éxito
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch {
      setMsg("Algo salió mal. Intenta de nuevo en unos segundos.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      className={[
        "w-full",
        isBanner ? "py-14 sm:py-16" : "py-8",
        "bg-[color:var(--nl-bg,#F5F7FA)]",
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl px-4">
        {/* Encabezado */}
        <div className={isBanner ? "mb-8" : "mb-5"}>
          <p className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200">
            Newsletter semanal
          </p>
          <h2
            className={[
              "mt-3 font-semibold tracking-tight text-zinc-900",
              isBanner ? "text-2xl sm:text-3xl" : "text-xl",
            ].join(" ")}
          >
            No te pierdas lo mejor para cuidar tu mente cada semana
          </h2>
          <p className={isBanner ? "mt-2 text-zinc-600" : "mt-1 text-zinc-600"}>
            Consejos breves y prácticos. Sin spam. Puedes darte de baja cuando quieras.
            <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900 ring-1 ring-yellow-200">
              🎁 Mini guía anti-estrés
            </span>
          </p>
        </div>

        {/* Form */}
        <div
          className={[
            "rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-zinc-200",
            isBanner ? "sm:flex sm:items-center sm:gap-4" : "",
          ].join(" ")}
        >
          <form
            onSubmit={onSubmit}
            className={[
              "flex w-full gap-3",
              isBanner ? "sm:flex-1" : "",
              "flex-col sm:flex-row",
            ].join(" ")}
          >
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              inputMode="email"
              placeholder="tu@email.com"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            />
            {/* honeypot */}
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--nl-accent,#14532d)] px-5 py-3 font-semibold text-[color:var(--nl-accent-contrast,#fff)] transition hover:brightness-110 disabled:opacity-60"
            >
              {pending ? "Enviando…" : "Suscribirme"}
            </button>
          </form>

          {isBanner && (
            <div className="mt-3 text-sm text-zinc-500 sm:mt-0">
              🔒 Prometido: cero spam. Solo contenido útil.
            </div>
          )}
        </div>

        {/* Mensajes */}
        {msg && (
          <p
            className={[
              "mt-3 text-sm",
              /mal|Error|segundos/i.test(msg) ? "text-red-700" : "text-green-700",
            ].join(" ")}
          >
            {msg}
          </p>
        )}
      </div>
    </section>
  );
}