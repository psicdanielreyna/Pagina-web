// app/api/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
      return NextResponse.json(
        { ok: false, message: "Configuración faltante" },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const email = String(form.get("email") || "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json(
        { ok: false, message: "Email requerido" },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.contacts.update({
      audienceId: RESEND_AUDIENCE_ID!,
      email,
      unsubscribed: true,
    } as any);

    if ((result as any)?.error) {
      return NextResponse.json(
        { ok: false, message: (result as any).error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Te has dado de baja correctamente." });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, message: "Error al procesar la solicitud." },
      { status: 500 }
    );
  }
}