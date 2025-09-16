import { NextResponse } from "next/server";

export const runtime = "nodejs";

// 🔎 Endpoint de prueba rápido
export async function GET() {
  return NextResponse.json({
    ok: true,
    msg: "subscribe endpoint alive",
    sendEmails: process.env.SEND_EMAILS,
    hasKey: !!process.env.RESEND_API_KEY,
    audienceLen: process.env.RESEND_AUDIENCE_ID?.length || 0,
  });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: { message: "Email requerido" } },
        { status: 400 }
      );
    }

    // 🛡 Validar envs
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.RESEND_AUDIENCE_ID ||
      process.env.SEND_EMAILS !== "true"
    ) {
      return NextResponse.json(
        { ok: false, error: { message: "Resend no está configurado en este entorno" } },
        { status: 500 }
      );
    }

    // 🔑 Llamada a Resend
    const resp = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            message: data?.message || "Error al suscribir en Resend",
          },
        },
        { status: resp.status }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        msg: "¡Suscripción completada! 🎉 Revisa tu correo.",
        contact: data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Subscribe error", err);
    return NextResponse.json(
      { ok: false, error: { message: "Error interno en el servidor" } },
      { status: 500 }
    );
  }
}