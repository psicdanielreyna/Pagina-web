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
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    description:
      "Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.",
    price: 249,
    image: "/manuales/el-arte-de-creer-en-ti.png", // <- ruta real en /public
  },
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo Apagar tu Mente",
    description:
      "Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.",
    price: 249,
    image: "/manuales/apagar-mente.png", // <- ruta real en /public
  },
]

export default recursos
