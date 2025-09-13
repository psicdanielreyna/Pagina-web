// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const API_KEY = process.env.RESEND_API_KEY!;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const FROM_EMAIL = process.env.FROM_EMAIL!; // ej: daniel@danielreyna.com
const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

const resend = new Resend(API_KEY);

function isEmail(v: unknown) {
  return typeof v === "string" && /^\S+@\S+\.\S+$/.test(v);
}
function sha1(s: string) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

// --- helper: retry exponencial sólo para 429 ---
async function sendWithBackoff(fn: () => Promise<any>, tries = 3) {
  let lastErr: any;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      const code = err?.statusCode ?? err?.response?.status;
      if (code !== 429) throw err;
      // 429 -> espera 1s, 2s, 4s …
      const ms = 1000 * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, ms));
      lastErr = err;
    }
  }
  throw lastErr;
}

export async function POST(req: Request) {
  try {
    // 1) lee email (form o json)
    let email = "";
    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const data = await req.json();
      email = (data?.email || "").toString().trim().toLowerCase();
    } else {
      const form = await req.formData();
      email = (form.get("email") || "").toString().trim().toLowerCase();
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "email inválido" }, { status: 400 });
    }

   // 2) ¿Ya existe en la audiencia?
let already = false;
if (AUDIENCE_ID) {
  try {
    let items: any[] = [];
    let cursor: string | undefined = undefined;

    do {
      const resp: any = await resend.contacts.list(
        ({ audienceId: AUDIENCE_ID, ...(cursor ? { after: cursor } : {}) } as any)
      );

      const page = resp?.data?.items ?? resp?.items ?? [];
      items.push(...page);

      // distintas versiones del SDK exponen paginación en lugares diferentes
      cursor = resp?.data?.pagination?.next ?? resp?.pagination?.next ?? undefined;
    } while (cursor && items.length < 2000); // seguridad: corta en 2000

    already = items.some(
      (c: any) => (c.email || "").toLowerCase() === email
    );
  } catch (e) {
    console.warn("[subscribe] fallo al listar audiencia:", e);
  }
}

    if (already) {
      // no mandamos bienvenida otra vez
      return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
    }

    // 3) crea/actualiza contacto (idempotente por email del lado de Resend)
    await resend.contacts.create({
      audienceId: AUDIENCE_ID as any,
      email,
      unsubscribed: false,
    });

    // 4) genera link de descarga firmado (7 días)
    const token = jwt.sign({ email }, DL_SECRET, { expiresIn: "7d" });
    const downloadUrl = `https://danielreyna.com/api/download?token=${token}`;

    // 5) manda bienvenida con idempotencia + backoff
    const refId = `welcome-${sha1(email)}`; // evita duplicados si se dispara doble
    let deferred = false;
    try {
      await sendWithBackoff(
        () =>
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "¡Gracias por suscribirte!",
            // puedes usar 'react' si tienes un componente; aquí voy con 'html'
            html: `
              <p>¡Bienvenido al newsletter!</p>
              <p>Te suscribiste correctamente. Aquí tienes tu mini guía:</p>
              <p><a href="${downloadUrl}">Descargar mini guía anti-estrés (PDF)</a></p>
              <p>Abrazo,<br/>Daniel</p>
            `,
            headers: { "X-Entity-Ref-ID": refId },
            tags: [{ name: "type", value: "welcome" }],
          }),
        3
      );
    } catch (err: any) {
      const code = err?.statusCode ?? err?.response?.status;
      if (code === 429) {
        // te aviso para que el cliente muestre un mensaje amable
        deferred = true;
        console.warn("[subscribe] Resend 429; email diferido");
      } else {
        throw err;
      }
    }

    return NextResponse.json({ ok: true, alreadySubscribed: false, deferred }, { status: 200 });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "No se pudo procesar la suscripción" }, { status: 500 });
  }
}

// ping opcional
export async function GET() {
  return NextResponse.json({ ok: true });
}