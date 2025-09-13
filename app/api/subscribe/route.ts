// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID  = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL   = process.env.FROM_EMAIL!;
const RESEND_KEY   = process.env.RESEND_API_KEY!;

function ok(data: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...data }, { status: 200 });
}
function bad(error: string, code = 400) {
  return NextResponse.json({ ok: false, error }, { status: code });
}

// Normaliza email
function normEmail(v: string | null) {
  return (v ?? "").trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    // admite formData o JSON
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string, string>).forEach(([k, v]) => fd.append(k, v));
      return fd;
    });

    // honeypot
    if (form.get("company")) return ok({ skipped: true });

    const email = normEmail(form.get("email") as string | null);
    if (!email) return bad("Email requerido");

    // Si no hay API key, no truenes el build en previews/local
    if (!RESEND_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return ok({ mocked: true });
    }

    // ---------- 1) DEDUP por email en Audience ----------
    let already = false;

    if (AUDIENCE_ID) {
      // Busca por email usando la API HTTP (evita problemas de tipos del SDK)
      const searchRes = await fetch(
        `https://api.resend.com/contacts?audience_id=${encodeURIComponent(
          AUDIENCE_ID
        )}&email=${encodeURIComponent(email)}`,
        { headers: { Authorization: `Bearer ${RESEND_KEY}` } }
      );

      if (searchRes.ok) {
        const data = (await searchRes.json()) as { data?: Array<{ id: string; email: string }> };
        already = Boolean(data?.data?.length);
      }

      // Si no existe, lo creamos (idempotente: si llegara a existir, Resend responde 409)
      if (!already) {
        const createRes = await fetch("https://api.resend.com/contacts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audience_id: AUDIENCE_ID,
            email,
            unsubscribed: false,
          }),
        });

        if (createRes.status === 409) {
          // Ya existe
          already = true;
        } else if (!createRes.ok) {
          const err = await createRes.text().catch(() => "");
          console.error("[subscribe] create contact error:", err || createRes.statusText);
          // No bloqueamos la UX si falla el alta; continuamos sin enviar bienvenida
          already = true;
        }
      }
    }

    // ---------- 2) Enviar bienvenida SOLO si no estaba ya suscrito ----------
    if (!already && FROM_EMAIL) {
      const resend = new Resend(RESEND_KEY);

      await resend.emails.send({
        from: FROM_EMAIL, // tu remitente verificado en Resend
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