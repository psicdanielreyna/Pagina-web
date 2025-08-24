// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend.server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // solo creamos el cliente si hay key
    const resend = await getResend();
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resend || !audienceId) {
      console.warn("[newsletter] Falta RESEND_API_KEY/AUDIENCE_ID. Dry-run.");
      return NextResponse.json({ ok: true, dryRun: true });
    }

    await resend.contacts.create({ email, audienceId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Error:", err);
    return NextResponse.json({ error: "No se pudo suscribir" }, { status: 500 });
  }
}
