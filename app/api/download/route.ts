// app/api/download/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;
const FILE_NAME = "mini-guia-anti-estres.pdf";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || "";
    if (!token) {
      return NextResponse.json({ ok: false, error: "Falta token" }, { status: 400 });
    }

    // valida token (jsonwebtoken.verify lanza si invalido/expirado)
    jwt.verify(token, DL_SECRET);

    const filePath = path.join(process.cwd(), "public", "downloads", FILE_NAME);
    const buf = await fs.readFile(filePath);

    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("[download] error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}
