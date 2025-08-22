import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }

    // Envío de email (puedes cambiar el contenido)
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev", // en prod usa tu dominio verificado
      to: email,
      subject: "¡Gracias por suscribirte!",
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
          <h2>¡Bienvenido/a!</h2>
          <p>Gracias por unirte al newsletter de Daniel Reyna.</p>
          <p>Pronto te enviaré herramientas claras y aplicables 🙂</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Error enviando correo" }, { status: 500 });
  }
}
