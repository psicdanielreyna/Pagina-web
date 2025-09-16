import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Helpers
const ok = (payload: Record<string, unknown> = {}, status = 200) =>
  NextResponse.json({ ok: true, ...payload }, { status });

const fail = (status: number, message: string, extra?: any) =>
  NextResponse.json({ ok: false, error: { message, extra } }, { status });

// ---------- Healthcheck + debug ----------
export async function GET(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  const payload: any = {
    msg: "subscribe endpoint alive",
    hasKey: !!process.env.RESEND_API_KEY,
    audienceLen: process.env.RESEND_AUDIENCE_ID?.length || 0,
  };

  if (debug) {
    payload.nodeEnv = process.env.NODE_ENV;
    payload.sendEmails = process.env.SEND_EMAILS;
  }

  return ok(payload);
}

// ---------- Subscribe ----------
export async function POST(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  try {
    // 1) Obtener email (JSON o form-data)
    const ctype = req.headers.get("content-type") || "";
    let email: string | undefined;

    if (ctype.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = typeof body?.email === "string" ? body.email.trim() : undefined;
    } else if (ctype.includes("multipart/form-data") || ctype.includes("application/x-www-form-urlencoded")) {
      const fd = await req.formData().catch(() => null);
      const val = fd?.get("email");
      email = typeof val === "string" ? val.trim() : undefined;
    }

    if (!email) return fail(400, "Email requerido");

    // 2) Variables requeridas para Resend
    const API = process.env.RESEND_API_KEY;
    const AUD = process.env.RESEND_AUDIENCE_ID;

    // Si faltan, NO lanzamos 500; devolvemos éxito con detalle para UI+debug
    if (!API || !AUD) {
      const reason = !API && !AUD
        ? "Faltan RESEND_API_KEY y RESEND_AUDIENCE_ID"
        : !API
        ? "Falta RESEND_API_KEY"
        : "Falta RESEND_AUDIENCE_ID";

      console.warn("[SUBSCRIBE] No se llamó a Resend:", reason);
      return ok({ msg: "Recibido. No se envió a Resend por configuración.", sent: false, reason, email });
    }

    // 3) Llamar SIEMPRE a Resend (si hay credenciales)
    console.log("[SUBSCRIBE] POST Resend → contacts.create", { email, audience: AUD.slice(0, 8) + "…" });

    const resp = await fetch(`https://api.resend.com/audiences/${AUD}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    const data: any = await resp.json().catch(() => ({}));
    console.log("[SUBSCRIBE] Resend status:", resp.status, "data:", data);

    // 4) Éxito / idempotencia
    if (resp.ok) {
      const payload: any = { msg: "Suscripción exitosa", sent: true, contact: data };
      if (debug) payload.debug = { status: resp.status };
      return ok(payload, 200);
    }

    const msg = String(data?.message || "").toLowerCase();
    if (msg.includes("exists") || msg.includes("already")) {
      const payload: any = { msg: "Ya estabas suscrito", sent: true, already: true };
      if (debug) payload.debug = { status: resp.status, raw: data };
      return ok(payload, 200);
    }

    // 5) Error desde Resend (devolvemos 200 con sent:false y razón clara)
    const reason = data?.message || "Error desde Resend";
    return ok({ msg: "No se pudo suscribir en Resend", sent: false, reason, email, raw: debug ? data : undefined });

  } catch (err: any) {
    console.error("[SUBSCRIBE ERROR]", err);
    // Errores inesperados del runtime sí son 500
    return fail(500, "Error interno en el servidor", String(err?.message || err));
  }
}