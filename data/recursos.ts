// data/recursos.ts
export type Recurso = {
  slug: string
  title: string
  description?: string
  image?: string          // ruta pública, p.ej. /manuales/apagar-mente.png
  price?: number | string
  href?: string           // <-- NUEVO: link externo (Mercado Pago)
}

const recursos: Recurso[] = [
  {
    slug: "como-apagar-la-mente",
    title: "Cómo Apagar tu Mente",
    description: "Técnicas efectivas para calmar el sobrepensamiento.",
    image: "/manuales/apagar-mente.png",
    price: 249,
    href: "https://mpago.la/2bYkKse", // <-- MP
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    description: "Estrategias para fortalecer tu autoestima y confianza.",
    image: "/manuales/el-arte-de-creer-en-ti.png",
    price: 249,
    href: "https://mpago.la/1NgbPFE", // <-- MP
  },
  // Si algún recurso no tiene link externo, simplemente no pongas href
  // y la tarjeta usará la página interna /tienda/[slug]
]

export default recursos
