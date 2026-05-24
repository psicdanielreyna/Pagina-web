"use client";
import { useEffect, useState } from "react";

type Opinion = {
  id: string;
  nombre: string;
  email: string;
  estrellas: number;
  opinion: string;
  tipo: string;
  slug: string;
  created_at: string;
  aprobada: boolean;
  pendiente: boolean;
};

function Estrellas({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= value ? "#F59E0B" : "#e4e4e7" }}>★</span>
      ))}
    </div>
  );
}

export default function AdminOpinionesPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/opiniones/aprobar?secret=${encodeURIComponent(secret)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No autorizado");
      setOpiniones(data.opiniones ?? []);
      setAuthed(true);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function accion(id: string, tipo: "aprobar" | "rechazar") {
    try {
      await fetch("/api/opiniones/aprobar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, accion: tipo, secret }),
      });
      setOpiniones((prev) => prev.filter((o) => o.id !== id));
    } catch {
      alert("Error al procesar la opinión.");
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0f1a" }}>
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-medium text-white mb-6 text-center">Panel de opiniones</h1>
          <form onSubmit={login} className="flex flex-col gap-3">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Contraseña de admin"
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
              style={{ background: "#1a1a2e", border: "0.5px solid rgba(255,255,255,0.08)", color: "#e2e8f0" }}
            />
            {err && <p className="text-xs text-red-400">{err}</p>}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full py-3 text-sm font-medium transition-colors disabled:opacity-60"
              style={{ background: "#1D9E75", color: "#fff" }}
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ background: "#0f0f1a" }}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-white">Opiniones pendientes</h1>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              {opiniones.length} {opiniones.length === 1 ? "opinión pendiente" : "opiniones pendientes"}
            </p>
          </div>
        </div>

        {opiniones.length === 0 ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: "#1a1a2e", border: "0.5px solid rgba(255,255,255,0.06)" }}>
            <p className="text-2xl mb-2">✅</p>
            <p className="text-sm" style={{ color: "#64748b" }}>No hay opiniones pendientes.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {opiniones.map((o) => (
              <div
                key={o.id}
                className="rounded-2xl p-6"
                style={{ background: "#1a1a2e", border: "0.5px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-white">{o.nombre}</p>
                    {o.email && <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{o.email}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <Estrellas value={o.estrellas} />
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(29,158,117,0.2)", color: "#5DCAA5" }}>
                        {o.tipo} {o.slug ? `· ${o.slug}` : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: "#475569" }}>
                    {new Date(o.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>{o.opinion}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => accion(o.id, "aprobar")}
                    className="flex-1 rounded-full py-2 text-xs font-medium transition-colors"
                    style={{ background: "#1D9E75", color: "#fff" }}
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={() => accion(o.id, "rechazar")}
                    className="flex-1 rounded-full py-2 text-xs font-medium transition-colors"
                    style={{ background: "rgba(226,75,74,0.15)", color: "#F09595", border: "0.5px solid rgba(226,75,74,0.3)" }}
                  >
                    ✗ Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
