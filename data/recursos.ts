// data/recursos.ts
export type Recurso = {
  slug: string
  title: string
  description: string
  price: number
  currency?: 'MXN'
  image: string
  file: string           // ruta al PDF en /public/manuales
  mercadoPago?: string   // URL de checkout MP (opcional)
}

export const recursos: Recurso[] = [
  {
    slug: 'el-arte-de-creer-en-ti',
    title: 'El Arte de Creer en Ti',
    description:
      'Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/el-arte-de-creer-en-ti.png',
    file: '/manuales/el-arte-de-creer-en-ti.pdf',
    mercadoPago: 'https://link-de-mercado-pago-para-este-producto'
  },
  {
    slug: 'como-apagar-tu-mente',
    title: 'Cómo Apagar tu Mente',
    description:
      'Técnicas prácticas para detener el sobrepensamiento y encontrar calma.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/apagar-mente.png',
    file: '/manuales/como-apagar-tu-mente.pdf',
    // mercadoPago: 'https://otro-link-si-lo-tienes'
  }
]
