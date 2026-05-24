"use client";
import { useState } from "react";

type Props = {
  tipo: "manual" | "sesion";
  slug?: string;
};

function Estrellas({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <span style={{ color: n <= (hover || value) ? "#F59E0B" : "var(--border)" }}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function OpinionForm({ tipo, slug }: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (estrellas === 0) { setErr("Por favor selecciona una calificación."); return; }
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/opiniones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, estrellas, opinion, tipo, slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar.");
      setOk(true);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ background: "var(--accent-light)", border: "0.5px solid var(--border)" }}>
        <p className="text-lg mb-1">🎉</p>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--accent-text)" }}>¡Gracias por tu opinión!</p>
        <p className="text-xs" style={{ color: "var(--accent-text)" }}>Será revisada y publicada pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Tu calificación</label>
        <Estrellas value={estrellas} onChange={setEstrellas} />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Nombre</label>
        <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre"
          className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
          style={{ background: "var(--bg-primary)", border: "0.5px solid var(--border)", color: "var(--text-primary)" }} />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
          Correo <span style={{ color: "var(--text-tertiary)" }}>(opcional)</span>
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
          className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
          style={{ background: "var(--bg-primary)", border: "0.5px solid var(--border)", color: "var(--text-primary)" }} />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Tu opinión</label>
        <textarea required value={opinion} onChange={(e) => setOpinion(e.target.value)} placeholder="Cuéntanos tu experiencia..." rows={4}
          className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none"
          style={{ background: "var(--bg-primary)", border: "0.5px solid var(--border)", color: "var(--text-primary)" }} />
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      <button type="submit" disabled={loading}
        className="rounded-full text-sm font-medium py-2.5 transition-colors disabled:opacity-60"
        style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>
        {loading ? "Enviando..." : "Enviar opinión"}
      </button>
    </form>
  );
}
