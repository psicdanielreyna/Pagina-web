import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_SECRET = process.env.ADMIN_SECRET!;

export async function POST(req: NextRequest) {
  const { id, accion, secret } = await req.json();

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!id || !accion) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const { error } = await supabase
    .from("opiniones")
    .update({
      aprobada: accion === "aprobar",
      pendiente: false,
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("opiniones")
    .select("*")
    .eq("pendiente", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ opiniones: data });
}