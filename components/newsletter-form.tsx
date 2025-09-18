// components/NewsletterForm.tsx
"use client";

// Este wrapper evita duplicar lógica. Si otros archivos importan NewsletterForm,
// seguimos usando el mismo formulario unificado.
import SubscribeForm from "@/app/(marketing)/newsletter/SubscribeForm";

export default function NewsletterForm() {
  return <SubscribeForm />;
}