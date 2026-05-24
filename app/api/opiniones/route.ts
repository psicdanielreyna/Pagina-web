import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");
  const slug = searchParams.get("slug");

  let query = supabase
    .from("opiniones")
    .select("id, nombre, estrellas, opinion, tipo, slug, created_at")
    .eq("aprobada", true)
    .order("created_at", { ascending: false });

  if (tipo) query = query.eq("tipo", tipo);
  if (slug) query = query.eq("slug", slug);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ opiniones: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, email, estrellas, opinion, tipo, slug } = body;

  if (!nombre || !estrellas || !opinion || !tipo) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const aprobada = estrellas >= 4;
  const pendiente = estrellas < 4;

  const { data, error } = await supabase
    .from("opiniones")
    .insert({ nombre, email, estrellas, opinion, tipo, slug, aprobada, pendiente })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, aprobada, data });
}