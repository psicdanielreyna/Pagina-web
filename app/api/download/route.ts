import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createReadStream, statSync } from "fs";
import { join } from "path";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return Response.json({ error: "Falta token" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("DownloadToken")
    .select("*")
    .eq("token", token)
    .single();

  if (error) return Response.json({ error: "DB error" }, { status: 500 });
  if (!data) return Response.json({ error: "Token inválido" }, { status: 404 });
  if (data.used) return Response.json({ error: "Enlace ya utilizado" }, { status: 410 });
  if (new Date(data.expiresAt) < new Date()) return Response.json({ error: "Enlace expirado" }, { status: 410 });

  // marca como usado (transaccional simple)
  const { error: updErr } = await supabaseAdmin
    .from("DownloadToken")
    .update({ used: true })
    .eq("token", token);

  if (updErr) return Response.json({ error: "DB error" }, { status: 500 });

  // sirve el archivo local (ajusta si usas Storage)
  const baseDir = process.cwd();
  const absPath = data.filePath.startsWith("/")
    ? join(baseDir, data.filePath)
    : join(baseDir, "private", data.filePath);

  const { size } = statSync(absPath);
  const stream = createReadStream(absPath);

  return new Response(stream as any, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename="${absPath.split("/").pop()}"`,
      "Cache-Control": "no-store",
    },
  });
}
