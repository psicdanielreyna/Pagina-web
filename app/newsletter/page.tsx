// app/newsletter/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { SubscribeForm } from "./subscribe-form"; // importamos el client componentr
export const metadata: Metadata = {
  title: "Newsletter | Daniel Reyna – Psicólogo",
  description:
    "Únete a mi newsletter y recibe ideas y recursos prácticos sobre ansiedad, estrés, autoestima y más.",
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
            src="/newsletter/hero.jpg" // coloca la imagen en public/newsletter/hero.jpg
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
              Únete y recibe <strong>ideas breves y accionables</strong> sobre
              ansiedad, estrés y bienestar, además de recursos descargables.
            </p>
          </header>

          <SubscribeForm />

          <p className="mt-4 text-xs text-muted-foreground">
            Puedes darte de baja cuando quieras. Al suscribirte aceptas la{" "}
            <a className="underline hover:no-underline" href="/legal#privacidad">
              política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}