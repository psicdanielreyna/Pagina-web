// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL  = process.env.FROM_EMAIL;          // p.ej. "Daniel Reyna <danielreyna@danielreyna.com>"
const API_KEY     = process.env.RESEND_API_KEY;

export async function POST(req: Request) {
  try {
    // Acepta formData o JSON
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) => fd.append(k, v));
      return fd;
    });

    const email = (form.get("email") as string | null)?.trim().toLowerCase() ?? "";
    // honeypot
    if (form.get("company")) return NextResponse.json({ ok: true }, { status: 200 });

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });
    }

    // Sin API key → no bloquear (mock para desarrollo)
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    // ---- Alta idempotente + dedupe por 409 conflict
    let created = false;
    if (AUDIENCE_ID) {
      try {
        const res = await resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email,
          unsubscribed: false,
        });
        // Si llega aquí sin throw, lo consideramos creado
        created = true;
        console.log("[subscribe] contact created:", res?.data?.id ?? "(no id)");
      } catch (e: any) {
        const code = e?.statusCode ?? e?.code ?? e?.status;
        const msg  = String(e?.message || "");
        // Resend suele regresar 409 cuando el contacto ya existe
        if (code === 409 || /exist/i.test(msg)) {
          console.log("[subscribe] contact already existed (dedupe ok)");
          created = false;
        } else {
          console.error("[subscribe] create contact error:", code, msg);
          throw e; // error real, salimos
        }
      }
    }

    // ---- Enviar bienvenida SOLO si es la primera vez (created === true)
    if (created && FROM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Gracias por suscribirte!",
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5;">
            <h2 style="margin:0 0 8px;">¡Bienvenido al newsletter!</h2>
            <p style="margin:0 0 16px;">Te suscribiste correctamente. Muy pronto recibirás contenido exclusivo.</p>
            <p style="margin:0">Abrazo,<br/>Daniel</p>
          </div>
        `,
      });
      console.log("[subscribe] welcome email sent");
    }

    return NextResponse.json(
      { ok: true, alreadySubscribed: !created },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "No se pudo procesar la suscripción" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}