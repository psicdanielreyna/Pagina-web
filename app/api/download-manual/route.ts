import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";

export const runtime = "nodejs";

const ARCHIVOS_PERMITIDOS = [
  "como-apagar-la-mente.pdf",
  "el-arte-de-creer-en-ti.pdf",
];

export async function GET(req: NextRequest) {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "OK" : "MISSING");
  console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING");

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
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log("Intentando acceder al archivo:", archivo);

    const { data, error } = await supabase.storage
      .from("ebook")
      .createSignedUrl(archivo, 60 * 60);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Error al generar el enlace", detail: error.message }, { status: 500 });
    }

    if (!data?.signedUrl) {
      return NextResponse.json({ error: "No se pudo generar el link" }, { status: 500 });
    }

    console.log("SignedUrl generado correctamente");
    return NextResponse.redirect(data.signedUrl);

  } catch (err) {
    console.error("Error inesperado:", err);
    return NextResponse.json({ error: "Error al leer el archivo", detail: String(err) }, { status: 500 });
  }
}