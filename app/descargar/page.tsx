// app/descargar/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
  title: "Descargar mini guía",
  robots: { index: false, follow: false }, // noindex
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
    <main className="mx-auto max-w-2xl px-4 py-16">
      {ok ? (
        <>
          <h1 className="text-3xl font-bold mb-3">¡Listo! 🎁</h1>
          <p className="text-zinc-600 mb-6">
            Gracias por suscribirte. Da clic abajo para descargar tu mini guía anti-estrés.
          </p>
          <a
            className="inline-flex items-center rounded-md bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800"
            href={`/api/download?token=${encodeURIComponent(token!)}`}
          >
            Descargar mini guía
          </a>
          <p className="mt-6 text-sm text-zinc-500">
            ¿Problemas con el enlace? Responde al correo de bienvenida y te ayudo.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-3">Enlace no válido o caducado</h1>
          <p className="text-zinc-600 mb-6">
            Vuelve a suscribirte al newsletter para generar un enlace nuevo.
          </p>
          <Link
            className="inline-flex items-center rounded-md border px-4 py-2 font-medium hover:bg-zinc-50"
            href="/#newsletter"
          >
            Ir al newsletter
          </Link>
        </>
      )}
    </main>
  );
}