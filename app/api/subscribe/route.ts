import { NextResponse } from "next/server";
export const runtime = "nodejs";

function ok(data: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...data }, { status: 200 });
}
function fail(status: number, message: string, extra?: any) {
  return NextResponse.json({ ok: false, error: { message, extra } }, { status });
}

export async function GET() {
  return ok({ msg: "subscribe endpoint alive" });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json().catch(() => ({}));
    if (!email || typeof email !== "string") {
      return fail(400, "Email requerido");
    }

    if (process.env.SEND_EMAILS !== "true") {
      console.log("[DEV] SEND_EMAILS=false → simulando:", email);
      return ok({ dev: true, msg: "Simulación (no se contactó Resend)" });
    }

    const API = process.env.RESEND_API_KEY;
    const AUD = process.env.RESEND_AUDIENCE_ID;
    if (!API || !AUD) return fail(500, "Faltan RESEND_API_KEY / RESEND_AUDIENCE_ID");

    const url = `https://api.resend.com/audiences/${AUD}/contacts`;
    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    const json: any = await r.json().catch(() => ({}));

    // Éxito real
    if (r.ok) return ok({ contact: json, msg: "Suscripción exitosa" });

    // Idempotencia: si ya existe
    const msg = String(json?.message || "").toLowerCase();
    if (msg.includes("exists") || msg.includes("already")) {
      return ok({ already: true, msg: "Ya estabas suscrito" });
    }

    return fail(502, "Error al suscribir en Resend", json);
  } catch (err: any) {
    console.error("[SUBSCRIBE] error:", err);
    return fail(500, "Error inesperado", String(err?.message || err));
  }
}