import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES: Record<string, string> = {
  "como-apagar-la-mente": process.env.STRIPE_PRICE_APAGAR_MENTE!,
  "el-arte-de-creer-en-ti": process.env.STRIPE_PRICE_ARTE_CREER!,
  "bundle-completo": process.env.STRIPE_PRICE_BUNDLE!,
};

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  const priceId = PRICES[slug];

  if (!priceId) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/tienda`,
    metadata: { slug },
  });

  return NextResponse.json({ url: session.url });
}