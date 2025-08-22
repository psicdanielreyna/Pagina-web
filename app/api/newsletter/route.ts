import { NextResponse } from "next/server";

// Si usas el SDK oficial de Resend:
class SimpleMailer {
  async send({ to, subject, text }: {to:string; subject:string; text:string}) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Falta RESEND_API_KEY");
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "boletín <news@tu-dominio.com>",
        to: [to],
        subject,
        text,
      }),
    });
    if (!r.ok) throw new Error(`Resend error: ${await r.text()}`);
    return r.json();
  }
}

const mailer = new SimpleMailer();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // 1) Te mandas una notificación con el correo capturado
    await mailer.send({
      to: "tucorreo@tu-dominio.com", // <-- cámbialo
      subject: "Nueva suscripción al newsletter",
      text: `Nuevo email: ${email}`,
    });

    // 2) (Opcional) Responder al usuario con confirmación (si quieres doble opt-in)
    // await mailer.send({
    //   to: email,
    //   subject: "¡Gracias por suscribirte!",
    //   text: "Pronto recibirás mi boletín con herramientas útiles.",
    // });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
