"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      setState("sending");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (res.ok && json.ok) {
        setState("ok");
        setMsg("Listo. Revisa tu correo 🙂");
        setEmail("");
      } else {
        setState("error");
        setMsg(json?.error || "Ocurrió un error");
      }
    } catch {
      setState("error");
      setMsg("No se pudo enviar. Intenta de nuevo.");
    }
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-900">Newsletter</h2>
      <p className="mt-1 text-slate-600">Consejos breves y herramientas que sí puedes aplicar.</p>

      <form onSubmit={onSubmit} className="mt-6 flex gap-3">
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 rounded-full border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600/40"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800 disabled:opacity-60"
        >
          {state === "sending" ? "Enviando..." : "Quiero recibirlo"}
        </button>
      </form>

      {state !== "idle" && (
        <p className={`mt-2 text-sm ${state === "ok" ? "text-emerald-700" : "text-rose-600"}`}>
          {msg}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-500">
        *Puedes darte de baja cuando quieras.
      </p>
    </div>
  );
}
