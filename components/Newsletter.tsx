"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      setMsg("¡Gracias! Te escribiré pronto.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMsg("Hubo un problema. Intenta de nuevo.");
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-full border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600/40"
        />
      </div>

      <button
        type="submit"
        disabled={status==="loading"}
        className="rounded-full bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800 disabled:opacity-60"
      >
        {status==="loading" ? "Enviando..." : "Quiero recibirlo"}
      </button>

      {msg && (
        <p className={`text-sm ${status==="ok" ? "text-emerald-700" : "text-red-600"}`}>
          {msg}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Enviaré contenido útil y podrás darte de baja cuando quieras.
      </p>
    </form>
  );
}
