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
      <p className="text-sm text-center font-medium" style={{ color: "#1D9E75" }}>
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
        className="w-full rounded-full border border-black/8 px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors"
        style={{ background: "#F8F5F0" }}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full text-white text-sm font-medium py-3 transition-colors disabled:opacity-60"
        style={{ background: "#1D9E75" }}
      >
        {loading ? "Enviando..." : "Suscribirme gratis →"}
      </button>
    </form>
  );
}

export default function GraciasPage() {
  return (
    <main style={{ background: "#F8F5F0" }} className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="border border-black/8 rounded-2xl overflow-hidden">

          {/* Header */}
          <div
            className="px-10 py-14 text-center border-b border-black/8"
            style={{ background: "#F8F5F0" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#E1F5EE" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium text-zinc-900 mb-2">¡Gracias por tu compra!</h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              En unos minutos recibirás el link de descarga en tu correo.
            </p>
            <p className="text-xs text-zinc-400 mt-1">Revisa también tu carpeta de spam.</p>
          </div>

          {/* Upsell bundle */}
          <div className="px-8 py-6 border-b border-black/8 bg-white">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
                  style={{ background: "#1D9E75", color: "#fff" }}
                >
                  Aprovecha
                </span>
                <p className="text-sm font-medium text-zinc-900 mb-1 leading-snug">
                  Pack completo — los 2 manuales
                </p>
                <p className="text-xs text-zinc-400">Ahorra $100 MXN comprando los dos.</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-zinc-400 line-through">$498</p>
                <p className="text-lg font-medium text-zinc-900 mb-3">$398 MXN</p>
                <Link
                  href="/checkout/bundle-completo"
                  className="inline-block rounded-full bg-zinc-900 text-white text-xs px-5 py-2 hover:bg-zinc-700 transition-colors"
                >
                  Agregar
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="px-8 py-6 border-b border-black/8 bg-white">
            <div className="max-w-md">
              <p className="text-sm font-medium text-zinc-900 mb-1">Únete al newsletter</p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Una idea práctica cada semana sobre ansiedad y bienestar.
              </p>
              <NewsletterInline />
            </div>
          </div>

          {/* CTAs */}
          <div className="px-8 py-6 flex gap-3 bg-white">
            <Link
              href="/tienda"
              className="rounded-full bg-zinc-900 text-white text-sm px-6 py-3 hover:bg-zinc-700 transition-colors"
            >
              Ver más recursos
            </Link>
            <Link
              href="/"
              className="rounded-full border border-black/8 text-zinc-500 text-sm px-6 py-3 hover:bg-black/5 transition-colors"
            >
              Ir al inicio
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}