import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { CrispChat, Analytics } from '@/components'

export const metadata: Metadata = {
  title: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
  description: 'Open-source risk aggregation platform for multi-manager hedge funds. Get unified firm-wide risk visibility without replacing your existing systems.',
  keywords: 'multi-manager risk management, hedge fund risk aggregation, portfolio risk platform, open source risk management',
  authors: [{ name: 'Massimo Todaro' }],
  openGraph: {
    title: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
    description: 'Open-source risk aggregation platform for multi-manager hedge funds.',
    url: 'https://riskcore.io',
    siteName: 'RISKCORE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
    description: 'Open-source risk aggregation platform for multi-manager hedge funds.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-bg-primary text-text-secondary antialiased flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CrispChat />
      </body>
    </html>
  )
}
