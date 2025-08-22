// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// Asegúrate de tener estas 2 vars en Netlify:
// RESEND_API_KEY y RESEND_AUDIENCE_ID
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
// Y define también FROM_EMAIL (ej: "Daniel Reyna <news@tudominio.com>")
const FROM_EMAIL = process.env.FROM_EMAIL || "news@tudominio.com";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }
    if (!AUDIENCE_ID) {
      return NextResponse.json({ ok: false, error: "Falta RESEND_AUDIENCE_ID" }, { status: 500 });
    }

    // 1) Agregar (o actualizar) el contacto en el Audience
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    });

    // 2) Enviar correo de bienvenida
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "¡Bienvenido/a al newsletter de Daniel!",
      // HTML simple (sin dependencias)
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6; color:#0f172a;">
          <h2 style="margin:0 0 12px;">¡Gracias por suscribirte! 🙌</h2>
          <p>Hola, soy <strong>Daniel Reyna</strong>. Te escribiré con ideas claras y herramientas prácticas para tu bienestar emocional.</p>
          <p>¿Qué puedes esperar?</p>
          <ul>
            <li>Lecturas breves y accionables</li>
            <li>Recursos y guías descargables</li>
            <li>Novedades de la consulta y la tienda</li>
          </ul>
          <p>Mientras, puedes visitar el blog: <a href="https://danielreyna.netlify.app/blog" style="color:#047857; text-decoration:underline;">danielreyna.netlify.app/blog</a></p>
          <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0;">
          <p style="font-size:12px; color:#475569;">
            Si este correo no era para ti, puedes darte de baja en cualquier momento.
          </p>
        </div>
      `,
      reply_to: "hola@tudominio.com", // opcional
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Manejo de duplicados/errores suaves: igual respondemos ok si ya está
    const message = err?.message || "Error";
    if (message.toLowerCase().includes("already exists")) {
      return NextResponse.json({ ok: true, note: "Ya estaba suscrito" });
    }
    console.error("NEWSLETTER ERROR:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
