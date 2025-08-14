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
    "slug": "como-apagar-tu-mente",
    "title": "Cómo Apagar tu Mente",
    "description": "Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.",
    "image": "/manuales/como-apagar-tu-mente.png",
    "price": 249
  },
  {
    "slug": "el-arte-de-creer-en-ti",
    "title": "El Arte de Creer en Ti",
    "description": "Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.",
    "image": "/manuales/el-arte-de-creer-en-ti.png",
    "price": 249
  }
]

