# PsicoToolKit — Starter (Next.js 14 + Tailwind + MDX + Netlify)

Boilerplate listo para GitHub + Netlify con App Router, Tailwind, componentes estilo shadcn y soporte MDX.

## Requisitos
- Node 18+
- Cuenta en Netlify y GitHub

## Setup local
```bash
npm install
npm run dev
```
Visita http://localhost:3000

## Estructura
- `app/` — páginas (App Router). MDX habilitado.
- `components/` — UI (button, header, etc.).
- `public/` — assets.
- `netlify.toml` — plugin oficial Next.js.
- `tailwind.config.ts` y `app/globals.css` — estilos.

## Blog en MDX
Ejemplo en `app/blog/mi-primer-post/page.mdx`. Crea más carpetas MDX dentro de `app/blog/`.

## Despliegue en Netlify
1. Sube este repo a GitHub.
2. En Netlify: **Add new site → Import an existing project**.
3. Selecciona el repo. Build command: `npm run build` — Publish directory: `.next`
4. Asegúrate de tener el plugin `@netlify/plugin-nextjs` (ya está en `netlify.toml`).

## Personaliza
- Cambia metadatos en `app/layout.tsx`.
- Ajusta paleta en `app/globals.css`.
- Reemplaza imágenes en `public/`.
- Integra Calendly/Cal.com en `app/agenda/page.tsx`.
- Conecta tu proveedor de newsletter real (Resend/Beehiiv) en `components/newsletter-form.tsx`.

> Próximos pasos sugeridos: Stripe/Mercado Pago, descargas seguras y área de cliente.

## Enviar newsletter (Resend)

Requisitos:
- `.env.local` con `RESEND_API_KEY`, `FROM_EMAIL`, `RESEND_AUDIENCE_ID`, `SEND_EMAILS=true`, `NEXT_PUBLIC_SITE_URL`, etc.
- Verificar dominio y SPF/DKIM en Resend.

Comandos:

```bash
# envío real
npm run send:newsletter

# simulación (no envía, solo prueba contactos/lotes)
npm run send:dry
