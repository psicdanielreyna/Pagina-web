// app/descargar/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
  title: "Descargar mini guía",
  description:
    "Accede a tu mini guía gratuita anti-estrés, exclusiva para suscriptores del newsletter.",
  robots: { index: false, follow: false },
};

async function verify(token: string | null) {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.DOWNLOAD_TOKEN_SECRET || "");
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function DescargarPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token || null;
  const ok = await verify(token);

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      {ok ? (
        <>
          <h1 className="text-3xl font-bold mb-3">¡Listo! 🎁</h1>
          <p className="text-zinc-600 mb-6">
            Gracias por suscribirte. Da clic abajo para descargar tu{" "}
            <strong>mini guía anti-estrés</strong>.
          </p>
          <a
            className="inline-flex items-center justify-center rounded-md bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800 transition"
            href={`/api/download?token=${encodeURIComponent(token!)}`}
          >
            Descargar mini guía
          </a>
          <p className="mt-6 text-sm text-zinc-500">
            ¿Problemas con el enlace? Responde al correo de bienvenida y te ayudaré.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-3">Enlace no válido o caducado</h1>
          <p className="text-zinc-600 mb-6">
            Vuelve a suscribirte al newsletter para generar un enlace nuevo y recibir tu guía.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center justify-center rounded-md border px-6 py-2 font-medium hover:bg-zinc-50 transition"
          >
            Ir al newsletter
          </Link>
        </>
      )}
    </main>
  );
}