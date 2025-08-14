// data/recursos.ts
export type Recurso = {
  slug: string
  title: string
  description: string
  image: string
  price: number
  // opcionales:
  mercadoPago?: string     // enlace a Checkout de Mercado Pago
  stripeBuyButtonId?: string
  file?: string
  href?: string
}

const recursos: Recurso[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo Apagar tu Mente",
    description:
      "Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.",
    image: "/manuales/como-apagar-tu-mente.png",
    price: 249,
    // mercadoPago: "https://link-mercadopago-1", // ← agrega si ya tienes el link
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    description:
      "Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.",
    image: "/manuales/el-arte-de-creer-en-ti.png",
    price: 249,
    // mercadoPago: "https://link-mercadopago-2", // ← agrega si ya tienes el link
  },
]

export { recursos }     // nombrado
export default recursos // default
