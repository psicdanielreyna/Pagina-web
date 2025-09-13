// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL  = process.env.FROM_EMAIL;          // p.ej. "Daniel Reyna <danielreyna@danielreyna.com>"
const API_KEY     = process.env.RESEND_API_KEY;

/** Intenta saber si YA existe el contacto en la Audience (compat con distintas versiones del SDK) */
async function contactExistsByEmail(resend: Resend, audienceId: string, email: string): Promise<boolean> {
  // 1) Algunos SDKs exponen contacts.get({ audienceId, email })
  try {
    // @ts-ignore: método opcional según versión del SDK
    const resp: any = await (resend as any).contacts.get?.({ audienceId, email });
    if (resp?.data) return true;
  } catch {
    // ignoramos (p.ej. 404 = no encontrado)
  }

  // 2) Fallback: listar y buscar por email
  try {
    const list: any = await resend.contacts.list({ audienceId });
    if (Array.isArray(list?.data)) {
      const found = list.data.some((c: any) => c?.email?.toLowerCase() === email.toLowerCase());
      return !!found;
    }
  } catch {
    // en caso de error asumimos que no existe para no bloquear suscripción
  }
  return false;
}

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

    // Si no hay API key, responde OK mock (no truena build)
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    // ---- DEDUP: si ya existe en la audiencia, NO reenviar bienvenida
    if (AUDIENCE_ID) {
      const exists = await contactExistsByEmail(resend, AUDIENCE_ID, email);
      if (exists) {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
      }
    }

    // 1) Crear/asegurar contacto (idempotente)
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
    }

    // 2) Enviar bienvenida (solo primera vez)
    if (FROM_EMAIL) {
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
    }

    return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "No se pudo procesar la suscripción" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}