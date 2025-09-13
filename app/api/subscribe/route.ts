// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL  = process.env.FROM_EMAIL;
const API_KEY     = process.env.RESEND_API_KEY;

function ok(data: Record<string, unknown> = {}, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}
function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  try {
    // formData o JSON
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) => fd.append(k, v));
      return fd;
    });

    // honeypot
    if (form.get("company")) return ok({ skipped: true });

    const email = (form.get("email") as string | null)?.trim().toLowerCase() ?? "";
    if (!email) return bad("Email requerido");

    // Sin API key -> responder mock para no romper previews/local
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return ok({ mocked: true });
    }

    const resend = new Resend(API_KEY);

    let already = false;

    // 1) Intentar crear el contacto; si ya existe, Resend lanza 409 (conflict)
    if (AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email,
          unsubscribed: false,
        });
      } catch (err: any) {
        const status = err?.statusCode ?? err?.code ?? err?.name;
        const msg = String(err?.message || "");
        const isConflict =
          status === 409 || status === "conflict" || /409|already exists/i.test(msg);

        if (isConflict) {
          already = true; // ya estaba en la audiencia
        } else {
          console.error("[subscribe] create contact error:", status, msg);
          // Si falló por otra causa real, avisa
          return bad("No se pudo registrar el correo", 500);
        }
      }
    }

    // 2) Enviar bienvenida SOLO si no estaba ya suscrito
    if (!already && FROM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Gracias por suscribirte!",
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <h2>¡Bienvenido al newsletter!</h2>
            <p>Te suscribiste correctamente. Muy pronto recibirás contenido exclusivo.</p>
            <p>Abrazo,<br/>Daniel</p>
          </div>
        `,
      });
    }

    return ok({ alreadySubscribed: already });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return bad("No se pudo procesar la suscripción", 500);
  }
}

export async function GET() {
  return ok();
}