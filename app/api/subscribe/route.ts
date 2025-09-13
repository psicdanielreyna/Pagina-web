// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";

const API_KEY      = process.env.RESEND_API_KEY!;
const AUDIENCE_ID  = process.env.RESEND_AUDIENCE_ID || "";
const FROM_EMAIL   = process.env.FROM_EMAIL || "";     // p.ej. "Daniel Reyna <danielreyna@danielreyna.com>"
const DL_SECRET    = process.env.DOWNLOAD_TOKEN_SECRET || "";
const SITE_URL     = process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.com";

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(async () => {
      const json = await req.json().catch(() => ({}));
      const fd = new FormData();
      Object.entries(json as Record<string,string>).forEach(([k,v])=>fd.append(k,v));
      return fd;
    });

    const email = (form.get("email") as string | null)?.trim().toLowerCase() || "";
    if (form.get("company")) return NextResponse.json({ ok: true }, { status: 200 }); // honeypot
    if (!email) return NextResponse.json({ ok:false, error:"Email requerido" }, { status: 400 });

    // Si no hay API key no truena el build: respondemos mock.
    if (!API_KEY) {
      console.warn("[subscribe] RESEND_API_KEY no definido. Respuesta mock.");
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const resend = new Resend(API_KEY);

    // --- DEDUP: ¿ya existe este email en la audiencia? ---
let alreadySubscribed = false;
if (AUDIENCE_ID) {
  try {
    // usamos "as any" para evitar error de TS porque el SDK no tipa "limit"
    const list = await (resend.contacts.list as any)({
      audienceId: AUDIENCE_ID,
      limit: 1000, // revisa hasta 1000 registros
    });

    const items: any[] = (list as any)?.data ?? (list as any)?.items ?? [];
    alreadySubscribed = Array.isArray(items) &&
      items.some((c: any) => (c.email || "").toLowerCase() === email.toLowerCase());
  } catch (e) {
    console.warn("[subscribe] No se pudo verificar existencia en audience:", e);
  }
}

// si ya está suscrito → devolver sin enviar welcome otra vez
if (alreadySubscribed) {
  return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
}

    // Si ya está, regresamos 200 y NO enviamos bienvenida otra vez.
    if (alreadySubscribed) {
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // -------- Alta / actualización en audiencia (idempotente) --------
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
    }

    // -------- Token + link de descarga --------
    let downloadUrl = `${SITE_URL}/descargar`; // fallback
    if (DL_SECRET) {
      const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(DL_SECRET));
      downloadUrl = `${SITE_URL}/descargar?token=${encodeURIComponent(token)}`;
    }

    // -------- Correo de bienvenida (no bloqueante) --------
    let emailSent = false;
    if (FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,      // debe ser dominio verificado
          to: email,
          subject: "¡Gracias por suscribirte!",
          html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
              <h2>¡Bienvenid@!</h2>
              <p>Gracias por unirte al newsletter.</p>
              <p><a href="${downloadUrl}" style="display:inline-block;padding:10px 14px;border-radius:8px;background:#14532d;color:#fff;text-decoration:none">Descargar mini guía anti-estrés (PDF)</a></p>
              <p>Abrazo,<br/>Daniel</p>
            </div>
          `,
        });
        emailSent = true;
      } catch (e:any) {
        console.error("[subscribe] fallo al enviar email:", e?.name, e?.message, e?.statusCode, e?.response?.data);
        // No rompemos la UX si falla el envío: devolvemos ok igualmente.
      }
    }

    return NextResponse.json({ ok: true, alreadySubscribed: false, emailSent }, { status: 200 });
  } catch (err:any) {
    console.error("[subscribe] error inesperado:", err?.message || err);
    return NextResponse.json({ ok:false, error:"No se pudo procesar la suscripción" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}