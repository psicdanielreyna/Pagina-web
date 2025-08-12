export type Recurso = {
  id: string
  title: string
  description: string
  price: number
  currency: 'MXN'
  image: string
  href: string
}

export const recursos = [
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: 249,
    image: "/manuales/el-arte-de-creer-en-ti.png",
    description: "Estrategias y ejercicios para fortalecer tu autoestima.",
    file: "/manuales/el-arte-de-creer-en-ti.pdf",
    mercadoPago: "https://mpago.la/xxxxx"   // <— Asegúrate de tener esto
  },
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo Apagar tu Mente",
    price: 249,
    image: "/manuales/apagar-mente.png",
    description: "Técnicas prácticas para detener el sobrepensamiento.",
    file: "/manuales/como-apagar-tu-mente.pdf",
    mercadoPago: "https://mpago.la/yyyyy"   // <— Y esto también
  }
]

