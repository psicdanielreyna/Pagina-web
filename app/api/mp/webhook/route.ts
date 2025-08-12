import { NextRequest } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { Resend } from 'resend'
import { signToken } from '@/lib/tokens'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // MP envía ?type=payment&id=... (o ?topic=payment)
  const url = new URL(req.url)
  const type = url.searchParams.get('type') || url.searchParams.get('topic')
  const paymentId = url.searchParams.get('id') || url.searchParams.get('data.id')
  if (type !== 'payment' || !paymentId) return new Response('OK', { status: 200 })

  try {
    const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
    const payment = new Payment(mp)
    const res = await payment.get({ id: paymentId })

    if (res.status !== 'approved') return new Response('OK', { status: 200 })

    const email = res.payer?.email || ''
    const id = (res.metadata as any)?.id || ''
    if (!email || !id) return new Response('OK', { status: 200 })

    // token 24h
    const token = signToken({ id, email }, 60 * 60 * 24)
    const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
    const urlLink = `${site}/api/download?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`

    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: 'Tu descarga está lista',
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
          <h2>¡Gracias por tu compra!</h2>
          <p>Puedes descargar tu archivo durante las próximas 24 horas:</p>
          <p><a href="${urlLink}">Descargar ahora</a></p>
          <p style="color:#555">Si el enlace expira, respóndenos este correo y te lo reactivamos.</p>
        </div>
      `,
    })

    return new Response('OK', { status: 200 })
  } catch {
    return new Response('OK', { status: 200 }) // no fallar el webhook
  }
}
