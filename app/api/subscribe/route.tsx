// app/api/subscribe/route.ts
import * as React from "react";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  FROM_EMAIL,
  SEND_EMAILS,
  NEXT_PUBLIC_SITE_URL,
} = process.env;

const asBool = (v: unknown) => String(v).toLowerCase() === "true";
const ok = (data: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: true, ...data }, { status: 200 });
const fail = (
  status: number,
  message: string,
  extra: Record<string, unknown> = {}
) => NextResponse.json({ ok: false, message, ...extra }, { status });

/** Base URL segura para los enlaces absolutos del email */
function siteBase(req: Request) {
  if (NEXT_PUBLIC_SITE_URL) return NEXT_PUBLIC_SITE_URL;
  const h = (n: string) => (req.headers.get(n) || "").trim();
  const proto = h("x-forwarded-proto") || "https";
  const host = h("x-forwarded-host") || h("host") || "localhost:3000";
  return `${proto}://${host}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("debug") !== null) {
    return ok({
      msg: "subscribe endpoint alive",
      version: "v2-react",
      nodeEnv: process.env.NODE_ENV,
      hasKey: !!RESEND_API_KEY,
      audienceLen: (RESEND_AUDIENCE_ID || "").length,
      sendEmails: String(SEND_EMAILS),
      fromEmail: FROM_EMAIL ? "present" : "missing",
    });
  }
  return ok({ msg: "subscribe endpoint alive" });
}

export async function POST(req: Request) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let email = "";

    if (ct.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as any;
      email = String(body?.email || "").trim().toLowerCase();
    } else if (
      ct.includes("multipart/form-data") ||
      ct.includes("application/x-www-form-urlencoded")
    ) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      try {
        const body = (await req.json()) as any;
        email = String(body?.email || "").trim().toLowerCase();
      } catch {
        const form = await req.formData().catch(() => null);
        if (form) email = String(form.get("email") || "").trim().toLowerCase();
      }
    }

    if (!email) return fail(400, "Email requerido");
    if (!isValidEmail(email)) return fail(400, "Email inválido");
    if (!RESEND_API_KEY) return fail(500, "Falta RESEND_API_KEY");
    if (!RESEND_AUDIENCE_ID) return fail(500, "Falta RESEND_AUDIENCE_ID");

    const resend = new Resend(RESEND_API_KEY);

    // 1) asegurar contacto en la Audience
    let already = false;
    try {
      const add = await resend.contacts.create({
        audienceId: RESEND_AUDIENCE_ID!,
        email,
        unsubscribed: false,
      } as any);
      if ((add as any)?.error) {
        const msg = String((add as any).error?.message || "").toLowerCase();
        if (msg.includes("already")) already = true;
        else
          return fail(
            502,
            (add as any).error?.message || "Error creando contacto en Resend"
          );
      }
    } catch (e: any) {
      const emsg = String(e?.message || "");
      if (emsg.includes("409") || emsg.toLowerCase().includes("already"))
        already = true;
      else return fail(502, "No se pudo crear el contacto en Resend");
    }

    // 2) enviar email de bienvenida con React (si aplica)
    if (asBool(SEND_EMAILS)) {
      if (!FROM_EMAIL) return fail(500, "Falta FROM_EMAIL");

      const base = siteBase(req);

      // ✅ Link directo a la mini-guía pública (sin token)
      const downloadLink = `${base}/downloads/mini-guia-anti-estres.pdf`;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido! Aquí tu mini guía anti-estrés",
        react: (
          <WelcomeEmail
            subject="¡Bienvenido! Aquí tu mini guía anti-estrés"
            preheader="Descarga tu mini guía y comienza a cuidarte hoy mismo."
            greetingName={email.split("@")[0]}
            logoUrl={`${base}/logo-newsletter.png`}
            heroUrl={`${base}/welcome-hero.jpg`}
            title="Gracias por suscribirte ✨"
            subtitle="Te he agregado a mi newsletter."
            // (quitamos el 'válida 7 días' porque ya no hay token)
            intro="Aquí tienes tu mini guía gratuita:"
            cta={{ label: "Descargar mini guía (PDF)", href: downloadLink }}
            brand="Daniel Reyna — Psicólogo"
            socials={{
              website: base,
              instagram: "https://instagram.com/psic.danielreyna",
              youtube: "https://youtube.com/@Psicdanielreyna",
              x: "https://x.com/psicdanreyna",
            }}
            unsubscribeUrl={`${base}/unsubscribe`}
          />
        ) as React.ReactElement,
      });
    }

    return ok({
      message: already ? "Ya suscrito" : "Suscripción creada",
      already,
    });
  } catch {
    return fail(500, "Error interno en el servidor");
  }
}