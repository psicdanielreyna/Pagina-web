// Id de recurso -> id del archivo seguro (ya lo usas en DOWNLOADS)
export const RESOURCE_IDS = {
  'como-apagar-tu-mente': 'como-apagar-tu-mente',
  'el-arte-de-creer-en-ti': 'el-arte-de-creer-en-ti',
} as const

// BUY BUTTON: Id de precio/BuyButton -> recurso
// Usa price_XXX o buy_btn_XXX según lo que Stripe te dé
export const STRIPE_TO_RESOURCE: Record<string, keyof typeof RESOURCE_IDS> = {
  'buy_btn_COMO_APAGAR': 'como-apagar-tu-mente',
  'buy_btn_ARTE_CREER': 'el-arte-de-creer-en-ti',
}
export const RESOURCE_PRICES: Record<string, number> = {
  'como-apagar-tu-mente': 249,
  'el-arte-de-creer-en-ti': 249,
}
export const RESOURCE_TITLES: Record<string, string> = {
  'como-apagar-tu-mente': 'Cómo Apagar tu Mente',
  'el-arte-de-creer-en-ti': 'El Arte de Creer en Ti',
}
