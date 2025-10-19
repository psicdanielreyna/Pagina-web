// app/unsubscribe/page.tsx
import type { Metadata } from "next";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = {
  title: "Darse de baja | Daniel Reyna – Psicólogo",
  description:
    "Gestiona tu suscripción y deja de recibir correos cuando quieras.",
  alternates: { canonical: "/unsubscribe" },
  openGraph: {
    title: "Darse de baja del newsletter",
    description: "Gestiona tu suscripción cuando lo necesites.",
    url: "/unsubscribe",
    type: "website",
  },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const initialEmail =
    typeof searchParams?.email === "string" ? searchParams.email : "";

  return (
    <main className="mx-auto max-w-lg px-4 py-12 text-center">
      <h1 className="text-3xl font-extrabold">Darse de baja</h1>
      <p className="mt-2 text-muted-foreground">
        Lamentamos verte partir 😔. Ingresa tu correo para dejar de recibir
        mensajes.
      </p>

      <div className="mt-6">
        <UnsubscribeForm initialEmail={initialEmail} />
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Si cambias de opinión, puedes volver a{" "}
        <a href="/newsletter" className="underline">
          suscribirte aquí
        </a>
        .
      </p>
    </main>
  );
}