// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";

const API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "";
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "";

function normalizeEmail(v: string | null): string {
  return (v || "").trim().toLowerCase();
}

// crea un JWT (7 días) para descargar la mini-guía
async function makeDownloadToken(email: string) {
  if (!DL_SECRET) return null;
  const secret = new TextEncoder().encode(DL_SECRET);
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 días
  return await new SignJWT({ email, typ: "dl" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(secret);
}

export async function POST(req: Request) {
  try {
    // ---- leer form o json ----
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) =>
        fd.append(k, v)
      );
      return fd;
    });

    // honeypot
    if (form.get("company")) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = normalizeEmail(form.get("email") as string | null);
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email requerido" },
        { status: 400 }
      );
    }

    // Si no hay API key, no truena el build: responde OK mock.
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    // ---- DEDUP: ¿ya está en la audience? ----
    let already = false;
    if (AUDIENCE_ID) {
      try {
        // la SDK no expone filtro por email tipado; listamos y filtramos
        const list = await resend.contacts.list({
          audienceId: AUDIENCE_ID,
          // @ts-ignore: el SDK no tipa `limit`, pero API lo permite
          limit: 1000,
        } as any);

        const items =
          (list as any)?.data ??
          (list as any)?.items ??
          [];
        already =
          Array.isArray(items) &&
          items.some((c: any) => c?.email?.toLowerCase() === email);
      } catch (e) {
        console.warn(
          "[subscribe] No se pudo verificar existencia en audience:",
          e
        );
      }
    }

    // Si ya existía: no enviamos bienvenida de nuevo
    if (already) {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // ---- Alta (idempotente) en Audience si está configurada ----
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
    }

    // ---- Generar token y link de descarga ----
    const token = await makeDownloadToken(email);
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.com";
    // Opción A: página de aterrizaje con CTA
    const downloadPageUrl = token
      ? `${base}/descargar?token=${encodeURIComponent(token)}`
      : `${base}/descargar`;

    // ---- Enviar bienvenida + link ----
    if (FROM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido! Aquí tienes tu mini guía anti-estrés",
        html: `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5;">
    <h2 style="margin:0 0 12px;">¡Gracias por suscribirte!</h2>
    <p>Me alegra que te unas 😊. Como lo prometido es deuda, aquí puedes descargar la mini guía:</p>
    <p style="margin:16px 0;">
      <a href="${downloadPageUrl}"
         style="display:inline-block;background:#14532d;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;">
        Descargar mini guía
      </a>
    </p>
    <p style="color:#555;margin-top:18px;">Si no fuiste tú, ignora este correo.</p>
    <p>Abrazo,<br/>Daniel</p>
  </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 200 });
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