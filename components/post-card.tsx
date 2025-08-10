import Link from 'next/link'

export function PostCard({ title, href }:{ title:string, href:string }){
  return (
    <Link href={href} className="block border rounded-2xl p-6 bg-card hover:shadow-sm transition-shadow">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">Leer →</p>
    </Link>
  )
}
