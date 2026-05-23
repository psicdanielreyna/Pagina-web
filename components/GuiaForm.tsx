"use client";

import { useState } from "react";

export default function GuiaForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit() {
    if (!nombre || !email) return;
    setEstado("loading");

    const res = await fetch("/api/guia-burnout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    });

    setEstado(res.ok ? "ok" : "error");
  }

  if (estado === "ok") {
    return (
      <div style={styles.box}>
        <p style={styles.success}>
          ✓ Listo, <strong>{nombre}</strong>. Revisa tu correo — la guía ya está en camino.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.box}>
      <p style={styles.label}>Descarga gratis la Guía de Autoevaluación de Burnout</p>
      <input
        style={styles.input}
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        style={styles.input}
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        style={estado === "loading" ? { ...styles.btn, opacity: 0.7 } : styles.btn}
        onClick={handleSubmit}
        disabled={estado === "loading"}
      >
        {estado === "loading" ? "Enviando..." : "Quiero mi guía →"}
      </button>
      {estado === "error" && (
        <p style={styles.error}>Algo salió mal. Intenta de nuevo.</p>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  box: {
    background: "#F7F3EE",
    borderRadius: 16,
    padding: "32px 28px",
    maxWidth: 420,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    color: "#1C1008",
    margin: 0,
    lineHeight: 1.4,
  },
  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #E8C9A0",
    fontSize: 14,
    color: "#1C1008",
    background: "#fff",
    outline: "none",
  },
  btn: {
    padding: "13px 20px",
    borderRadius: 10,
    background: "#B5763A",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    marginTop: 4,
  },
  success: {
    color: "#0F6E56",
    fontSize: 15,
    margin: 0,
    lineHeight: 1.5,
  },
  error: {
    color: "#C05030",
    fontSize: 13,
    margin: 0,
  },
};