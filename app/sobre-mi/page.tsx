export default function SobreMiPage(){
  return (
    <div className="container py-16 prose">
      <h1>Sobre mí</h1>
      <p><strong>Daniel Reyna</strong> — Psicólogo con enfoque cognitivo-conductual (CBT breve).</p>
      <p>Cédula: 12418521. Respaldo profesional en Monterrey, colaboración con Fundación BEST.</p>
      <p>Trabajo con ansiedad, depresión, duelo y autoestima, con estrategias claras y aplicables.</p>
      <p>
        { /* Si SÍ hay agenda, deja esto */ }
        <a className="underline" href="/agenda">Agenda tu sesión</a>
        {' '}o suscríbete al newsletter para recibir herramientas prácticas.
      </p>
    </div>
  )
}
