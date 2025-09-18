// scripts/send-newsletter.tsx
import 'dotenv/config'
import * as React from 'react'
import { Resend } from 'resend'
import NewsletterIssue from '@/emails/NewsletterIssue'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM_EMAIL = process.env.FROM_EMAIL!

// usa tu dominio público para construir URLs absolutas
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://danielreyna.com'
const logo = `${SITE}/logo-newsletter.png`
const hero = `${SITE}/hero-newsletter.png`

async function main() {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ['tu-correo-de-prueba@correo.com'], // cámbialo
    subject: 'Tu newsletter semanal',
    react: (
      <NewsletterIssue
        subject="Tu newsletter semanal"
        preheader="3 ideas prácticas para la semana"
        logoUrl={logo}
        heroUrl={hero}
        title="Hábitos que sí se quedan"
        intro="Gracias por estar aquí. Te comparto 3 ideas breves para empezar la semana con claridad."
        sections={[
          { type: 'heading', text: '1) Micro-pasos' },
          { type: 'paragraph', content: 'El cambio sostenible ocurre en pasos ridículamente pequeños.' },
          { type: 'list', items: ['1 minuto de respiración', 'Anotar 1 gratitud', 'Caminar 5 min'] },
          { type: 'heading', text: '2) Fricción baja' },
          { type: 'paragraph', content: 'Deja la app abierta, tenis a la vista y un vaso con agua listo.' },
        ]}
        cta={{ label: 'Leer en el blog', href: `${SITE}/blog` }}
        footer={{
          siteName: 'Daniel Reyna — Psicólogo',
          websiteUrl: SITE,
          instagram: 'https://instagram.com/psic.danielreyna',
          youtube: 'https://youtube.com/@Psicdanielreyna',
          x: 'https://x.com/psicdanreyna',
          unsubscribeUrl: `${SITE}/unsubscribe`,
        }}
      />
    ),
  })

  if (error) {
    console.error('❌ Error enviando newsletter:', error)
  } else {
    console.log('✅ Newsletter enviado:', data?.id)
  }
}

main()