export default function ServiciosPage(){
  return (
    <div className="container py-16 prose">
      <h1>Servicios</h1>
      <p>Enfoque CBT breve: ansiedad, depresión, duelo y autoestima.</p>
      <h2>Modalidades</h2>
      <ul>
        <li>Online</li>
        <li>Presencial</li>
        <li>Pareja</li>
      </ul>
      <h2>Precios</h2>
      <p>Precios accesibles. <a className="underline" href=<Link href="/agenda?t=individual" className="btn-primary">Agendar</Link>
<Link href="/agenda?t=paquete" className="btn-primary">Agendar</Link>
<Link href="/agenda?t=pareja" className="btn-primary">Agendar</Link>

      <h2>Preguntas frecuentes</h2>
      <p>Próximamente.</p>
    </div>
  )
}
