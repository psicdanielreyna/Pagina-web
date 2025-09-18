// scripts/send-newsletter.ts
import { Resend } from "resend";
import NewsletterIssue from "@/emails/NewsletterIssue";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.FROM_EMAIL!;

const recipients = ["tu-correo-de-prueba@correo.com"]; // cámbialo por tu Audience o lista real

async function main() {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: recipients,
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
          { type: "list", items: ["1 minuto de respiración", "Anotar 1 gratitud", "Salir a caminar 5 min"] },
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
  } else {
    console.log("✅ Newsletter enviado:", data);
  }
}

main();