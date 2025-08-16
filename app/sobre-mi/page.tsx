import Image from "next/image";

export default function SobreMiPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Sobre mí</h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Soy <strong>psicólogo clínico cognitivo conductual</strong>, especializado en{" "}
            <strong>terapia breve</strong>. Tengo experiencia trabajando con{" "}
            <strong>adolescentes y adultos</strong> en México, tanto en línea como de manera
            presencial.
          </p>
          <p>
            Mi enfoque está en ayudarte a manejar la{" "}
            <strong>ansiedad, el estrés, la depresión y los procesos de duelo</strong>, brindándote
            herramientas prácticas y efectivas para mejorar tu bienestar emocional.
          </p>
          <p>
            Sígueme en Instagram:{" "}
            <a
              href="https://www.instagram.com/psic.danielreyna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @psic.danielreyna
            </a>
          </p>
        </div>

        {/* Imagen */}
        <div className="rounded-2xl overflow-hidden shadow-lg flex justify-center">
         <Image
          src="/images/daniel-reyna-hero.webp"
          alt="Daniel Reyna Psicólogo"
          width={560}
          height={700}
          className="w-full max-w-sm h-auto object-contain"
          priority
           
          />
        </div>
      </div>
    </div>
  );
}
