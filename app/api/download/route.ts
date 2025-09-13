import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import path from "path";
import fs from "fs/promises";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

export async function GET(req: NextRequest) {
  try {
    // valida token
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
      return new Response(JSON.stringify({ ok: false, error: "Token faltante" }), { status: 401 });
    }

    await jwtVerify(token, new TextEncoder().encode(DL_SECRET));

    // lee el PDF
    const filePath = path.join(process.cwd(), "public", "downloads", "mini-guia-anti-estres.pdf");
    const file = await fs.readFile(filePath);

    // ⚡ fix: envolver el Buffer en un Uint8Array
    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="mini-guia-anti-estres.pdf"',
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("[download] error:", err?.message || err);
    return new Response(JSON.stringify({ ok: false, error: "Token inválido o expirado" }), { status: 401 });
  }
}