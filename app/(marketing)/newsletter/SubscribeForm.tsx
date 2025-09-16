"use client";

import { useState, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const timerRef = useRef<number | null>(null);

  const setFlash = (msg: string, st: Status) => {
    setStatus(st);
    setMessage(msg);
    // limpiar mensaje después de 6s
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setMessage("");
      if (st === "success") setStatus("idle");
    }, 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const cleaned = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setFlash("Escribe un correo válido.", "error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // importante: evita que navegadores sirvan algo cacheado
        cache: "no-store",
        body: JSON.stringify({ email: cleaned }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // si no viene JSON, seguimos con lo que diga el status
      }

      // ÉXITO:
      // - cualquier 2xx
      // - 409 (ya estaba suscrito) lo tratamos como éxito amable
      if ((res.status >= 200 && res.status < 300) || res.status === 409 || data?.ok === true) {
        const already = res.status === 409 || data?.already === true;
        setEmail("");
        setFlash(
          already
            ? "Ya estabas suscrito 😊. Te enviaré el recurso por correo."
            : "¡Gracias por suscribirte! 🎉 Revisa tu correo 📩",
          "success"
        );
        return;
      }

      // Si no fue éxito, mostramos el mensaje del backend si existe
      const backendMsg =
        data?.error?.message ||
        data?.message ||
        data?.error ||
        "Algo salió mal. Intenta de nuevo.";
      setFlash(backendMsg, "error");
    } catch {
      setFlash("Error de conexión. Intenta más tarde.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        aria-label="Correo electrónico"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
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