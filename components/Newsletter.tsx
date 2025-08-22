// components/Newsletter.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [state, setState] = useState<{
    status: Status;
    message: string;
    email: string;
  }>({
    status: "idle",
    message: "",
    email: "",
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    // Validación rápida del email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState((s) => ({
        ...s,
        status: "error",
        message: "Ingresa un correo válido.",
      }));
      return;
    }

    setState((s) => ({ ...s, status: "loading", message: "" }));

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // ✅ éxito: limpiamos el input y mostramos mensaje bonito
        setState({
          status: "success",
          message: "¡Listo! Te llegará el próximo correo 😊",
          email: "",
        });
        form.reset();
        return;
      }

      // ❌ error: mensaje especial si ya estaba suscrito
      const msg =
        /already exists|already subscribed|conflict/i.test(
          data?.message || ""
        )
          ? "Ya estabas suscrito ✨"
          : data?.message || "No se pudo suscribir.";
      setState((s) => ({ ...s, status: "error", message: msg }));
    } catch (_err) {
      setState((s) => ({
        ...s,
        status: "error",
        message: "No se pudo suscribir.",
      }));
    }
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Newsletter
          </h2>
          <p className="mt-2 text-slate-600">
            Consejos breves y herramientas que sí puedes aplicar.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 flex flex-col gap-3 md:flex-row md:items-center"
          >
            <input
              name="email"
              type="email"
              required
              defaultValue={state.email}
              placeholder="tu@email.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400 md:max-w-xl"
            />

            <button
              type="submit"
              disabled={state.status === "loading"}
              className="rounded-xl bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.status === "loading" ? "Enviando..." : "Quiero recibirlo"}
            </button>
          </form>

          <p
            className={
              "mt-2 text-sm " +
              (state.status === "error"
                ? "text-red-600"
                : state.status === "success"
                ? "text-green-700"
                : "text-slate-500")
            }
            aria-live="polite"
          >
            {state.message ||
              "*Cuando tengas tu backend listo, conectamos este formulario a tu endpoint real."}
          </p>
        </div>
      </div>
    </section>
  );
}
