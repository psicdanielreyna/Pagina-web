import ProductCard from "@/components/product-card"
import NewsletterForm from "@/components/newsletter-form"
import recursos from "@/data/recursos.json"


export default function HomePage() {
  const destacados = recursos.slice(0, 2)

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="pt-8 md:pt-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Daniel Reyna - Psicólogo 
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Psicólogo cognitivo conductual, ayudandote a ser tu mejor versión. Manuales,
            guías y herramientas para psicólogos y personas interesadas en su
            desarrollo personal.
          </p>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Recursos Destacados</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {destacados.map((r) => (
            <ProductCard
              key={r.slug}
              slug={r.slug}
              title={r.title}
              description={r.description}
              image={r.image}
              price={r.price}
            />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Suscríbete para recibir recursos gratis
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Únete a nuestra lista y recibe técnicas, herramientas y material
            exclusivo directamente en tu correo.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}
