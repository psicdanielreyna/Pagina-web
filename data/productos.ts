// data/productos.ts
export type Producto = {
  id: string
  title: string
  description: string
  price: number
  currency: 'MXN'
  image: string
  // Opcionales según lo que hayas creado en Stripe/Mercado Pago
  stripeBuyButtonId?: string
  stripePublishableKey?: string
  mpEnabled?: boolean
}

export const productos: Record<string, Producto> = {
  'como-apagar-tu-mente': {
    id: 'como-apagar-tu-mente',
    title: 'Cómo Apagar tu Mente',
    description: 'Técnicas prácticas para detener el sobrepensamiento y encontrar calma.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/apagar-mente.png',
    stripeBuyButtonId: 'buy_btn_COMO_APAGAR', // <-- reemplaza
    stripePublishableKey: 'pk_test_XXXX',     // <-- reemplaza
    mpEnabled: true,
  },
  'el-arte-de-creer-en-ti': {
    id: 'el-arte-de-creer-en-ti',
    title: 'El Arte de Creer en Ti',
    description: 'Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/el-arte-de-creer-en-ti.png',
    stripeBuyButtonId: 'buy_btn_ARTE_CREER', // <-- reemplaza
    stripePublishableKey: 'pk_test_YYYY',    // <-- reemplaza
    mpEnabled: true,
  },
}
