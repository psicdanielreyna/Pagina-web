import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { nombre, email } = await req.json();

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos." },
        { status: 400 }
      );
    }

    // Descargar el PDF desde la URL pública
    const pdfUrl = "https://danielreyna.com/guia-burnout-daniel-reyna.pdf";
    const pdfRes = await fetch(pdfUrl);

    if (!pdfRes.ok) {
      throw new Error("No se pudo obtener el PDF");
    }

    const pdfBuffer = await pdfRes.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    await resend.emails.send({
      from: "Daniel Reyna <hola@danielreyna.com>",
      to: email,
      subject: "Tu Guía de Autoevaluación de Burnout 🧠",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1C1008;">
          <p style="font-size:16px;">Hola <strong>${nombre}</strong>,</p>
          <p style="font-size:15px;line-height:1.6;">
            Gracias por descargar la guía. La encontrarás adjunta a este correo.
          </p>
          <p style="font-size:15px;line-height:1.6;">
            Si al leerla te identificas con algo y quieres dar un paso más, 
            puedes responder este correo directamente o visitar 
            <a href="https://danielreyna.com" style="color:#B5763A;">danielreyna.com</a>.
          </p>
          <p style="font-size:14px;color:#888;margin-top:32px;">
            — Psic. Daniel Reyna
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "Guia-Burnout-Daniel-Reyna.pdf",
          content: pdfBase64,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al enviar el correo." },
      { status: 500 }
    );
  }
}