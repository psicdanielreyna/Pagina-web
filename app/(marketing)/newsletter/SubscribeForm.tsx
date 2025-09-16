"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const resp = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // intenta json, si no, usa texto
      let data: any = null;
      const raw = await resp.text();
      try { data = JSON.parse(raw); } catch { /* se queda raw */ }

      if (resp.ok) {
        setStatus("success");
        const msg =
          (data && (data.msg || (data.already ? "Ya estabas suscrito." : null))) ||
          "¡Listo! Te suscribimos al newsletter.";
        setMessage(msg);
        setEmail("");
        return;
      }

      // Errores no 2xx
      const errMsg =
        (data && (data.error?.message || data.message)) ||
        raw ||
        "Algo salió mal. Intenta de nuevo.";
      setStatus("error");
      setMessage(errMsg);
    } catch (err) {
      setStatus("error");
      setMessage("Error de red. Intenta más tarde.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="border px-3 py-2 rounded w-full"
      />
      <button type="submit" disabled={status === "loading"} className="px-4 py-2 rounded border">
        {status === "loading" ? "Enviando..." : "Suscribirme"}
      </button>
      {message && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}