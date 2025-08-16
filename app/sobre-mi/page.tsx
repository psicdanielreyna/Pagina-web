import Image from "next/image";

export default function SobreMiPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Sobre mí</h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Soy <span className="font-semibold">psicólogo clínico cognitivo conductual</span>, 
            especializado en <strong>terapia breve</strong>. 
            Tengo experiencia trabajando con <strong>adolescentes y adultos</strong> en México, 
            tanto en línea como de manera presencial.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Mi enfoque está en ayudarte a manejar la <strong>ansiedad, el estrés, la depresión 
            y los procesos de duelo</strong>, brindándote herramientas prácticas y efectivas 
            para mejorar tu bienestar emocional.
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
            src="/images/daniel-reyna-hero.webp" // Foto definitiva en /public/images
            alt="Daniel Reyna Psicólogo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
