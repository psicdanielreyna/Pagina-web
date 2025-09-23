export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-signature");

  const secret = process.env.MP_WEBHOOK_SECRET || process.env.MP_ACCESS_TOKEN;
  if (!signatureHeader || !secret) {
    return new NextResponse("Missing signature/secret", { status: 400 });
  }

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((pair) => {
      const [k, v] = pair.split("=");
      return [k.trim(), (v ?? "").trim()];
    })
  ) as Record<string, string>;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${parts.ts}.${rawBody}`)
    .digest("base64url");

  if (expected !== parts.v1) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const paymentId: string | undefined = event?.data?.id ?? event?.data?.payment?.id;
  if (!paymentId) return NextResponse.json({ ok: true });

  // consulta pago real
  const payResp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    cache: "no-store",
  });
  if (!payResp.ok) return new NextResponse("MP error", { status: 502 });
  const payment = await payResp.json();

  if (payment.status !== "approved") return NextResponse.json({ ok: true });

  const filePath: string = payment.metadata?.filePath ?? "/private/ebooks/default.pdf";
  const email: string | null = payment.payer?.email ?? null;

  // upsert por paymentId (evita duplicar si llega el webhook 2 veces)
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

  // intenta insertar; si ya existe, ignora
  const { error } = await supabaseAdmin
    .from("DownloadToken")
    .insert([{ token, paymentId: String(paymentId), email, filePath, expiresAt }])
    .select()
    .single();

  if (error && !/duplicate key|unique/i.test(error.message)) {
    console.error("Supabase insert error", error);
    return new NextResponse("DB error", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
