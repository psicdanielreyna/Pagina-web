// lib/tokens.ts
// Helpers para tokens de un solo uso (descargas) y firma HMAC “tipo JWT”.
// - generateToken(): token aleatorio (para tabla DownloadToken).
// - signToken()/verifyToken(): token firmado con expiración embebida (si lo necesitas).

import crypto from "node:crypto";

const SECRET =
  process.env.DOWNLOAD_TOKEN_SECRET ||
  process.env.APP_SECRET || // fallback si ya lo tienes en env
  "dev-secret";

export type SignedPayload = Record<string, unknown> & { exp?: number };

/**
 * Token aleatorio seguro (hex). Útil para guardar en DB como token de descarga.
 */
export function generateToken(bytes: number = 24): string {
  return crypto.randomBytes(bytes).toString("hex"); // 48 chars por default
}

/**
 * Firma un payload con HMAC-SHA256 y TTL en segundos.
 * Devuelve un token compacto <base64url(body)>.<base64url(mac)>
 */
export function signToken(payload: Record<string, unknown>, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body: SignedPayload = { ...payload, exp };
  const json = JSON.stringify(body);
  const b64 = Buffer.from(json).toString("base64url");
  const mac = crypto.createHmac("sha256", SECRET).update(b64).digest("base64url");
  return `${b64}.${mac}`;
}

/**
 * Verifica la firma y la expiración. Devuelve el payload si es válido; si no, null.
 */
export function verifyToken<T extends SignedPayload = SignedPayload>(token: string): T | null {
  const [b64, mac] = token.split(".");
  if (!b64 || !mac) return null;

  const expected = crypto.createHmac("sha256", SECRET).update(b64).digest("base64url");

  // timingSafeEqual requiere mismos tamaños; si difieren, invalida directo
  const macBuf = Buffer.from(mac);
  const expBuf = Buffer.from(expected);
  if (macBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(macBuf, expBuf)) return null;

  let data: T;
  try {
    data = JSON.parse(Buffer.from(b64, "base64url").toString()) as T;
  } catch {
    return null;
  }

  if (!data?.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
  return data;
}
