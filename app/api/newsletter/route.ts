// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

// evita cualquier caché/prerender
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 👇 NO importamos "resend" arriba.
// Lo haremos dinámico y solo si hay API key.
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // Sin credenciales => no romper build. Modo dry-run.
    if (!key || !audienceId) {
      console.warn("[newsletter] Falta RESEND_API_KEY/AUDIENCE_ID. Dry-run.");
      return NextResponse.json({ ok: true, dryRun: true });
    }

    // 👇 Import dinámico SOLO cuando hay credenciales
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    await resend.contacts.create({ email, audienceId });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Error:", err);
    return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 });
  }
}
