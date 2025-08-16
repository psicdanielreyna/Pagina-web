// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
        {/* Izquierda */}
        <p className="mb-2 md:mb-0">
          Monterrey, Nuevo León · Atención en línea y presencial
        </p>

        {/* Derecha */}
        <p className="text-slate-500">
          © {new Date().getFullYear()} Daniel Reyna. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
