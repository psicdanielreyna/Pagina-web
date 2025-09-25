import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Asegura runtime Node (no edge; necesitamos fs)
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Falta token" }, { status: 400 });

  // 1) Busca registro (snake_case + maybeSingle)
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
    // 2) Normaliza ruta
    const safeRel = path.normalize(data.file_path).replace(/^(\.\.(\/|\\|$))+/, "");
    const abs = path.join(process.cwd(), safeRel);

    // 3) Lee archivo
    const buffer = await fs.readFile(abs);
    const bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

    // 4) Marca como usado (best-effort; si falla igual servimos)
    await supabaseAdmin.from("DownloadToken").update({ used: true }).eq("id", data.id);

    // 5) Sirve como ReadableStream (evita conflictos de tipos)
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    });

    const fileName = path.basename(abs);
    return new NextResponse(stream as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        // Content-Length no es requerido para streams
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
