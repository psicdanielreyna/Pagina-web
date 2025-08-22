// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validaciones
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
      console.error("ENV MISSING", { hasAudience: !!audienceId, hasKey: !!apiKey });
      return NextResponse.json(
        { ok: false, message: "Faltan variables de entorno en el servidor." },
        { status: 500 }
      );
    }

    const url = `https://api.resend.com/audiences/${audienceId}/contacts`;
    const body = { email: trimmed, unsubscribed: false };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    // Intenta parsear json; si no hay, crea uno básico
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = { raw: await res.text() };
    }

    // Log detallado al server log de Netlify
    if (!res.ok) {
      console.error("RESEND ERROR", {
        status: res.status,
        statusText: res.statusText,
        data,
      });

      const msg =
        data?.error?.message ||
        data?.message ||
        data?.raw ||
        "No se pudo suscribir (error desconocido).";

      return NextResponse.json({ ok: false, message: msg }, { status: res.status });
    }

    return NextResponse.json({ ok: true, message: "¡Te suscribiste con éxito!" });
  } catch (err: any) {
    console.error("ROUTE CATCH", err);
    return NextResponse.json(
      { ok: false, message: "Ocurrió un error. Intenta más tarde." },
      { status: 500 }
    );
  }
}
