"use client";
import { useState } from "react";

type Props = {
  // “banner” = grande como en robertomtz | “card” = compacto (mobile)
  variant?: "banner" | "card";
};

export default function Newsletter({ variant = "banner" }: Props) {
  const [status, setStatus] = useState<"idle" | "ok" | "err" | "already">("idle");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus("idle");

    const fd = new FormData(e.currentTarget);
    // honeypot
    if (fd.get("company")) {
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        if (data?.alreadySubscribed) {
          setStatus("already");
        } else {
          setStatus("ok");
          (e.currentTarget as HTMLFormElement).reset();
        }
      } else {
        setStatus("err");
      }
    } catch (err) {
      console.error("Error al suscribirse:", err);
      setStatus("err");
    } finally {
      setPending(false);
    }
  }

  const isBanner = variant === "banner";

  return (
    <section
      className={[
        "w-full",
        isBanner ? "py-14 sm:py-16" : "py-8",
        // fondo suave tipo “franja”
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

        {/* Tarjeta con input */}
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
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400"
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

          {/* Beneficio / nota al lado en desktop */}
          {isBanner && (
            <div className="mt-3 text-sm text-zinc-500 sm:mt-0">
              🔒 Prometido: cero spam. Solo contenido útil.
            </div>
          )}
        </div>

        {/* Estados */}
        {status === "ok" && (
          <p className="mt-3 text-sm text-green-700">
            ¡Listo! Revisa tu bandeja (y Spam/Promociones).
          </p>
        )}
        {status === "already" && (
          <p className="mt-3 text-sm text-amber-700">
            ¡Ya estabas suscrito! Te escribiré pronto ✉️
          </p>
        )}
        {status === "err" && (
          <p className="mt-3 text-sm text-red-700">
            Algo salió mal. Intenta de nuevo en unos segundos.
          </p>
        )}
      </div>
    </section>
  );
}