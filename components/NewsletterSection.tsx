// components/NewsletterSection.tsx
import SubscribeForm from "@/app/(marketing)/newsletter/SubscribeForm";

export default function NewsletterSection() {
  return (
    <section className="bg-[#F4F6F8] py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs text-gray-600 ring-1 ring-black/5">
            Newsletter semanal
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            No te pierdas lo mejor para cuidar tu mente cada semana
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Consejos breves y prácticos. Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </div>

        {/* ÚNICO formulario */}
        <SubscribeForm />
      </div>
    </section>
  );
}