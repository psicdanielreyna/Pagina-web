import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PsicoToolKit – Terapia clara, herramientas prácticas',
  description: 'Terapia CBT, recursos descargables y blog de psicoeducación.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'PsicoToolKit',
    description: 'Terapia CBT, recursos descargables y blog.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
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
