import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Falta token" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("DownloadToken")
    .select("id, token, file_path, used, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    console.error("download DB error", { token, error });
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  if (data.used) return NextResponse.json({ error: "Enlace ya utilizado" }, { status: 410 });
  if (new Date(data.expires_at) < new Date()) return NextResponse.json({ error: "Enlace expirado" }, { status: 410 });

  try {
    const safeRel = path.normalize(data.file_path).replace(/^(\.\.(\/|\\|$))+/, "");
    const abs = path.join(process.cwd(), safeRel);

    const buffer = await fs.readFile(abs);

    // Marca como usado (best-effort)
    await supabaseAdmin.from("DownloadToken").update({ used: true }).eq("id", data.id);

    // 👉 Body como Uint8Array (ArrayBufferView), aceptado por Fetch/NextResponse
    const body = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    const fileName = path.basename(abs);

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(buffer.byteLength),
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("file error", {
      token,
      file_path: data.file_path,
      cwd: process.cwd(),
      err: { name: e?.name, message: e?.message, code: e?.code },
    });
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 500 });
  }
}
