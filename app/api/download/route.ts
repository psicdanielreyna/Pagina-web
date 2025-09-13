// app/api/download/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Token requerido" },
        { status: 400 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, DL_SECRET);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Token inválido o expirado" },
        { status: 401 }
      );
    }

    // Ruta absoluta al PDF
    const filePath = path.join(process.cwd(), "public", "downloads", "mini-guia.pdf");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, error: "Archivo no encontrado" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="mini-guia.pdf"',
      },
    });
  } catch (err: any) {
    console.error("[download] error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}