import { CalendlyInline } from '@/components/calendly'

export default function AgendaPage() {
  return (
    <div className="container py-16 prose">
      <h1>Agenda tu sesión</h1>
      <p>Elige el horario que mejor te acomode. Te enviaremos recordatorios por email.</p>
      <div className="border rounded-xl overflow-hidden">
        {/* 👉 Reemplaza con TU URL de Calendly */}
        <CalendlyInline url="https://calendly.com/psic-danielreyna/espacios-disponibles-julio" height={900} />
      </div>
    </div>
  )
}
