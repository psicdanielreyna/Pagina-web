// app/api/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
      return NextResponse.json(
        { ok: false, message: "Configuración faltante" },
        { status: 500 }
      );
    }

    // Soportar tanto FormData como JSON
    let email = "";
    const ct = (req.headers.get("content-type") || "").toLowerCase();

    if (ct.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as any;
      email = String(body?.email || "");
    } else if (ct.includes("multipart/form-data")) {
      const form = await req.formData();
      email = String(form.get("email") || "");
    } else {
      // último intento
      try {
        const body = (await req.json()) as any;
        email = String(body?.email || "");
      } catch {
        const form = await req.formData().catch(() => null);
        if (form) email = String(form.get("email") || "");
      }
    }

    email = email.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Email inválido" },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // Intento 1: crear/actualizar como desuscrito
    // Muchos flujos funcionan marcando unsubscribed al crear (si ya existe puede devolver 409).
    const create = await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID!,
      email,
      unsubscribed: true,
    } as any);

    // Si la API nos devuelve estructura de error, la tratamos abajo
    if ((create as any)?.error) {
      const msg = String((create as any).error?.message || "").toLowerCase();

      // Si ya existe, lo consideramos baja registrada
      if (msg.includes("already")) {
        return NextResponse.json({
          ok: true,
          message: "Tu baja ha sido registrada.",
        });
      }

      // Resend a veces devuelve “The `email` must be a valid email.”
      if (msg.includes("valid email")) {
        return NextResponse.json(
          { ok: false, message: "Email inválido" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { ok: false, message: (create as any).error?.message || "No se pudo procesar la baja" },
        { status: 502 }
      );
    }

    // Éxito
    return NextResponse.json({
      ok: true,
      message: "Te has dado de baja correctamente.",
    });
  } catch (e: any) {
    // Normalizamos errores “bonitos”
    const msg = String(e?.message || "").toLowerCase();
    if (msg.includes("valid email")) {
      return NextResponse.json(
        { ok: false, message: "Email inválido" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Error al procesar la solicitud." },
      { status: 500 }
    );
  }
}