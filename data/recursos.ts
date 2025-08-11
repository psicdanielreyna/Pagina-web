export type Recurso = {
  id: string
  title: string
  description: string
  price: number
  currency: 'MXN'
  image: string
  href: string
}

export const recursos: Recurso[] = [
  {
    id: 'apagar-mente',
    title: 'Cómo Apagar tu Mente',
    description: 'Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/apagar-mente.png',
    href: 'descargar?id=como-apagar-tu-mente'
  },
  {
    id: 'arte-creer-en-ti',
    title: 'El Arte de Creer en Ti',
    description: 'Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/el-arte-de-creer-en-ti.png',
    href: 'descargar?id=el-arte-de-creer-en-ti'
  }
]
