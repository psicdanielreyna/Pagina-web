// app/unsubscribe/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export default function UnsubscribePage() {
  const params = useSearchParams();
  const initialEmail = params.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      const fd = new FormData();
      fd.set("email", email);
      const res = await fetch("/api/unsubscribe", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Error desconocido");
      setOk(data.message);
    } catch (e: any) {
      setErr(e.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12 text-center">
      <h1 className="text-3xl font-extrabold">Darse de baja</h1>
      <p className="mt-2 text-muted-foreground">
        Lamentamos verte partir 😔. Ingresa tu correo para dejar de recibir
        mensajes.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Procesando..." : "Confirmar baja"}
        </button>

        {ok && <p className="text-emerald-600 text-sm">{ok}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>

      <p className="mt-6 text-xs text-muted-foreground">
        Si cambias de opinión, puedes volver a{" "}
        <a href="/newsletter" className="underline">
          suscribirte aquí
        </a>
        .
      </p>
    </main>
  );
}