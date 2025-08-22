// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import NewsletterWelcome from "@/emails/NewsletterWelcome";

const FROM = process.env.FROM_EMAIL;              // "Nombre <news@tu-dominio.com>"
const OWNER_EMAIL = "hola@tu-dominio.com";        // Opcional: notifícate cuando haya nueva suscripción

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }
    if (!FROM) {
      return NextResponse.json(
        { ok: false, error: "FROM_EMAIL no configurado en variables de entorno" },
        { status: 500 }
      );
    }

    // 1) Email de bienvenida al suscriptor
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "¡Bienvenid@ al newsletter!",
      react: NewsletterWelcome({ email }),
    });

    // 2) (Opcional) Notificación interna para ti
    if (OWNER_EMAIL) {
      await resend.emails.send({
        from: FROM,
        to: OWNER_EMAIL,
        subject: "Nueva suscripción al newsletter",
        text: `Se suscribió: ${email}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ ok: false, error: "Error enviando correo" }, { status: 500 });
  }
}
