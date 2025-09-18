// scripts/send-newsletter.tsx
import { config } from "dotenv";
config({ path: ".env.local" });

import * as React from "react";
import { Resend } from "resend";
import NewsletterIssue from "../emails/NewsletterIssue";

// --- helpers: sanitizar y validar FROM_EMAIL ---
function cleanFrom(raw?: string) {
  if (!raw) return "";
  // recorta, quita comillas rectas al inicio/fin y espacios invisibles
  return raw.trim().replace(/^['"]|['"]$/g, "").replace(/\u200B/g, "");
}

const RAW_FROM = process.env.FROM_EMAIL;
const FROM = cleanFrom(RAW_FROM);

// imprime literal para ver si hay caracteres raros
console.log("FROM_EMAIL leído →", JSON.stringify(FROM));

const FROM_VALID =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(FROM) || // email simple
  /^[^<>]+<\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*>$/.test(FROM); // "Nombre <email>"

if (!process.env.RESEND_API_KEY) {
  console.error("❌ Falta RESEND_API_KEY (no se cargó .env.local)");
  process.exit(1);
}

if (!FROM_VALID) {
  console.warn(
    "⚠️  FROM_EMAIL inválido por formato. Usando fallback temporal 'onboarding@resend.dev' (solo para pruebas)."
  );
}

const resend = new Resend(process.env.RESEND_API_KEY!);

async function main() {
  const { data, error } = await resend.emails.send({
    from: FROM_VALID ? FROM : "onboarding@resend.dev",
    to: [
      // 👇 reemplaza por tu correo de prueba o lista
      "psic.danielreyna@gmail.com",
    ],
    subject: "Tu newsletter semanal",
    react: (
      <NewsletterIssue
        subject="Tu newsletter semanal"
        preheader="3 ideas prácticas para la semana"
        logoUrl="https://danielreyna.com/logo.png"
        heroUrl="https://danielreyna.com/hero-newsletter.png"
        title="Hábitos que sí se quedan"
        intro="Gracias por estar aquí. Te comparto 3 ideas breves para empezar la semana con claridad."
        sections={[
          { type: "heading", text: "1) Micro-pasos" },
          {
            type: "paragraph",
            content: "El cambio sostenible ocurre en pasos ridículamente pequeños.",
          },
          {
            type: "list",
            items: ["1 minuto de respiración", "Anotar 1 gratitud", "Caminar 5 min"],
          },
          { type: "heading", text: "2) Fricción baja" },
          {
            type: "paragraph",
            content: "Deja la app abierta, tenis a la vista y un vaso con agua listo.",
          },
        ]}
        cta={{ label: "Leer en el blog", href: "https://danielreyna.com/blog" }}
        footer={{
          siteName: "Daniel Reyna — Psicólogo",
          websiteUrl: "https://danielreyna.com",
          instagram: "https://instagram.com/psic.danielreyna",
          youtube: "https://youtube.com/@Psicdanielreyna",
          x: "https://x.com/psicdanreyna",
          unsubscribeUrl: "https://danielreyna.com/unsubscribe",
        }}
      />
    ),
  });

  if (error) {
    console.error("❌ Error enviando newsletter:", error);
    process.exit(1);
  }

  console.log("✅ Newsletter enviado:", data?.id);
}

main();