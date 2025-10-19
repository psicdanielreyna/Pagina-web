// app/newsletter/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { useState, FormEvent } from "react";

export const metadata: Metadata = {
  title: "Newsletter | Daniel Reyna – Psicólogo",
  description:
    "Únete a mi newsletter y recibe ideas, recursos y guías prácticas sobre ansiedad, estrés, autoestima y más. En tu correo, sin spam.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter de Daniel Reyna",
    description:
      "Ideas y recursos prácticos sobre salud mental. Suscríbete gratis.",
    url: "/newsletter",
    type: "website",
  },
};

export default function NewsletterPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid items-stretch gap-8 rounded-xl border bg-background p-4 shadow-sm md:grid-cols-2 md:p-6">
        {/* Foto (izquierda) */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg md:aspect-auto md:h-[560px]">
          <Image
            src="/newsletter/hero.jpg" // coloca tu foto en public/newsletter/hero.jpg
            alt="Daniel Reyna en exterior"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Formulario (derecha) */}
        <div className="flex w-full flex-col justify-center p-1 md:p-6">
          <header className="mb-6">
            <p className="text-sm text-muted-foreground">El newsletter de</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
              Daniel Reyna
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Únete a mi lista y recibe{" "}
              <strong>ideas breves y accionables</strong> sobre ansiedad,
              estrés y bienestar, además de recursos descargables.
            </p>
          </header>

          <SubscribeForm />

          <p className="mt-4 text-xs text-muted-foreground">
            Puedes darte de baja cuando quieras. Al suscribirte aceptas la{" "}
            <a
              className="underline hover:no-underline"
              href="/legal#privacidad"
            >
              política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

/** Form envía POST a /api/subscribe (ya existente) */
function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      // Tu API solo necesita email; enviamos también el nombre por si luego lo guardas
      const fd = new FormData();
      fd.set("email", email.trim().toLowerCase());
      fd.set("firstName", firstName.trim());

      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || "No se pudo suscribir.");
      }

      setOk("¡Listo! Revisa tu correo para confirmar y recibir la mini guía.");
      setEmail("");
      setFirstName("");
    } catch (e: any) {
      setErr(e?.message || "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot anti-bots */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Primer nombre</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none ring-0 focus:border-foreground/50"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-md border bg-background px-3 py-2 outline-none ring-0 focus:border-foreground/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "¡Suscribirme!"}
      </button>

      {ok && <p className="text-sm text-emerald-600">{ok}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      <p className="text-xs text-muted-foreground">
        Al suscribirte recibirás la{" "}
        <a className="underline" href="/downloads/mini-guia-anti-estres.pdf">
          mini guía anti-estrés (PDF)
        </a>{" "}
        en tu correo.
      </p>
    </form>
  );
}