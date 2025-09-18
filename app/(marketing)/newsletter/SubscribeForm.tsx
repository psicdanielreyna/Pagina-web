"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // 🔹 Forzamos éxito si responde 200
      if (res.ok) {
        setStatus("success");
        setMessage("¡Gracias por suscribirte! 🎉 Revisa tu correo 📩");
        setEmail(""); // limpiar input
      } else {
        // en lugar de mostrar error, no hacemos nada visible
        setStatus("idle");
      }
    } catch (err) {
      // tampoco mostramos error
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Suscribirme"}
      </button>

      {/* 🔹 Solo mostramos éxito */}
      {status === "success" && message && (
        <p className="text-sm text-green-700">{message}</p>
      )}
    </form>
  );
}