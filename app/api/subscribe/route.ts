// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";

// ---- ENV ----
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";
const FROM_EMAIL   = process.env.FROM_EMAIL || "";          // ej: 'Daniel Reyna <danielreyna@danielreyna.com>'
const API_KEY      = process.env.RESEND_API_KEY || "";
const DL_SECRET    = process.env.DOWNLOAD_TOKEN_SECRET || ""; // openssl rand -base64 32

// Helpers
async function createDownloadToken(email: string, expiresInDays = 7) {
  if (!DL_SECRET) throw new Error("DOWNLOAD_TOKEN_SECRET missing");
  const secret = new TextEncoder().encode(DL_SECRET);
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expiresInDays; // segundos
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
  return token;
}

export async function POST(req: Request) {
  try {
    // Soporta formData o JSON
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) => fd.append(k, v));
      return fd;
    });

    const email = (form.get("email") as string | null)?.trim().toLowerCase() ?? "";
    // Honeypot
    if (form.get("company")) return NextResponse.json({ ok: true }, { status: 200 });
    if (!email) return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });

    // Construye URL absoluta del sitio (prod o preview/local)
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

    // Genera token de descarga (7 días)
    const token = await createDownloadToken(email, 7);
    const downloadUrl = `${origin}/descargar?token=${encodeURIComponent(token)}`;

    // Si no hay API key, no truenes el build: responde mock
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true, downloadUrl }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    // 1) Agrega/actualiza contacto en Audience (idempotente)
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
    }

    // 2) Email de bienvenida con link de descarga
    if (FROM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido! Aquí está tu mini guía anti-estrés",
        text: `¡Gracias por suscribirte!
        
Descarga tu mini guía aquí (válido por 7 días):
${downloadUrl}

Si no fuiste tú, ignora este correo.
Abrazo,
Daniel`,
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5">
            <h2 style="margin:0 0 8px">¡Gracias por suscribirte!</h2>
            <p>Como lo prometido es deuda, aquí está tu mini guía anti-estrés (el enlace vence en 7 días):</p>
            <p>
              <a href="${downloadUrl}" 
                 style="display:inline-block;padding:12px 18px;border-radius:8px;background:#14532d;color:#fff;text-decoration:none;font-weight:600">
                Descargar mini guía
              </a>
            </p>
            <p style="color:#475569;font-size:14px">Si el botón no funciona, copia y pega este enlace:<br/>
              <span style="word-break:break-all">${downloadUrl}</span>
            </p>
            <p>Abrazo,<br/>Daniel</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar/guardar" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}