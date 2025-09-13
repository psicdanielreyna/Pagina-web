// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";

const API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL = process.env.FROM_EMAIL!; // ej: danielreyna@danielreyna.com
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

const resend = new Resend(API_KEY);

function isEmail(v: unknown) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    // 1) Lee body (form o json)
    let email = "";
    let form: FormData | null = null;

    try {
      form = await req.formData();
      email = ((form.get("email") as string) || "").trim().toLowerCase();
    } catch {
      const json = await req.json().catch(() => ({} as any));
      email = (json?.email || "").trim().toLowerCase();
    }

    // honeypot
    if (form?.get("company")) {
      return NextResponse.json({ ok: true, honey: true }, { status: 200 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }

    // 2) ¿Ya está en la audiencia? (dedupe)
    let alreadySubscribed = false;
    try {
      // Algunas versiones del SDK no permiten filtrar por email; listamos y buscamos.
      // Quitamos `limit` para evitar el error de tipos.
      const list = await resend.contacts.list({ audienceId: AUDIENCE_ID } as any);
      const items: any[] =
        (list as any)?.data?.items ??
        (list as any)?.data ??
        (list as any)?.items ??
        [];
      alreadySubscribed =
        Array.isArray(items) &&
        items.some((c: any) => (c?.email || "").toLowerCase() === email);
    } catch (e) {
      console.warn("[subscribe] no se pudo verificar existencia en audience:", e);
    }

    if (alreadySubscribed) {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // 3) Crea contacto (idempotente)
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    });

    // 4) Genera token (firmado con jose)
    const secret = new TextEncoder().encode(DL_SECRET);
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    const url = new URL("/descargar", "https://danielreyna.com");
    url.searchParams.set("t", token);

    // 5) Envía bienvenida
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido al newsletter!",
        html: `
          <p>Te suscribiste correctamente. Muy pronto recibirás contenido exclusivo.</p>
          <p>🎁 Aquí tienes tu mini guía anti-estrés:</p>
          <p><a href="${url.toString()}" target="_blank" rel="noopener">Descargar PDF</a></p>
          <p>Abrazo,<br/>Daniel</p>
        `,
      });

      return NextResponse.json(
        { ok: true, alreadySubscribed: false, emailed: true },
        { status: 200 }
      );
    } catch (err: any) {
      const code = err?.statusCode || err?.status || err?.code;
      console.error("[subscribe] send email error:", code, err?.message || err);
      // Si Resend limita (429), no rompemos la UX
      if (Number(code) === 429) {
        return NextResponse.json(
          { ok: true, alreadySubscribed: false, emailed: false, reason: "rate_limited" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { ok: true, alreadySubscribed: false, emailed: false, reason: "send_failed" },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.error("[subscribe] fatal error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "No se pudo procesar la suscripción" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}