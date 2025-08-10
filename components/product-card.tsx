import Link from 'next/link'

export function ProductCard({ title, description, href, image, price }:{
  title:string, description:string, href:string, image?:string, price?:string
}){
  return (
    <Link href={href} className="block border rounded-2xl overflow-hidden bg-card hover:shadow-sm transition-shadow">
      <div className="aspect-video bg-muted" />
      <div className="p-5">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 text-sm ">{price || ''}</div>
      </div>
    </Link>
  )
}
