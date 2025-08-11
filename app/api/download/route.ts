import { NextRequest } from 'next/server'
import { DOWNLOADS } from '@/lib/downloads'
import fs from 'node:fs/promises'
import path from 'node:path'
import { verifyToken } from '@/lib/tokens'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') || ''
  const pin = req.nextUrl.searchParams.get('pin') || ''
  const token = req.nextUrl.searchParams.get('token') || ''
  const required = process.env.DOWNLOAD_PIN || ''

  if (!id || !DOWNLOADS[id]) return new Response('Not found', { status: 404 })

  // 1) Si trae token, verifícalo (24h)
  if (token) {
    const data = verifyToken(token)
    if (!data || data.id !== id) return new Response('Unauthorized', { status: 401 })
  } else {
    // 2) Si no hay token, requiere PIN
    if (!required || pin !== required) return new Response('Unauthorized', { status: 401 })
  }

  const fileMeta = DOWNLOADS[id]
  const filePath = path.join(process.cwd(), fileMeta.path)
  try {
    const data = await fs.readFile(filePath)
    return new Response(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileMeta.filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return new Response('File missing', { status: 500 })
  }
}
