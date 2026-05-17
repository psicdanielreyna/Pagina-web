"use client";
import { useState } from "react";

export default function BtnComprarProducto({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full rounded-full text-sm font-medium py-3 transition-colors disabled:opacity-60"
      style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
    >
      {loading ? "Redirigiendo..." : "Comprar ahora — tarjeta o transferencia"}
    </button>
  );
}