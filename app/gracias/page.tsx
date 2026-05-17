"use client";
import Link from "next/link";
import { useState } from "react";

function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      if (res.ok) setOk(true);
    } catch {}
    finally { setLoading(false); }
  }

  if (ok) {
    return (
      <p className="text-sm text-center font-medium" style={{ color: "var(--accent)" }}>
        ¡Listo! Te esperamos en el inbox 🎉
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        className="w-full rounded-full px-5 py-3 text-sm focus:outline-none transition-colors"
        style={{
          background: "var(--bg-primary)",
          border: "0.5px solid var(--border)",
          color: "var(--text-primary)",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full text-sm font-medium py-3 transition-colors disabled:opacity-60"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        {loading ? "Enviando..." : "Suscribirme gratis →"}
      </button>
    </form>
  );
}

export default function GraciasPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl overflow-hidden" style={{ border: "0.5px solid var(--border)" }}>

          {/* Header */}
          <div
            className="px-10 py-14 text-center"
            style={{ background: "var(--bg-primary)", borderBottom: "0.5px solid var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "var(--accent-light)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              ¡Gracias por tu compra!
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              En unos minutos recibirás el link de descarga en tu correo.
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
              Revisa también tu carpeta de spam.
            </p>
          </div>

          {/* Upsell bundle */}
          <div
            className="px-8 py-6"
            style={{ background: "var(--bg-card)", borderBottom: "0.5px solid var(--border)" }}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  Aprovecha
                </span>
                <p className="text-sm font-medium mb-1 leading-snug" style={{ color: "var(--text-primary)" }}>
                  Pack completo — los 2 manuales
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  Ahorra $100 MXN comprando los dos.
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs line-through" style={{ color: "var(--text-tertiary)" }}>$498</p>
                <p className="text-lg font-medium mb-3" style={{ color: "var(--text-primary)" }}>$398 MXN</p>
                <Link
                  href="/checkout/bundle-completo"
                  className="inline-block rounded-full text-xs px-5 py-2 transition-colors"
                  style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                >
                  Agregar
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div
            className="px-8 py-6"
            style={{ background: "var(--bg-card)", borderBottom: "0.5px solid var(--border)" }}
          >
            <div className="max-w-md">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                Únete al newsletter
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-tertiary)" }}>
                Una idea práctica cada semana sobre ansiedad y bienestar.
              </p>
              <NewsletterInline />
            </div>
          </div>

          {/* CTAs */}
          <div className="px-8 py-6 flex gap-3" style={{ background: "var(--bg-card)" }}>
            <Link
              href="/tienda"
              className="rounded-full text-sm px-6 py-3 transition-colors"
              style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
            >
              Ver más recursos
            </Link>
            <Link
              href="/"
              className="rounded-full text-sm px-6 py-3 transition-colors"
              style={{ border: "0.5px solid var(--border)", color: "var(--text-secondary)" }}
            >
              Ir al inicio
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}