// scripts/send-newsletter.tsx
import "dotenv/config"
import * as React from "react"
import { Resend } from "resend"
import NewsletterIssue from "@/emails/NewsletterIssue"

// ====== ENV ======
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.com"
const RESEND_API_KEY = process.env.RESEND_API_KEY!
const FROM_EMAIL = process.env.FROM_EMAIL!
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const DRY_RUN = (process.env.DRY_RUN || "false").toLowerCase() === "true"

// **tunea estos números**
const BATCH_SIZE = Number(process.env.BATCH_SIZE || 20)        // p.ej. 20 correos por lote
const BATCH_DELAY_MS = Number(process.env.BATCH_DELAY_MS || 60_000) // 60s entre lotes
const RETRIES = Number(process.env.RETRIES || 2)               // reintentos por rate limit
const BACKOFF_MS = Number(process.env.BACKOFF_MS || 90_000)    // 90s espera reintento

if (!RESEND_API_KEY) throw new Error("Falta RESEND_API_KEY")
if (!FROM_EMAIL) throw new Error("Falta FROM_EMAIL")

const resend = new Resend(RESEND_API_KEY)

// ====== Helpers ======
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function looksLikeRateLimit(err: any) {
  const msg = (err?.message || err?.name || "").toString().toLowerCase()
  // señales típicas de Gmail/ESP
  return (
    msg.includes("rate") ||
    msg.includes("temporar") ||
    msg.includes("4.7.28") ||
    msg.includes("try again") ||
    msg.includes("421")
  )
}

// ====== Carga destinatarios ======
async function getRecipients(): Promise<string[]> {
  // A) desde tu Audience de Resend (recomendado)
  if (RESEND_AUDIENCE_ID) {
    const all: string[] = []
    let next: string | null | undefined = undefined
    do {
      const { data, error } = (await resend.contacts.list({
        audienceId: RESEND_AUDIENCE_ID,
        limit: 100,
        after: next || undefined,
      } as any)) as any
      if (error) throw error
      const emails = (data?.data || data || []).map((c: any) => c?.email).filter(Boolean)
      all.push(...emails)
      next = data?.next
    } while (next)
    return all
  }

  // B) fallback manual
  return [
    // "alguien@gmail.com",
  ]
}

// ====== Email React ======
function renderEmail() {
  return (
    <NewsletterIssue
      subject="Tu newsletter semanal"
      preheader="3 ideas prácticas para la semana"
      logoUrl={`${SITE}/logo-newsletter.png`}
      heroUrl={`${SITE}/hero-newsletter.png`}
      title="Hábitos que sí se quedan"
      intro="Gracias por estar aquí. Te comparto 3 ideas breves para empezar la semana con claridad."
      sections={[
        { type: "heading", text: "1) Micro-pasos" },
        { type: "paragraph", content: "El cambio sostenible ocurre en pasos ridículamente pequeños." },
        { type: "list", items: ["1 min de respiración", "Anotar 1 gratitud", "Caminar 5 min"] },
        { type: "heading", text: "2) Fricción baja" },
        { type: "paragraph", content: "Deja la app abierta, tenis a la vista y un vaso con agua listo." },
      ]}
      cta={{ label: "Leer en el blog", href: `${SITE}/blog` }}
      footer={{
        siteName: "Daniel Reyna — Psicólogo",
        websiteUrl: SITE,
        instagram: "https://instagram.com/psic.danielreyna",
        youtube: "https://youtube.com/@Psicdanielreyna",
        x: "https://x.com/psicdanreyna",
        unsubscribeUrl: `${SITE}/unsubscribe`,
      }}
    />
  )
}

// ====== Envío con lotes, pausas y reintentos ======
async function sendBatch(to: string[]) {
  if (DRY_RUN) {
    console.log(`🧪 DRY_RUN: simular envío a ${to.length} destinatarios`)
    return { id: "dry_run" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Tu newsletter semanal",
      react: renderEmail() as React.ReactElement,
    })
    if (error) throw error
    return data
  } catch (err) {
    throw err
  }
}

async function main() {
  const recipients = await getRecipients()

  // Ordena para enviar primero NO-gmail (sube reputación con mejor deliverability)
  recipients.sort((a, b) => {
    const ag = a.endsWith("@gmail.com") || a.endsWith("@googlemail.com")
    const bg = b.endsWith("@gmail.com") || b.endsWith("@googlemail.com")
    return Number(ag) - Number(bg)
  })

  console.log(`👥 Destinatarios: ${recipients.length}`)
  const groups = chunk(recipients, BATCH_SIZE)

  for (let i = 0; i < groups.length; i++) {
    const batch = groups[i]
    console.log(`\n✉️  Lote ${i + 1}/${groups.length} → ${batch.length} emails`)

    // reintentos si huele a rate limit
    let attempt = 0
    while (true) {
      try {
        const data = await sendBatch(batch)
        console.log("✅ Lote enviado:", data?.id || "ok")
        break
      } catch (err: any) {
        attempt++
        if (looksLikeRateLimit(err) && attempt <= RETRIES) {
          const wait = BACKOFF_MS * attempt
          console.warn(`⏳ Rate limit detectado. Reintentando en ${Math.round(wait / 1000)}s…`)
          await sleep(wait)
          continue
        }
        console.error("❌ Error definitivo en lote:", err)
        break
      }
    }

    // pausa entre lotes (si no es el último)
    if (i < groups.length - 1) {
      console.log(`🛑 Pausa ${Math.round(BATCH_DELAY_MS / 1000)}s antes del siguiente lote…`)
      await sleep(BATCH_DELAY_MS)
    }
  }

  console.log("\n🏁 Proceso finalizado")
}

main().catch((e) => {
  console.error("Fallo general:", e)
  process.exit(1)
})