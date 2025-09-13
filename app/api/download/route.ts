// app/api/download/route.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "node:fs/promises";
import path from "node:path";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET ?? "";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) return NextResponse.json({ ok: false, error: "Token requerido" }, { status: 400 });

    const secret = new TextEncoder().encode(DL_SECRET);
    await jwtVerify(token, secret); // lanza si no es válido / expirado

    const filePath = path.join(process.cwd(), "public", "downloads", "mini-guia-anti-estres.pdf");
    const file = await fs.readFile(filePath);

    return new Response(new Uint8Array(file), {
  status: 200,
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="mini-guia-anti-estres.pdf"`,
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  },
});
  } catch (err: any) {
    console.error("[download] error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Token inválido o expirado" }, { status: 401 });
  }
}