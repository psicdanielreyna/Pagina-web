import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;
const FILE_NAME = "mini-guia-anti-estres.pdf";
const FILE_PATH = () =>
  path.join(process.cwd(), "public", "downloads", FILE_NAME);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Token requerido" },
        { status: 401 }
      );
    }

    // valida token
    await jwtVerify(token, new TextEncoder().encode(DL_SECRET));

    // lee el PDF (Buffer) y conviértelo en Uint8Array para Response
    const buf = await fs.readFile(FILE_PATH());
    const uint8 = new Uint8Array(buf);

    return new Response(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[download] error:", err);
    return NextResponse.json(
      { ok: false, error: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}