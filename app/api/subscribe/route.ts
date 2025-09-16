// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  FROM_EMAIL,
  SEND_EMAILS,
  DOWNLOAD_TOKEN_SECRET,
} = process.env;

function getBaseUrl(req: Request) {
  const h = (n: string) => (req.headers.get(n) || "").trim();
  const proto = h("x-forwarded-proto") || "https";
  const host = h("x-forwarded-host") || h("host") || "localhost:3000";
  return `${proto}://${host}`;
}
function signDownloadToken(email: string) {
  if (!DOWNLOAD_TOKEN_SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET");
  return jwt.sign({ email }, DOWNLOAD_TOKEN_SECRET, { expiresIn: "7d" });
}
const bool = (x: unknown) => String(x).toLowerCase() === "true";
const ok = (data: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: true, ...data }, { status: 200 });
const fail = (status: number, message: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error: { message }, ...extra }, { status });

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("debug") !== null) {
    return ok({
      msg: "subscribe endpoint alive",
      hasKey: !!RESEND_API_KEY,
      audienceLen: (RESEND_AUDIENCE_ID || "").length,
      nodeEnv: process.env.NODE_ENV,
      sendEmails: String(SEND_EMAILS),
      fromEmail: FROM_EMAIL ? "present" : "missing",
    });
  }
  return ok({ msg: "subscribe endpoint alive" });
}

export async function POST(req: Request) {
  try {
    // --- soportar JSON y FORM ---
    const ct = (req.headers.get("content-type") || "").toLowerCase();

    let email = "";
    if (ct.includes("application/json")) {
      const body = await req.json().catch(() => ({} as any));
      email = (body?.email || "").trim().toLowerCase();
    } else if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      // fallback: intentar JSON y luego form
      try {
        const body = await req.json();
        email = (body?.email || "").trim().toLowerCase();
      } catch {
        const form = await req.formData().catch(() => null);
        if (form) email = String(form.get("email") || "").trim().toLowerCase();
      }
    }

    if (!email) return fail(400, "Email requerido");

    if (!RESEND_API_KEY) return fail(500, "Falta RESEND_API_KEY");
    if (!RESEND_AUDIENCE_ID) return fail(500, "Falta RESEND_AUDIENCE_ID");

    const resend = new Resend(RESEND_API_KEY);

    // 1) Crear/asegurar contacto en la Audience
    let already = false;
    try {
      const add = await resend.contacts.create({
        audienceId: RESEND_AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
      if (add?.error) {
        const msg = (add.error.message || "").toLowerCase();
        if (msg.includes("already")) already = true;
        else return fail(502, add.error.message || "Error creando contacto en Resend");
      }
    } catch (e: any) {
      const emsg = String(e?.message || "").toLowerCase();
      if (emsg.includes("409") || emsg.includes("already")) {
        already = true;
      } else {
        return fail(502, "No se pudo crear el contacto en Resend");
      }
    }

    // 2) Enviar email de bienvenida (si SEND_EMAILS=true)
    if (bool(SEND_EMAILS)) {
      if (!FROM_EMAIL) return fail(500, "Falta FROM_EMAIL");
      if (!DOWNLOAD_TOKEN_SECRET) return fail(500, "Falta DOWNLOAD_TOKEN_SECRET");

      const token = signDownloadToken(email);
      const link = `${getBaseUrl(req)}/api/download?token=${encodeURIComponent(token)}`;

      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
          <h2>¡Gracias por suscribirte!</h2>
          <p>Te agregué al newsletter. Aquí puedes descargar tu mini guía:</p>
          <p>
            <a href="${link}" style="display:inline-block;background:#166534;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;">
              Descargar mini guía (PDF)
            </a>
          </p>
          <p style="font-size:13px;color:#555">
            El enlace expira en 7 días. Si no funciona, copia y pega:<br/>
            <span style="word-break:break-all">${link}</span>
          </p>
          <p>Abrazo,<br/>Daniel</p>
        </div>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido! Aquí tu mini guía anti-estrés",
        html,
      });
    }

    return ok({ message: already ? "Ya suscrito" : "Suscripción creada", already });
  } catch (e: any) {
    // ayuda a depurar en producción sin filtrar secretos
    return fail(500, "Error interno en el servidor");
  }
}