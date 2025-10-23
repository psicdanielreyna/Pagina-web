import { NextResponse } from "next/server";

// Evita cualquier prerender y cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    { error: "Endpoint deshabilitado (Supabase no configurado)." },
    { status: 410 }
  );
}