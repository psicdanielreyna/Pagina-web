"use client";
import { useEffect, useState } from "react";
import OpinionForm from "./OpinionForm";

type Opinion = {
  id: string;
  nombre: string;
  estrellas: number;
  opinion: string;
  created_at: string;
};

type Props = {
  tipo: "manual" | "sesion";
  slug?: string;
  title?: string;
};

function Estrellas({ value, white = false }: { value: number; white?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= value ? (white ? "#fff" : "#F59E0B") : "var(--border)",
            fontSize: "11px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ nombre }: { nombre: string }) {
  const initials = nombre
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
      style={{ background: "#E1F5EE", color: "#0F6E56" }}
    >
      {initials}
    </div>
  );
}

export default function Opiniones({ tipo, slug, title = "Opiniones" }: Props) {
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ tipo });
    if (slug) params.set("slug", slug);
    fetch(`/api/opiniones?${params}`)
      .then((r) => r.json())
      .then((d) => setOpiniones(d.opiniones ?? []))
      .finally(() => setLoading(false));
  }, [tipo, slug]);

  const [destacada, ...resto] = opiniones;

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-full text-xs px-4 py-2 transition-colors"
          style={{ border: "0.5px solid var(--border)", color: "var(--text-secondary)" }}
        >
          {showForm ? "Cancelar" : "Dejar opinión"}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
        >
          <OpinionForm tipo={tipo} slug={slug} />
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          Cargando opiniones...
        </p>
      ) : opiniones.length === 0 ? (

        /* ── Empty state opción C ── */
        <div
          className="rounded-2xl text-center"
          style={{ border: "0.5px dashed #5DCAA5", padding: "2.5rem 2rem" }}
        >
          {/* Avatares placeholder apilados */}
          <div className="flex justify-center mb-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center font-medium"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#E1F5EE",
                  border: "2px solid var(--bg-base, #F8F5F0)",
                  color: "#0F6E56",
                  fontSize: 13,
                  marginRight: i < 2 ? -10 : 0,
                  zIndex: 3 - i,
                  position: "relative",
                }}
              >
                ?
              </div>
            ))}
          </div>

          <p
            className="font-medium mb-1"
            style={{ fontSize: 14, color: "var(--text-primary)" }}
          >
            Aún no hay opiniones
          </p>
          <p
            className="mx-auto mb-5"
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              maxWidth: 240,
            }}
          >
            ¿Cómo fue tu experiencia? Tu opinión le abre la puerta a alguien más.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-full font-medium transition-opacity hover:opacity-90"
            style={{
              background: "#1D9E75",
              color: "#fff",
              border: "none",
              fontSize: 12,
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            Compartir mi experiencia
          </button>
        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">

            {/* Destacada en verde */}
            {destacada && (
              <div className="rounded-2xl p-5" style={{ background: "#1D9E75" }}>
                <Estrellas value={destacada.estrellas} white />
                <p
                  className="text-sm leading-relaxed mt-3 italic"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  "{destacada.opinion}"
                </p>
                <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  — {destacada.nombre}
                </p>
              </div>
            )}

            {/* Resto columna izquierda */}
            {resto.filter((_, i) => i % 2 === 1).map((o) => (
              <div
                key={o.id}
                className="rounded-2xl p-4"
                style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar nombre={o.nombre} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {o.nombre}
                    </p>
                    <Estrellas value={o.estrellas} />
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {o.opinion}
                </p>
              </div>
            ))}
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            {resto.filter((_, i) => i % 2 === 0).map((o) => (
              <div
                key={o.id}
                className="rounded-2xl p-4"
                style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar nombre={o.nombre} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {o.nombre}
                    </p>
                    <Estrellas value={o.estrellas} />
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {o.opinion}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}