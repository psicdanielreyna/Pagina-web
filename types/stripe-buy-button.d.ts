// types/stripe-buy-button.d.ts
import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'buy-button-id': string
        'publishable-key': string
      }
    }
  }
}

export {}
