import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { jwtVerify, JWTPayload } from "jose";

export const runtime = "nodejs";

// Carpeta de EBOOKS protegidos
const EBOOKS_DIR = path.join(process.cwd(), "private", "ebooks");

const MIME_BY_EXT: Record<string, string> = {
  ".pdf": "application/pdf",
  ".epub": "application/epub+zip",
  ".mobi": "application/x-mobipocket-ebook",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".zip": "application/zip",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function inferMime(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXT[ext] || "application/octet-stream";
}

function getSecret(): Uint8Array {
  // Acepta cualquiera de los dos nombres
  const s =
    process.env.DOWNLOAD_JWT_SECRET ||
    process.env.DOWNLOAD_TOKEN_SECRET || // <-- tu nombre actual
    "";
  if (!s) throw new Error("Falta la variable de entorno DOWNLOAD_TOKEN_SECRET");
  return new TextEncoder().encode(s);
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ error: "Token requerido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verificar JWT
    const { payload } = await jwtVerify(token, getSecret());

    // payload sugerido: { email, file, filename, iat, exp }
    const {
      file: fileFromToken,
      filename: downloadNameFromToken,
    } = payload as JWTPayload & { file?: string; filename?: string };

    // Archivo a servir (debe existir en private/ebooks)
    const fileName = fileFromToken ?? "como-apagar-tu-mente.pdf";
    const downloadName = downloadNameFromToken ?? fileName;

    const filePath = path.join(EBOOKS_DIR, fileName);
    const fileBuffer = await fs.readFile(filePath);

    // Usamos ReadableStream para evitar problemas de tipos
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuffer);
        controller.close();
      },
    });

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
    const msg = String(err?.message || err);

    if (/expired|exp/i.test(msg)) {
      return new Response(
        JSON.stringify({ error: "El enlace de descarga ha expirado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/signature|JWS|invalid/i.test(msg)) {
      return new Response(
        JSON.stringify({ error: "Token inválido o secret incorrecto" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/ENOENT|no such file/i.test(msg)) {
      return new Response(
        JSON.stringify({ error: "Archivo no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    if (/Falta la variable/.test(msg)) {
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Solicitud inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}