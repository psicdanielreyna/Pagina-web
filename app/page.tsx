import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto del hero */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Psicoterapia | Recursos prácticos
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Daniel Reyna — Acompañamiento con herramientas claras y humanas
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Sesiones individuales y de pareja, y materiales descargables para avanzar a tu ritmo.
            </p>
            <div className="flex gap-4">
              <Link
                href="/agendar"
                className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
              >
                Agendar cita
              </Link>
              <Link
                href="/tienda"
                className="px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition"
              >
                Ver tienda
              </Link>
            </div>
          </div>

          {/* Imagen del hero (GENÉRICA) */}
          <div className="relative rounded-2xl border bg-white overflow-hidden shadow-sm">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/header.png"
                alt="Ilustración de consulta terapéutica"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
