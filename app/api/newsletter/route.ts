// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validaciones básicas
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, message: "Email inválido." }, { status: 400 });
    }
    const trimmed = email.trim().toLowerCase();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) {
      return NextResponse.json({ ok: false, message: "Escribe un email válido." }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const apiKey = process.env.RESEND_API_KEY;

    if (!audienceId || !apiKey) {
      return NextResponse.json(
        { ok: false, message: "Faltan variables de entorno en el servidor." },
        { status: 500 }
      );
    }

    // Alta en Audience de Resend
    const url = `https://api.resend.com/audiences/a69a0508-2aa1-4455-8057-b5b797bd82f/contacts`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: trimmed,
        unsubscribed: false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Resend devuelve {error: {...}} cuando hay duplicado u otros errores
      const msg =
        (data?.error && (data.error.message || data.error.name)) ||
        "No se pudo suscribir.";
      return NextResponse.json({ ok: false, message: msg }, { status: res.status });
    }

    return NextResponse.json({ ok: true, message: "¡Te suscribiste con éxito!" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Ocurrió un error. Intenta más tarde." },
      { status: 500 }
    );
  }
}
