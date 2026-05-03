import Link from "next/link";

export default function GraciasPage() {
  return (
    <main
      className="min-h-[80vh] flex items-center justify-center px-6"
      style={{ background: "#F8F5F0" }}
    >
      <div className="max-w-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "#E1F5EE" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-medium text-zinc-900 mb-3">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">
          En unos minutos recibirás un correo con el enlace para descargar tu manual. 
          Revisa también tu carpeta de spam por si acaso.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/tienda"
            className="rounded-full bg-zinc-900 text-white text-sm px-6 py-2.5 hover:bg-zinc-700 transition-colors"
          >
            Ver más recursos
          </Link>
          <Link
            href="/"
            className="rounded-full border border-black/8 text-zinc-500 text-sm px-6 py-2.5 hover:bg-black/5 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}