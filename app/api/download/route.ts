// app/api/download/route.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import path from "node:path";
import fs from "node:fs/promises";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET!;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") || "";
    if (!token) {
      return NextResponse.json({ ok: false, error: "Falta token" }, { status: 400 });
    }

    // valida token
    await jwtVerify(token, new TextEncoder().encode(DL_SECRET));

    // lee el PDF y lo sirve como attachment
    const filePath = path.join(process.cwd(), "public", "downloads", "mini-guia-anti-estres.pdf");
    const file = await fs.readFile(filePath);

    // Convertimos el Buffer a Uint8Array
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
    return NextResponse.json({ ok: false, error: "Token inválido o expirado" }, { status: 401 });
  }
}