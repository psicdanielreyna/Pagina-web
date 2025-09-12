// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL  = process.env.FROM_EMAIL; // ej: "Daniel Reyna <hola@danielreyna.com>"
const API_KEY     = process.env.RESEND_API_KEY;

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(async () => {
      const json = (await req.json().catch(() => ({}))) as Record<string, string>;
      const fd = new FormData();
      Object.entries(json).forEach(([k, v]) => fd.append(k, v));
      return fd;
    });

    const email = (form.get("email") as string | null)?.trim().toLowerCase() ?? "";
    if (form.get("company")) return NextResponse.json({ ok: true }, { status: 200 });
    if (!email) return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });

    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    if (AUDIENCE_ID) {
      await resend.contacts.create({ audienceId: AUDIENCE_ID, email, unsubscribed: false });
    }

    if (FROM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Gracias por suscribirte!",
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <h2>¡Gracias por unirte!</h2>
            <p>Te acabo de suscribir al newsletter. Si no fuiste tú, puedes ignorar este correo.</p>
            <p>Abrazo,<br/>Daniel</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar/guardar" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
