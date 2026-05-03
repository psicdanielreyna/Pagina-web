import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const PRODUCTOS: Record<string, { nombre: string; archivo: string }> = {
  "como-apagar-la-mente": {
    nombre: "Cómo Apagar tu Mente",
    archivo: "como-apagar-la-mente.pdf",
  },
  "el-arte-de-creer-en-ti": {
    nombre: "El Arte de Creer en Ti",
    archivo: "el-arte-de-creer-en-ti.pdf",
  },
  "bundle-completo": {
    nombre: "Pack Completo",
    archivo: null!, // bundle manda los dos
  },
};

const BUNDLE_ARCHIVOS = [
  "como-apagar-la-mente.pdf",
  "el-arte-de-creer-en-ti.pdf",
];

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
    const isBundle = slug === "bundle-completo";
    const archivos = isBundle ? BUNDLE_ARCHIVOS : [producto.archivo];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    // Links de descarga por archivo
    const links = archivos
      .map((a) => `<li><a href="${siteUrl}/descargar/${a}">${a.replace(".pdf", "")}</a></li>`)
      .join("");

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: `¡Tu compra está lista! — ${isBundle ? "Pack Completo" : producto.nombre}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
          <h1 style="font-size:22px;color:#18181b;">¡Gracias por tu compra!</h1>
          <p style="color:#52525b;">Aquí están tus manuales. Haz clic para descargarlos:</p>
          <ul style="color:#1D9E75;margin:16px 0;padding-left:20px;">
            ${links}
          </ul>
          <p style="color:#52525b;font-size:13px;">
            Si tienes algún problema, escríbeme a 
            <a href="mailto:danielreyna@danielreyna.com" style="color:#1D9E75;">
              danielreyna@danielreyna.com
            </a>
          </p>
          <p style="color:#a1a1aa;font-size:12px;margin-top:32px;">
            Daniel Reyna · Psicólogo
          </p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
