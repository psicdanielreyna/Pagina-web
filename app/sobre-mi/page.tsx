import Image from "next/image";
import InstagramWidget from "@/components/InstagramWidget";

export default function SobreMiPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Hero expandido con tu foto y descripción */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sobre mí
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Soy <span className="font-semibold">psicólogo clínico cognitivo conductual</span>, especializado en terapia breve cognitivo conductual. 
            Tengo experiencia trabajando con adolescentes y adultos en México, tanto en línea como de manera presencial.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Mi enfoque está en ayudarte a manejar la ansiedad, el estrés, la depresión y los procesos de duelo, 
            brindándote herramientas prácticas y efectivas para mejorar tu bienestar emocional.
          </p>

          {/* Link a Instagram */}
          <a
            href="https://instagram.com/psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Sígueme en Instagram: @psic.danielreyna
          </a>
        </div>

        {/* Imagen Hero */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/hero-expandido.jpg" // asegúrate que la foto esté en /public
            alt="Daniel Reyna Psicólogo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Widget de Instagram */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Mi Instagram
        </h2>
        <InstagramWidget />
      </div>
    </section>
  );
}
