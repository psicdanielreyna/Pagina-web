// app/api/subscribe/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs"; // por si acaso

// ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL = process.env.FROM_EMAIL!;                  // ej: "Daniel <daniel@danielreyna.com>"
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;        // cadena fuerte (≥32 chars)
const SEND_EMAILS = process.env.SEND_EMAILS === "true";      // true en producción si quieres enviar

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function rFetch(path: string, init: RequestInit) {
  // helper REST contra Resend
  return fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function POST(req: Request) {
  try {
    // ---- leer email (form o json) + honeypot ----
    let email = "";
    let company = "";

    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("multipart/form-data")) {
      const fd = await req.formData();
      email = String(fd.get("email") || "").trim().toLowerCase();
      company = String(fd.get("company") || "");
    } else {
      const j = await req.json().catch(() => ({}));
      email = String(j?.email || "").trim().toLowerCase();
      company = String(j?.company || "");
    }

    if (company) return NextResponse.json({ ok: true }, { status: 200 }); // bot
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }

    // ---- crear/asegurar contacto (idempotente por 409) ----
    let alreadySubscribed = false;
    const addRes = await rFetch(`/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!addRes.ok) {
      if (addRes.status === 409) {
        // ya existía → no reenviar bienvenida
        alreadySubscribed = true;
      } else {
        const t = await addRes.text().catch(() => "");
        console.error("[subscribe] crear contacto:", addRes.status, t);
        return NextResponse.json({ ok: false, error: "No se pudo registrar" }, { status: 502 });
      }
    }

    // ---- token + link de descarga (7 días) ----
    const token = jwt.sign({ email }, DL_SECRET, { expiresIn: "7d" });
    const base =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
      "https://danielreyna.com";
    const downloadUrl = `${base}/api/download?token=${token}`;

    // ---- enviar bienvenida solo si es alta nueva ----
    let deferred = false;
    if (!alreadySubscribed) {
      if (SEND_EMAILS) {
        const body = {
          from: FROM_EMAIL,
          to: email,
          subject: "¡Bienvenido! Aquí tu mini guía anti-estrés",
          html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
              <h2>¡Gracias por suscribirte!</h2>
              <p>Te agregué al newsletter. Aquí puedes descargar tu mini guía:</p>
              <p style="margin:16px 0">
                <a href="${downloadUrl}" style="display:inline-block;background:#14532d;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none">
                  Descargar mini guía (PDF)
                </a>
              </p>
              <p style="font-size:12px;color:#667085">El enlace expira en 7 días. Si no funciona, copia y pega:<br>${downloadUrl}</p>
              <p>Abrazo,<br/>Daniel</p>
            </div>
          `,
        };

        // pequeño backoff por si 429
        let ok = false;
        for (let i = 0; i < 2; i++) {
          const res = await rFetch("/emails", { method: "POST", body: JSON.stringify(body) });
          if (res.ok) {
            ok = true;
            break;
          }
          if (res.status === 429) {
            await new Promise((r) => setTimeout(r, 700 * (i + 1)));
            continue;
          }
          console.error("[subscribe] enviar email:", res.status, await res.text().catch(() => ""));
          break;
        }
        if (!ok) deferred = true;
      } else {
        // dev / desactivado
        console.log("[DEV] SEND_EMAILS=false → NO se envía correo");
        console.log("[DEV] Link de descarga:", downloadUrl);
        deferred = true;
      }
    }

    return NextResponse.json(
      { ok: true, alreadySubscribed, deferred },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "No se pudo procesar la suscripción" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
