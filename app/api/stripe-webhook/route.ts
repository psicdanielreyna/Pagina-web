import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { SignJWT } from "jose";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const PRODUCTOS: Record<string, { nombre: string; archivos: string[] }> = {
  "como-apagar-la-mente": {
    nombre: "Cómo Apagar tu Mente",
    archivos: ["como-apagar-la-mente.pdf"],
  },
  "el-arte-de-creer-en-ti": {
    nombre: "El Arte de Creer en Ti",
    archivos: ["el-arte-de-creer-en-ti.pdf"],
  },
  "bundle-completo": {
    nombre: "Pack Completo",
    archivos: ["como-apagar-la-mente.pdf", "el-arte-de-creer-en-ti.pdf"],
  },
};

async function generarToken(archivo: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.DOWNLOAD_TOKEN_SECRET!);
  return new SignJWT({ archivo })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("48h")
    .setIssuedAt()
    .sign(secret);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.slug;
    const email = session.customer_details?.email;

    if (!slug || !email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const producto = PRODUCTOS[slug];
    if (!producto) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    // Genera un token por cada archivo
    const linksHtml = await Promise.all(
      producto.archivos.map(async (archivo) => {
        const token = await generarToken(archivo);
        const url = `${siteUrl}/api/download-manual?token=${encodeURIComponent(token)}`;
        const nombre = archivo.replace(".pdf", "").replace(/-/g, " ");
        return `<li style="margin-bottom:8px;">
          <a href="${url}" style="color:#1D9E75;font-weight:500;">${nombre}</a>
          <span style="color:#a1a1aa;font-size:12px;"> — válido 48 horas</span>
        </li>`;
      })
    );

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: `¡Tu compra está lista! — ${producto.nombre}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
          <h1 style="font-size:22px;color:#18181b;margin-bottom:8px;">¡Gracias por tu compra!</h1>
          <p style="color:#52525b;margin-bottom:20px;">
            Aquí están tus enlaces de descarga. Son válidos por <strong>48 horas</strong>.
          </p>
          <ul style="padding-left:20px;margin-bottom:24px;">
            ${linksHtml.join("")}
          </ul>
          <p style="color:#71717a;font-size:13px;margin-bottom:4px;">
            Si los enlaces expiran o tienes algún problema, escríbeme a 
            <a href="mailto:danielreyna@danielreyna.com" style="color:#1D9E75;">
              danielreyna@danielreyna.com
            </a>
          </p>
          <hr style="border:none;border-top:1px solid #f1f1f1;margin:24px 0;" />
          <p style="color:#a1a1aa;font-size:12px;">
            Daniel Reyna · Psicólogo · danielreyna.com
          </p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}