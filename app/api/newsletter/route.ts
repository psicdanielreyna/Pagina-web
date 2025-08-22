// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Si estuvieras en edge runtimes, cámbialo a "edge". En Netlify/Node, así está bien.
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(String(email))) {
      return NextResponse.json(
        { message: "Correo inválido." },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json(
        {
          message:
            "Falta configurar RESEND_AUDIENCE_ID en variables de entorno.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });

    // Si Resend regresa conflicto (ya estaba suscrito), lo tratamos como OK
    if (error) {
      const msg = (error as any)?.message ?? "Error al suscribir.";
      if (/already exists|already subscribed|conflict/i.test(msg)) {
        return NextResponse.json({
          ok: true,
          already: true,
          message: "Ya estabas suscrito ✨",
        });
      }
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    return NextResponse.json(
      { ok: true, id: data?.id, message: "¡Listo! Te llegará el próximo correo 😊" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Solicitud inválida." },
      { status: 400 }
    );
  }
}
