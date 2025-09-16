"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading"); setMessage("");
    console.log("[FORM] submit", email, "origin:", window.location.origin);

    try {
      const resp = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const raw = await resp.text();
      let data: any = null; try { data = JSON.parse(raw); } catch {}
      console.log("[FORM] resp", resp.status, "raw:", raw, "json:", data);

      // ✅ Éxito: cualquier 2xx + ok/contact
      if (resp.ok && (data?.ok || data?.contact)) {
        setStatus("success");
        setMessage(data?.msg || (data?.already ? "Ya estabas suscrito." : "¡Gracias por suscribirte! 🎉 Revisa tu correo."));
        setEmail("");
        return;
      }

      // ❌ Error (no 2xx)
      setStatus("error");
      setMessage(data?.error?.message || raw || "Algo salió mal. Intenta de nuevo.");
    } catch (err) {
      console.error("[FORM] network error", err);
      setStatus("error");
      setMessage("Error de red. Intenta más tarde.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com (form bueno)"
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" disabled={status==="loading"} className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50">
          {status==="loading" ? "Enviando..." : "Suscribirme"}
        </button>
      </div>
      {message && <p className={`text-sm ${status==="error" ? "text-red-600" : "text-green-700"}`}>{message}</p>}
    </form>
  );
}