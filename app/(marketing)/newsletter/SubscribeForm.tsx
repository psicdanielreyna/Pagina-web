// app/(marketing)/newsletter/SubscribeForm.tsx
"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Si el backend responde ok, mostramos éxito.
      // Si no, simplemente volvemos a "idle" sin mostrar error.
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.ok) {
          setStatus("success");
          setMessage("¡Gracias por suscribirte! 🎉 Revisa tu correo 📩");
          setEmail("");
          return;
        }
      }

      // Nada de errores en UI: volvemos a idle y no mostramos mensaje
      setStatus("idle");
      setMessage(null);
    } catch {
      // Igual: sin mensaje de error
      setStatus("idle");
      setMessage(null);
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
        disabled={isLoading}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        aria-busy={isLoading}
      >
        {isLoading ? "Enviando..." : "Suscribirme"}
      </button>

      {/* Solo mostramos mensajes de éxito */}
      {status === "success" && message && (
        <p className="text-sm text-green-700" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
}