// app/api/download/route.ts
import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { jwtVerify, JWTPayload } from "jose";

export const runtime = "nodejs";

// Carpeta privada de descargas
const DOWNLOAD_DIR = path.join(process.cwd(), "private", "downloads");

const MIME_BY_EXT: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".zip": "application/zip",
  ".epub": "application/epub+zip",
  ".mobi": "application/x-mobipocket-ebook",
};

function inferMime(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXT[ext] || "application/octet-stream";
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Falta la variable de entorno ${name}`);
  return v;
}

export async function GET(req: NextRequest) {
  try {
    // 1. Token en query
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ error: "Token requerido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Verificar token
    const secret = new TextEncoder().encode(requireEnv("DOWNLOAD_JWT_SECRET"));
    const { payload } = await jwtVerify(token, secret);

    const { file: fileFromToken, filename: downloadNameFromToken } =
      payload as JWTPayload & { file?: string; filename?: string };

    const fileName = fileFromToken ?? "como-apagar-tu-mente.pdf";
    const downloadName = downloadNameFromToken ?? fileName;

    // 3. Leer archivo
    const filePath = path.join(DOWNLOAD_DIR, fileName);
    const fileBuffer = await fs.readFile(filePath);

    // 4. Crear stream (esto sí es 100% válido para Response)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuffer);
        controller.close();
      },
    });

    // 5. Responder
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": inferMime(fileName),
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          downloadName
        )}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (err: any) {
    const msg = err?.message ?? "Error";
    if (/exp/i.test(msg) || /expired/i.test(msg)) {
      return new Response(
        JSON.stringify({ error: "El enlace de descarga ha expirado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/ENOENT|no such file/i.test(msg)) {
      return new Response(
        JSON.stringify({ error: "Archivo no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ error: "Solicitud inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}