import crypto from 'node:crypto'

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'dev-secret'

export function signToken(payload: object, ttlSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const body = { ...payload, exp }
  const json = JSON.stringify(body)
  const b64 = Buffer.from(json).toString('base64url')
  const mac = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url')
  return `${b64}.${mac}`
}

export function verifyToken(token: string): null | any {
  const [b64, mac] = token.split('.')
  if (!b64 || !mac) return null
  const expected = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null
  const data = JSON.parse(Buffer.from(b64, 'base64url').toString())
  if (!data?.exp || data.exp < Math.floor(Date.now() / 1000)) return null
  return data
}
