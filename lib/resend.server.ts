// lib/resend.server.ts
export async function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const { Resend } = await import("resend");
  return new Resend(key);
}
