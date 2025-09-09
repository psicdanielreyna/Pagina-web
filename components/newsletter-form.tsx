"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center"
    >
      <input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-600"
      />
      <button
        type="submit"
        className="bg-emerald-800 text-white px-6 py-2 rounded-md hover:bg-emerald-900"
      >
        Suscribirme
      </button>

      {status === "success" && (
        <p className="text-green-600 text-sm mt-2 sm:mt-0 sm:ml-3">
          ¡Suscripción exitosa, bienvenid@!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2 sm:mt-0 sm:ml-3">
          Hubo un error, intenta de nuevo.
        </p>
      )}
    </form>
  );
}
