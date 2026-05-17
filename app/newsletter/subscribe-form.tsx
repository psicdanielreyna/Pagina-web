"use client";
import { useState, FormEvent, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "@/components/ThemeProvider";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) {
      setErr("Por favor completa la verificación de seguridad.");
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      fd.set("firstName", firstName.trim());
      fd.set("turnstileToken", turnstileToken);
      const res = await fetch("/api/subscribe", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo suscribir.");
      setOk(true);
      setEmail("");
      setFirstName("");
    } catch (e: any) {
      setErr(e?.message || "Ocurrió un error. Intenta de nuevo.");
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "var(--accent-light)", border: "0.5px solid var(--accent)" }}
      >
        <p className="text-lg mb-1">🎉</p>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--accent-text)" }}>¡Listo! Revisa tu correo</p>
        <p className="text-xs" style={{ color: "var(--accent-text)" }}>Ahí está tu mini guía anti-estrés.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 text-left">
      <input type="text" name="company" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Tu nombre"
        className="w-full rounded-full px-5 py-3 text-sm focus:outline-none transition-colors"
        style={{
          background: "var(--bg-primary)",
          border: "0.5px solid var(--border)",
          color: "var(--text-primary)",
        }}
      />

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

      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setTurnstileToken(token)}
        onExpire={() => setTurnstileToken(null)}
        options={{ theme: isDark ? "dark" : "light" }}
      />

      <button
        type="submit"
        disabled={loading || !turnstileToken}
        className="w-full rounded-full text-sm font-medium py-3 transition-colors disabled:opacity-60"
        style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
      >
        {loading ? "Verificando..." : "Suscribirme gratis →"}
      </button>

      {err && <p className="text-xs text-red-500 text-center">{err}</p>}
    </form>
  );
}