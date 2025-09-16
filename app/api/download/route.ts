// app/api/download/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

const { DOWNLOAD_TOKEN_SECRET } = process.env;

// Descarga protegida por token (JWT). Redirige al PDF público.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ ok: false, error: "Token requerido" }, { status: 400 });
  }
  if (!DOWNLOAD_TOKEN_SECRET) {
    return NextResponse.json({ ok: false, error: "Server misconfig: falta DOWNLOAD_TOKEN_SECRET" }, { status: 500 });
  }

  try {
    // Verifica expiración y firma
    jwt.verify(token, DOWNLOAD_TOKEN_SECRET);

    // Si todo OK, redirige al archivo en /public/downloads/...
    // Asegúrate de colocar el PDF en: /public/downloads/mini-guia-anti-estres.pdf
    const pdfPath = "/downloads/mini-guia-anti-estres.pdf";
    const dest = new URL(pdfPath, url.origin);
    return NextResponse.redirect(dest, { status: 302 });
  } catch {
    return NextResponse.json({ ok: false, error: "Token inválido o expirado" }, { status: 401 });
  }
}