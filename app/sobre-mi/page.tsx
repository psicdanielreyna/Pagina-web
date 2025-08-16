// app/sobre-mi/page.tsx
import Image from "next/image";

export default function SobreMiPage() {
  return (
    <section id="sobre-mi" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título principal */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
          Sobre mí
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Hola, soy Daniel Reyna
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Soy <strong>psicólogo clínico cognitivo-conductual</strong>,
              especializado en <strong>terapia breve</strong>. Cuento con
              experiencia trabajando con <strong>adolescentes y adultos</strong>{" "}
              en México, tanto en sesiones <strong>en línea</strong> como{" "}
              <strong>presenciales</strong>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Mi enfoque está en ayudarte a manejar la{" "}
              <strong>ansiedad, el estrés, la depresión y los procesos de duelo</strong>, brindándote herramientas
              prácticas y efectivas que puedas aplicar desde la primera sesión.
            </p>

            <p className="text-lg text-gray-700">
              Sígueme en Instagram:{" "}
              <a
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                @psic.danielreyna
              </a>
            </p>
          </div>

          {/* Imagen */}
          <div className="flex justify-center">
            <Image
              src="/images/daniel-reyna-hero.webp" // asegúrate de que existe en /public/images/
              alt="Daniel Reyna Psicólogo"
              width={640}
              height={800}
              className="rounded-2xl shadow-lg w-full max-w-sm md:max-w-md h-auto object-cover"
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
