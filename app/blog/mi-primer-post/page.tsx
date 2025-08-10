export const metadata = {
  title: 'Post de ejemplo',
  description: 'Demostración sin MDX',
}

export default function Page() {
  return (
    <div className="container py-16 prose">
      <h1>Post de ejemplo</h1>
      <p>Este post está en <strong>TSX</strong> (no MDX) para evitar el error del build.</p>
      <ul>
        <li>Guías largas</li>
        <li>Componentes reutilizables</li>
        <li>CTAs contextuales</li>
      </ul>
    </div>
  )
}
