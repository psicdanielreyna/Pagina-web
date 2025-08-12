import { NextRequest } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { RESOURCE_PRICES, RESOURCE_TITLES } from '@/lib/purchase'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { id, email } = await req.json() as { id: string; email?: string }
    if (!id || !RESOURCE_PRICES[id]) {
      return new Response('Bad Request', { status: 400 })
    }

    const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
    const pref = new Preference(mp)

    const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
    const result = await pref.create({
      body: {
        items: [{
          id,
          title: RESOURCE_TITLES[id] || id,
          quantity: 1,
          currency_id: 'MXN',
          unit_price: RESOURCE_PRICES[id],
        }],
        payer: email ? { email } : undefined,
        back_urls: {
          success: `${site}/gracias`,
          failure: `${site}/tienda`,
          pending: `${site}/gracias`,
        },
        auto_return: 'approved',
        notification_url: `${site}/.netlify/functions/next_api_mp_webhook`, // 👈 webhook
        metadata: { id } // para recuperar el recurso en el webhook
      }
    })

    // init_point (web), sandbox_init_point en test
    const url = result.init_point || result.sandbox_init_point
    if (!url) return new Response('No init_point', { status: 500 })

    return Response.json({ init_point: url })
  } catch (e) {
    return new Response('Server error', { status: 500 })
  }
}
