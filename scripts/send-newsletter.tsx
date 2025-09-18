// scripts/send-newsletter.tsx
import { config } from "dotenv";
config({ path: ".env.local" });

import * as React from "react";
import { Resend } from "resend";
import NewsletterIssue from "../emails/NewsletterIssue";

if (!process.env.RESEND_API_KEY) {
  console.error("❌ Falta RESEND_API_KEY (no se cargó .env.local)");
  process.exit(1);
}

if (!process.env.FROM_EMAIL) {
  console.error("❌ Falta FROM_EMAIL en el .env.local");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY!);

async function main() {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: ["tu-correo-de-prueba@correo.com"], // 👈 cámbialo a tu correo real de prueba
    subject: "Tu newsletter semanal",
    react: (
      <NewsletterIssue
        subject="Tu newsletter semanal"
        preheader="3 ideas prácticas para la semana"
        logoUrl="https://danielreyna.com/logo.png"
        heroUrl="https://danielreyna.com/og.jpg"
        title="Hábitos que sí se quedan"
        intro="Gracias por estar aquí. Te comparto 3 ideas breves para empezar la semana con claridad."
        sections={[
          { type: "heading", text: "1) Micro-pasos" },
          { type: "paragraph", content: "El cambio sostenible ocurre en pasos ridículamente pequeños." },
          { type: "list", items: ["1 minuto de respiración", "Anotar 1 gratitud", "Caminar 5 min"] },
          { type: "heading", text: "2) Fricción baja" },
          { type: "paragraph", content: "Deja la app abierta, tenis a la vista y un vaso con agua listo." },
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