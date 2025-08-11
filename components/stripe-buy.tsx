'use client'
export default function StripeBuy({
  buyButtonId,
  publishableKey,
}: { buyButtonId: string; publishableKey: string }) {
  return (
    // Redirige a /gracias al completar (configúralo en Stripe)
    <stripe-buy-button buy-button-id={buyButtonId} publishable-key={publishableKey} />
  )
}
