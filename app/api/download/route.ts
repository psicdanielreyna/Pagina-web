// app/api/download/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

const DL_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || "";
    if (!token) return NextResponse.json({ ok: false }, { status: 400 });

    // verifica token
    const secret = new TextEncoder().encode(DL_SECRET);
    await jwtVerify(token, secret);

    // sirve el PDF como attachment
    const filePath = path.join(process.cwd(), "public", "downloads", "mini-guia-anti-estres.pdf");
    const file = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="mini-guia-anti-estres.pdf"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err: any) {
    const msg = err?.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ? "Token inválido" : "Error";
    return NextResponse.json({ ok: false, error: msg }, { status: 401 });
  }
}