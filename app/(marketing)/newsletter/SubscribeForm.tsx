"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const resp = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        cache: "no-store",
      });

      const text = await resp.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch {}

      console.log("[FORM] /api/subscribe", resp.status, data || text);

      if (resp.ok && data?.ok !== false) {
        setStatus("success");
        setMessage(data?.msg || "¡Gracias por suscribirte! 🎉");
        setEmail("");
        return;
      }

      setStatus("error");
      setMessage(data?.error?.message || data?.reason || text || "Algo salió mal. Intenta de nuevo.");
    } catch {
      setStatus("error");
      setMessage("Error de red. Intenta más tarde.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Suscribirme"}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}