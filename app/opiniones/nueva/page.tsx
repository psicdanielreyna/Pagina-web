// app/opiniones/nueva/page.tsx
import OpinionForm from "@/components/OpinionForm";

export const metadata = {
  title: "Enviar opinión | Daniel Reyna",
  description: "Comparte tu experiencia con la terapia o los ebooks.",
  robots: { index: false },
};

export default function NuevaOpinionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Enviar opinión</h1>
      <p className="mt-2 text-slate-700">
        Gracias por compartir tu experiencia. Publicaremos solo iniciales y el texto, tras una breve revisión.
      </p>

      <OpinionForm />
    </main>
  );
}