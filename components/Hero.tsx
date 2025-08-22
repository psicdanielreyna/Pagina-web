// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Terapia clara y práctica
            <br /> para sentirte mejor.
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Herramientas simples que puedes aplicar en tu día a día.
          </p>
        </div>

        <div className="relative rounded-2xl bg-slate-100 h-56 md:h-72 lg:h-80">
          <Image
            src="/images/hero/portada.jpg" // <-- asegúrate que exista
            alt="Daniel Reyna - Psicólogo"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
