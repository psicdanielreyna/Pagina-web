"use client";

import { useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [hp, setHp] = useState(""); // honeypot

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot (bots suelen llenarlo)
    if (hp) return;

    // Validación simple
    const trimmed = email.trim().toLowerCase();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!ok) {
      setStatus({ state: "error", message: "Ingresa un correo válido." });
      return;
    }

    setStatus({ state: "loading" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (res.ok && data?.ok) {
        setStatus({
          state: "success",
          message:
            data.message ||
            "¡Listo! Te agregué a la lista. Revisa tu bandeja (y spam/promociones).",
        });
        setEmail("");
      } else {
        setStatus({
          state: "error",
          message:
            data?.message ||
            "No pude suscribirte ahora mismo. Intenta de nuevo en un momento.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Error de conexión. Verifica tu red e intenta de nuevo.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl rounded-xl border bg-white/80 p-4 shadow-sm backdrop-blur"
    >
      <h3 className="mb-1 text-lg font-semibold">Suscríbete al newsletter</h3>
      <p className="mb-4 text-sm text-gray-600">
        Consejos breves y prácticos para sentirte mejor. Sin spam.
      </p>

      {/* Honeypot */}
      <input
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        name="company"
      />

      <div className="flex gap-2 max-sm:flex-col">
        <input
          type="email"
          name="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 outline-none ring-0 focus:border-emerald-700"
        />
        <button
          type="submit"
          disabled={status.state === "loading"}
          className="rounded-lg bg-emerald-800 px-4 py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {status.state === "loading" ? "Enviando..." : "Suscribirme"}
        </button>
      </div>

      {status.state === "error" && (
        <p className="mt-3 text-sm text-red-600">{status.message}</p>
      )}
      {status.state === "success" && (
        <p className="mt-3 text-sm text-emerald-700">{status.message}</p>
      )}
    </form>
  );
}
