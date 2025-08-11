// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniel Reyna – Psicólogo CBT',
  description: 'Terapia cognitivo-conductual breve, psicoeducación y recursos prácticos.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Daniel Reyna – Psicólogo',
    description: 'Terapia CBT, psicoeducación y recursos.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
