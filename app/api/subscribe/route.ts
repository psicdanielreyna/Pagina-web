import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY || !audienceId) {
    return NextResponse.json(
      { ok: false, message: "Faltan variables de entorno de Resend." },
      { status: 500 }
    );
  }

  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Email inválido." },
        { status: 400 }
      );
    }

    // Crear/añadir contacto al Audience
    const result = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });

    // Si Resend devuelve un error de duplicado, lo tratamos como éxito "idempotente"
    if ("error" in result && result.error) {
      // Resend suele dar 409/duplicate — normalizamos respuesta
      const message =
        result.error.message?.toLowerCase().includes("already exists")
          ? "Ya estabas suscrit@. ¡Gracias!"
          : `No pude suscribirte: ${result.error.message}`;

      // Si fue duplicado, 200. Si fue otro error, 400.
      const isDuplicate = /exist/i.test(result.error.message || "");
      return NextResponse.json(
        { ok: isDuplicate, message },
        { status: isDuplicate ? 200 : 400 }
      );
    }

    // (Opcional) Enviar correo de bienvenida
    // if (process.env.FROM_EMAIL) {
    //   await resend.emails.send({
    //     from: process.env.FROM_EMAIL,
    //     to: email,
    //     subject: "¡Bienvenid@ al newsletter!",
    //     html: `<p>Gracias por suscribirte. Pronto recibirás consejos breves y útiles ✨</p>`,
    //   });
    // }

    return NextResponse.json(
      { ok: true, message: "Suscripción exitosa. ¡Bienvenid@!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        message:
          err?.message || "Error inesperado al suscribir. Intenta más tarde.",
      },
      { status: 500 }
    );
  }
}
