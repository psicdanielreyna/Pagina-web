// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // ⚠️ NO instancies Resend a nivel de módulo.
    const key = process.env.RESEND_API_KEY;

    // Si no hay API key en build/local, no truena: simula éxito.
    if (!key) {
      // Opcional: registra en consola para debug
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(key);

    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) =>
        fd.append(k, v),
      );
      return fd;
    });

    const email = (form.get("email") as string | null) ?? "";
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });
    }

    // 👉 tu lógica real aquí (guardar en lista, enviar confirmación, etc.)
    // Ejemplo mínimo: enviar correo de bienvenida
    await resend.emails.send({
      from: "Daniel Reyna <notificaciones@tudominio.com>",
      to: email,
      subject: "¡Gracias por suscribirte!",
      html: "<p>Te has suscrito correctamente al newsletter.</p>",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ ok: false, error: "Error del servidor" }, { status: 500 });
  }
}

// (Opcional) si tienes GET para healthcheck:
export async function GET() {
  return NextResponse.json({ ok: true });
}