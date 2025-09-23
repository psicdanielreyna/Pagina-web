import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get('payment_id')
  if (!paymentId) {
    return NextResponse.json({ error: 'Falta payment_id' }, { status: 400 })
  }

  const admin = createAdminClient()

  // 👇 Usa snake_case como en la tabla y maybeSingle()
  const { data, error } = await admin
    .from('DownloadToken')
    .select('token, used, expires_at, file_path')
    .eq('payment_id', paymentId)
    .maybeSingle()

  if (error) {
    console.error('get-token-by-payment DB error', { paymentId, error })
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  if (data.used) {
    return NextResponse.json({ error: 'Enlace ya utilizado' }, { status: 410 })
  }
  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Enlace expirado' }, { status: 410 })
  }

  return NextResponse.json({ token: data.token })
}