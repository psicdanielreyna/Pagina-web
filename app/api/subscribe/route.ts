// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL = process.env.FROM_EMAIL!; // p.ej. "danielreyna@danielreyna.com"
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

const resend = new Resend(API_KEY);

function isEmail(v: unknown) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// pequeña ayuda para reintentos (p. ej. 429)
async function withRetry<T>(fn: () => Promise<T>, retries = 2, baseMs = 500): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err?.status || err?.response?.status;
      if (attempt >= retries || (status && status !== 429)) throw err;
      const wait = baseMs * Math.pow(2, attempt); // 500ms, 1000ms...
      await new Promise((r) => setTimeout(r, wait));
      attempt++;
    }
  }
}

export async function POST(req: Request) {
  try {
    // 1) Lee body (form o json)
    let email = "";
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const fd = await req.formData();
      email = String(fd.get("email") || "").trim().toLowerCase();
      // honeypot
      if (fd.get("company")) return NextResponse.json({ ok: true }, { status: 200 });
    } else {
      const body = await req.json().catch(() => ({}));
      email = String(body?.email || "").trim().toLowerCase();
    }

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "email inválido" }, { status: 400 });
    }

    // 2) ¿ya existe en la audiencia? (no uses 'limit', ya no está en el tipo)
    let already = false;
    try {
      const list = await withRetry(
        () => resend.contacts.list({ audienceId: AUDIENCE_ID }),
        1
      );
      const items: any[] = (list as any)?.data?.items ?? [];
      already = Array.isArray(items) && items.some((c: any) => (c.email || "").toLowerCase() === email);
    } catch (e) {
      console.warn("[subscribe] no se pudo verificar existencia en audience:", e);
    }

    // 3) si ya estaba, no reenvíes bienvenida
    if (already) {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // 4) crea/actualiza contacto
    await withRetry(
      () =>
        resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email,
          unsubscribed: false,
        }),
      1
    );

    // 5) genera token y link de descarga
    const token = jwt.sign({ email }, DL_SECRET, { expiresIn: "7d" }); // válido 7 días
    const downloadUrl = `https://danielreyna.com/api/download?token=${token}`;

    // 6) envía email de bienvenida con el link
    await withRetry(
      () =>
        resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "¡Bienvenido al newsletter! 🎁 Tu mini guía",
          text: [
            "Gracias por suscribirte 🙌",
            "",
            "Aquí tienes tu mini guía anti-estrés:",
            downloadUrl,
            "",
            "Si no fuiste tú, ignora este mensaje.",
            "",
            "Abrazo,",
            "Daniel",
          ].join("\n"),
          html: `
            <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#111">
              <h1 style="margin:0 0 12px">¡Bienvenido al newsletter! 🎉</h1>
              <p>Gracias por suscribirte. Aquí tienes tu mini guía anti-estrés:</p>
              <p>
                <a href="${downloadUrl}" style="display:inline-block;background:#14532d;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
                  Descargar mini guía (PDF)
                </a>
              </p>
              <p style="color:#555">El enlace expira en 7 días.</p>
              <p>Abrazo,<br/>Daniel</p>
            </div>
          `,
        }),
      2
    );

    return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "No se pudo procesar la suscripción" }, { status: 500 });
  }
}

// ping opcional
export async function GET() {
  return NextResponse.json({ ok: true });
}