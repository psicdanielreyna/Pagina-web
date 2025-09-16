import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ok = (payload: Record<string, unknown> = {}, status = 200) =>
  NextResponse.json({ ok: true, ...payload }, { status });

const fail = (status: number, message: string, extra?: any) =>
  NextResponse.json({ ok: false, error: { message, extra } }, { status });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  const payload: any = {
    msg: "subscribe endpoint alive",
    hasKey: !!process.env.RESEND_API_KEY,
    audienceLen: process.env.RESEND_AUDIENCE_ID?.length || 0,
  };
  if (debug) {
    payload.nodeEnv = process.env.NODE_ENV;
    payload.sendEmails = process.env.SEND_EMAILS;
    payload.fromEmail = process.env.FROM_EMAIL ? "present" : "missing";
  }
  return ok(payload);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  try {
    // 1) Body (JSON o form)
    const ctype = req.headers.get("content-type") || "";
    let email: string | undefined;

    if (ctype.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = typeof body?.email === "string" ? body.email.trim() : undefined;
    } else {
      const fd = await req.formData().catch(() => null);
      const val = fd?.get("email");
      email = typeof val === "string" ? val.trim() : undefined;
    }

    if (!email) return fail(400, "Email requerido");

    // 2) Credenciales Resend
    const API = process.env.RESEND_API_KEY;
    const AUD = process.env.RESEND_AUDIENCE_ID;
    if (!API || !AUD) {
      const reason = !API && !AUD
        ? "Faltan RESEND_API_KEY y RESEND_AUDIENCE_ID"
        : !API ? "Falta RESEND_API_KEY" : "Falta RESEND_AUDIENCE_ID";
      console.warn("[SUBSCRIBE] config incompleta:", reason);
      return ok({ msg: "Recibido. No se envió a Resend por configuración.", sent: false, reason, email });
    }

    // 3) Alta / idempotencia en Audience
    const addResp = await fetch(`https://api.resend.com/audiences/${AUD}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    const addData: any = await addResp.json().catch(() => ({}));
    if (!addResp.ok) {
      const msg = String(addData?.message || "");
      // Si ya existía, seguimos; de lo contrario reportamos
      if (!/exists|already/i.test(msg)) {
        return ok({
          msg: "No se pudo registrar el contacto en Resend",
          sent: false,
          reason: addData?.message || "Error desde Resend (contacts)",
          raw: debug ? addData : undefined,
        });
      }
    }

    // 4) Enviar email de bienvenida (si hay remitente)
    const FROM = process.env.FROM_EMAIL; // e.g. 'Daniel <hola@danielreyna.com>'
    if (!FROM) {
      // No detenemos el flujo: contacto quedó registrado
      return ok({
        msg: "Suscripción exitosa (correo no enviado por falta de FROM_EMAIL).",
        sent: false,
        email,
      });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.com";
    const subject = "¡Bienvenido! Aquí tu mini guía anti-estrés";
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2>¡Gracias por suscribirte!</h2>
        <p>Te agregué al newsletter. Aquí puedes descargar tu mini guía:</p>
        <p>
          <a href="${site}/api/download?token=auto" 
             style="display:inline-block;padding:10px 14px;background:#166534;color:#fff;border-radius:8px;text-decoration:none">
             Descargar mini guía (PDF)
          </a>
        </p>
        <p>Si el botón no funciona, copia y pega: ${site}/api/download?token=auto</p>
        <p>Abrazo,<br>Daniel</p>
      </div>
    `;

    const mailResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject,
        html,
      }),
    });
    const mailData: any = await mailResp.json().catch(() => ({}));

    if (!mailResp.ok) {
      return ok({
        msg: "Suscripción creada, pero el correo falló.",
        sent: false,
        reason: mailData?.message || "Error desde Resend (emails)",
        raw: debug ? mailData : undefined,
      });
    }

    return ok({
      msg: "¡Listo! Revisa tu correo 📬",
      sent: true,
      contact: addData?.id ? addData : undefined,
      emailId: mailData?.id,
    });

  } catch (err: any) {
    console.error("[SUBSCRIBE ERROR]", err);
    return fail(500, "Error interno en el servidor", String(err?.message || err));
  }
}