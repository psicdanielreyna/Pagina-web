// /data/recursos.ts
type Recurso = {
  slug: string
  title: string
  description: string
  price: number
  image: string
  mercadoPago?: string
}

const recursos: Recurso[] = [
  {
    sslug: "como-apagar-la-mente",
    title: "Cómo Apagar tu Mente",
    description: "Técnicas efectivas para calmar el sobrepensamiento.",
    image: "/manuales/apagar-mente.png",
    price: 249,
    href: "https://mpago.la/2bYkKse", // <- Mercado Pago
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    description: "Estrategias para fortalecer tu autoestima y confianza.",
    image: "/manuales/el-arte-de-creer-en-ti.png",
    price: 249,
    href: "https://mpago.la/1NgbPFE", // <- Mercado Pago
  },
]

export default recursos
