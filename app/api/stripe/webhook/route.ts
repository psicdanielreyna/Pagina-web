import { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { STRIPE_TO_RESOURCE, RESOURCE_IDS } from '@/lib/purchase'
import { signToken } from '@/lib/tokens'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  const sig = req.headers.get('stripe-signature') || ''
  const buf = Buffer.from(await req.arrayBuffer())

  let evt: Stripe.Event
  try {
    evt = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Para Buy Button/Payment Link suele llegar checkout.session.completed
  if (evt.type === 'checkout.session.completed') {
    const session = evt.data.object as Stripe.Checkout.Session
    const email = (session.customer_details?.email || session.customer_email || '').trim()
    const line = session?.line_items?.data?.[0] // Si activaste expand en Stripe… si no, abajo resolvemos
    // Fallback: obtén line items si no venían expandidos
    let priceId = (line?.price?.id || '') as string
    if (!priceId && session.id) {
      const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 })
      priceId = items.data[0]?.price?.id || ''
    }

    const recurso = STRIPE_TO_RESOURCE[priceId]
    if (!email || !recurso) return new Response('OK', { status: 200 }) // no falles el webhook

    // Token válido 24h
    const token = signToken({ id: RESOURCE_IDS[recurso], email }, 60 * 60 * 24)
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://danielreyna.netlify.app'}/api/download?token=${encodeURIComponent(token)}`

    // Email
    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: 'Tu descarga está lista',
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
          <h2>Gracias por tu compra</h2>
          <p>Puedes descargar tu archivo durante las próximas 24 horas:</p>
          <p><a href="${url}">Descargar ahora</a></p>
          <p style="color:#555">Si el enlace expira, respóndenos este correo y te lo reactivamos.</p>
        </div>`
    })
  }

  return new Response('OK', { status: 200 })
}
