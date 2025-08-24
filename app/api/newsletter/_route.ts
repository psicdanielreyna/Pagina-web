// 👇 impide que Next intente prerender esta ruta en build
export const dynamic = 'force-dynamic';

import { Resend } from 'resend';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No rompemos el build ni la app: simplemente lo deshabilitamos
    return Response.json(
      { ok: false, error: 'Newsletter temporalmente deshabilitado.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  // ...tu lógica actual (leer email del body y enviar)
}
