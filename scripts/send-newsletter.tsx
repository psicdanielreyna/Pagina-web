// scripts/send-newsletter.tsx
import "dotenv/config";
import * as React from "react";
import { Resend } from "resend";
import NewsletterIssue from "@/emails/NewsletterIssue";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.com";
const FROM_EMAIL = process.env.FROM_EMAIL!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const DRY_RUN = (process.env.DRY_RUN || "").toLowerCase() === "true";

if (!RESEND_API_KEY) throw new Error("Falta RESEND_API_KEY");
if (!FROM_EMAIL) throw new Error("Falta FROM_EMAIL");
if (!RESEND_AUDIENCE_ID) throw new Error("Falta RESEND_AUDIENCE_ID");

const resend = new Resend(RESEND_API_KEY);
const logo = `${SITE}/logo-newsletter.png`;
const hero = `${SITE}/hero-newsletter.png`;

// Trae todos los contactos de la audience (filtra unsubscribed)
async function fetchAllAudienceEmails(audienceId: string) {
  const emails: string[] = [];
  let next: string | undefined;

  do {
    // usamos `as any` porque los typings de Resend no incluyen `limit` ni `cursor`
    const response = (await resend.contacts.list({
      audienceId,
      limit: 200,
      cursor: next,
    } as any)) as any;

    if (response.error) throw response.error;

    const contacts = response.data?.data ?? response.data ?? [];
    for (const c of contacts) {
      if (!c.unsubscribed && c.email) emails.push(c.email);
    }
    next = response.data?.nextCursor || response.nextCursor || undefined;
  } while (next);

  return emails;
}

function renderIssue() {
  return (
    <NewsletterIssue
      subject="Tu newsletter semanal"
      preheader="3 ideas prácticas para la semana"
      logoUrl={logo}
      heroUrl={hero}
      title="Hábitos que sí se quedan"
      intro="Gracias por estar aquí. Te comparto 3 ideas breves para empezar la semana con claridad."
      sections={[
        { type: "heading", text: "1) Micro-pasos" },
        {
          type: "paragraph",
          content:
            "El cambio sostenible ocurre en pasos ridículamente pequeños.",
        },
        {
          type: "list",
          items: ["1 minuto de respiración", "Anotar 1 gratitud", "Caminar 5 min"],
        },
        { type: "heading", text: "2) Fricción baja" },
        {
          type: "paragraph",
          content:
            "Deja la app abierta, tenis a la vista y un vaso con agua listo.",
        },
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
  );
}

async function sendBatch(to: string[]) {
  if (DRY_RUN) {
    console.log(`🧪 DRY_RUN activo — NO se envía. Lote con ${to.length} destinatarios`);
    return { data: { id: "dry_run" } };
  }

  const response = (await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Tu newsletter semanal",
    react: renderIssue(),
  })) as any;

  if (response.error) throw response.error;
  return response;
}

async function main() {
  const recipients = await fetchAllAudienceEmails(RESEND_AUDIENCE_ID);
  if (recipients.length === 0) {
    console.log("No hay destinatarios en la audience.");
    return;
  }
  console.log(`👥 Destinatarios totales: ${recipients.length} (DRY_RUN=${DRY_RUN})`);

  const CHUNK = 80;
  for (let i = 0; i < recipients.length; i += CHUNK) {
    const slice = recipients.slice(i, i + CHUNK);
    console.log(`✉️  Enviando lote ${i / CHUNK + 1} (${slice.length} emails)…`);
    const { data } = await sendBatch(slice);
    console.log("✅ Lote enviado. id:", data?.id);
  }
}

main().catch((e) => {
  console.error("❌ Error general:", e);
  process.exit(1);
});