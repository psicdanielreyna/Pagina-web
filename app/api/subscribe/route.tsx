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
  TURNSTILE_SECRET_KEY,
} = process.env;

const asBool = (v: unknown) => String(v).toLowerCase() === "true";
const ok = (data: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: true, ...data }, { status: 200 });
const fail = (status: number, message: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, message, ...extra }, { status });

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

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: ip,
      }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
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
    let firstName = "";
    let turnstileToken = "";

    if (ct.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as any;
      email = String(body?.email || "").trim().toLowerCase();
      firstName = String(body?.firstName || "").trim();
      turnstileToken = String(body?.turnstileToken || "").trim();
    } else if (
      ct.includes("multipart/form-data") ||
      ct.includes("application/x-www-form-urlencoded")
    ) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      firstName = String(form.get("firstName") || "").trim();
      turnstileToken = String(form.get("turnstileToken") || "").trim();
    } else {
      try {
        const body = (await req.json()) as any;
        email = String(body?.email || "").trim().toLowerCase();
        firstName = String(body?.firstName || "").trim();
        turnstileToken = String(body?.turnstileToken || "").trim();
      } catch {
        const form = await req.formData().catch(() => null);
        if (form) {
          email = String(form.get("email") || "").trim().toLowerCase();
          firstName = String(form.get("firstName") || "").trim();
          turnstileToken = String(form.get("turnstileToken") || "").trim();
        }
      }
    }

    if (!email) return fail(400, "Email requerido");
    if (!isValidEmail(email)) return fail(400, "Email inválido");

    // Verificar Turnstile solo en producción
    if (process.env.NODE_ENV === "production") {
      if (!turnstileToken) return fail(400, "Verificación de seguridad requerida");
      const ip = req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for") || "";
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) return fail(400, "Verificación de seguridad fallida. Intenta de nuevo.");
    }

    if (!RESEND_API_KEY) return fail(500, "Falta RESEND_API_KEY");
    if (!RESEND_AUDIENCE_ID) return fail(500, "Falta RESEND_AUDIENCE_ID");

    const resend = new Resend(RESEND_API_KEY);

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
        else return fail(502, (add as any).error?.message || "Error creando contacto en Resend");
      }
    } catch (e: any) {
      const emsg = String(e?.message || "");
      if (emsg.includes("409") || emsg.toLowerCase().includes("already")) already = true;
      else return fail(502, "No se pudo crear el contacto en Resend");
    }

    if (asBool(SEND_EMAILS)) {
      if (!FROM_EMAIL) return fail(500, "Falta FROM_EMAIL");
      const base = siteBase(req);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido! Aquí tu mini guía anti-estrés",
        react: (
          <WelcomeEmail
            subject="¡Bienvenido! Aquí tu mini guía anti-estrés"
            preheader="Descarga tu mini guía y comienza a cuidarte hoy mismo."
            greetingName={firstName || email.split("@")[0]}
            logoUrl={`${base}/logo-newsletter.png`}
            heroUrl={`${base}/welcome-hero.jpg`}
            title="Gracias por suscribirte ✨"
            subtitle="Te he agregado a mi newsletter."
            intro="Aquí tienes tu mini guía gratuita:"
            cta={{ label: "Descargar mini guía (PDF)", href: `${base}/downloads/mini-guia-anti-estres.pdf` }}
            brand="Daniel Reyna — Psicólogo"
            socials={{
              website: base,
              instagram: "https://instagram.com/psic.danielreyna",
              youtube: "https://youtube.com/@Psicdanielreyna",
              x: "https://x.com/psicdanreyna",
            }}
            unsubscribeUrl={`${base}/unsubscribe?email=${encodeURIComponent(email)}`}
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