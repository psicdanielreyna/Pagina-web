// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Opcional: evita que Next intente prerender nada aquí
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // Si no hay credenciales, no revientes el build; simula éxito (dry-run)
    if (!key || !audienceId) {
      console.warn(
        "[newsletter] Falta RESEND_API_KEY o RESEND_AUDIENCE_ID. Dry-run activado."
      );
      return NextResponse.json({ ok: true, dryRun: true });
    }

    // 👇 Inicializa Resend SOLO dentro del handler (no en el tope del módulo)
    const resend = new Resend(key);

    await resend.contacts.create({ email, audienceId });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Error:", err);
    return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 });
  }
}
