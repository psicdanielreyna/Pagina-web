import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

const resend = new Resend(API_KEY);

function isEmail(v: unknown) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let email = (body?.email || "").toLowerCase();

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }

    // 1. Checar si ya está en la audiencia
    let alreadySubscribed = false;
    if (AUDIENCE_ID) {
      try {
        const list = await resend.contacts.list({ audienceId: AUDIENCE_ID });
        const items: any[] = (list as any)?.data?.items ?? [];
        alreadySubscribed = Array.isArray(items) && items.some((c: any) => (c.email || "").toLowerCase() === email);
      } catch (e) {
        console.warn("[subscribe] fallo al listar audiencia:", e);
      }
    }

    if (alreadySubscribed) {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // 2. Agregar al contacto
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
      });
    }

    // 3. Generar token de descarga
    const token = jwt.sign({ email }, DL_SECRET, { expiresIn: "7d" });
    const downloadUrl = `https://danielreyna.com/api/download?token=${token}`;

    // 4. Mandar email sólo si está permitido
    if (process.env.SEND_EMAILS === "true") {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Bienvenido a la Newsletter ✨",
        html: `
          <p>Gracias por suscribirte 🎉</p>
          <p>Descarga tu mini guía aquí:</p>
          <p><a href="${downloadUrl}">Descargar mini guía anti-estrés</a></p>
        `,
      });
    } else {
      console.log("[DEV] Email no enviado porque SEND_EMAILS está en false");
      console.log("[DEV] Link de descarga:", downloadUrl);
    }

    return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ ok: false, error: "No se pudo procesar la suscripción" }, { status: 500 });
  }
}

// endpoint para ping (útil para probar)
export async function GET() {
  return NextResponse.json({ ok: true });
}