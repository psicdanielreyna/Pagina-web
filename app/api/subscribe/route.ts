// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

const {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  FROM_EMAIL,
  SEND_EMAILS,
  DOWNLOAD_TOKEN_SECRET,
} = process.env;

// Util: base URL confiable según entorno
function getBaseUrl(req: Request) {
  // En producción detrás de Netlify / Vercel
  const hdr = (name: string) => (req.headers.get(name) || "").trim();
  const proto = hdr("x-forwarded-proto") || "https";
  const host = hdr("x-forwarded-host") || hdr("host") || "localhost:3000";
  return `${proto}://${host}`;
}

// Firma un token JWT por 7 días
function signDownloadToken(email: string) {
  if (!DOWNLOAD_TOKEN_SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET");
  return jwt.sign({ email }, DOWNLOAD_TOKEN_SECRET, { expiresIn: "7d" });
}

function bool(x: unknown) {
  return String(x).toLowerCase() === "true";
}

function ok(data: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...data }, { status: 200 });
}
function fail(status: number, message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error: { message }, ...extra }, { status });
}

export async function GET(req: Request) {
  // Endpoint de salud y debug rápido
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
    const { email } = await req.json().catch(() => ({} as any));
    if (!email || typeof email !== "string") {
      return fail(400, "Email requerido");
    }
    const cleanEmail = email.trim().toLowerCase();

    if (!RESEND_API_KEY) return fail(500, "Falta RESEND_API_KEY");
    if (!RESEND_AUDIENCE_ID) return fail(500, "Falta RESEND_AUDIENCE_ID");

    const resend = new Resend(RESEND_API_KEY);

    // 1) Alta/actualización del contacto
    let already = false;
    try {
      const addRes = await resend.contacts.create({
        audienceId: RESEND_AUDIENCE_ID,
        email: cleanEmail,
        unsubscribed: false,
      });
      // 201 = creado; 200/204 también son OK en algunos SDK, por si acaso:
      if (addRes.error) {
        // si Resend devuelve error de duplicado, lo tratamos como ya suscrito
        if (String(addRes.error?.message || "").toLowerCase().includes("already")) {
          already = true;
        } else {
          return fail(502, addRes.error.message || "Error creando contacto en Resend");
        }
      }
    } catch (e: any) {
      // Si es duplicado (409), lo consideramos éxito amable
      const msg = String(e?.message || "");
      if (msg.includes("409") || msg.toLowerCase().includes("already")) {
        already = true;
      } else {
        return fail(502, "No se pudo crear el contacto en Resend");
      }
    }

    // 2) Enviar email de bienvenida (si está activado)
    if (bool(SEND_EMAILS)) {
      if (!FROM_EMAIL) return fail(500, "Falta FROM_EMAIL");
      if (!DOWNLOAD_TOKEN_SECRET) return fail(500, "Falta DOWNLOAD_TOKEN_SECRET");

      const token = signDownloadToken(cleanEmail);
      const base = getBaseUrl(req);
      const link = `${base}/api/download?token=${encodeURIComponent(token)}`;

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
        to: cleanEmail,
        subject: "¡Bienvenido! Aquí tu mini guía anti-estrés",
        html,
      });
    }

    // 3) Respuesta uniforme para el front
    return ok({ message: already ? "Ya suscrito" : "Suscripción creada", already });
  } catch (e: any) {
    return fail(500, "Error interno en el servidor");
  }
}