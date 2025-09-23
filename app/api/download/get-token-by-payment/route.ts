import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("payment_id");
  if (!paymentId) return NextResponse.json({ error: "Falta payment_id" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("DownloadToken")
    .select("*")
    .eq("paymentId", paymentId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = row not found (PostgREST)
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  if (!data) return NextResponse.json({ pending: true });
  if (data.used) return NextResponse.json({ error: "El enlace ya fue utilizado." }, { status: 410 });
  if (new Date(data.expiresAt) < new Date()) return NextResponse.json({ error: "El enlace expiró." }, { status: 410 });

  return NextResponse.json({ token: data.token });
}
