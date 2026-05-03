import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const ARCHIVOS_PERMITIDOS = [
  "como-apagar-la-mente.pdf",
  "el-arte-de-creer-en-ti.pdf",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const archivo = searchParams.get("archivo");

  if (!archivo || !ARCHIVOS_PERMITIDOS.includes(archivo)) {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
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
      },
    });
  } catch {
    return NextResponse.json({ error: "Error al leer el archivo" }, { status: 500 });
  }
}