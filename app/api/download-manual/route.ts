import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { jwtVerify } from "jose";
import path from "path";

export const runtime = "nodejs";

const ARCHIVOS_PERMITIDOS = [
  "como-apagar-la-mente.pdf",
  "el-arte-de-creer-en-ti.pdf",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token requerido" }, { status: 401 });
  }

  let archivo: string;
  try {
    const secret = new TextEncoder().encode(process.env.DOWNLOAD_TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    archivo = payload.archivo as string;
  } catch {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
  }

  if (!ARCHIVOS_PERMITIDOS.includes(archivo)) {
    return NextResponse.json({ error: "Archivo no permitido" }, { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), "private", archivo);
    const file = await readFile(filePath);
    const buffer = Buffer.from(file);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${archivo}"`,
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return NextResponse.json({ error: "Error al leer el archivo" }, { status: 500 });
  }
}