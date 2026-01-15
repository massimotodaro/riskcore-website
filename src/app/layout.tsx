import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { TawkTo, Analytics, ThemeProvider } from '@/components'

export const metadata: Metadata = {
  metadataBase: new URL('https://riskcore.io'),
  title: {
    default: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
    template: '%s | RISKCORE',
  },
  description: 'Open-source risk aggregation platform for multi-manager hedge funds. Get unified firm-wide risk visibility without replacing your existing systems.',
  keywords: ['multi-manager risk management', 'hedge fund risk aggregation', 'portfolio risk platform', 'open source risk management', 'risk visibility', 'hedge fund technology'],
  authors: [{ name: 'Massimo Todaro' }],
  creator: 'RISKCORE',
  publisher: 'RISKCORE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://riskcore.io',
    siteName: 'RISKCORE',
    title: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
    description: 'Open-source risk aggregation platform for multi-manager hedge funds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RISKCORE | Firm-Wide Risk Visibility for Multi-Manager Funds',
    description: 'Open-source risk aggregation platform for multi-manager hedge funds.',
    creator: '@massimotodaro',
  },
  alternates: {
    canonical: 'https://riskcore.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-bg-primary text-text-secondary antialiased flex flex-col">
        <ThemeProvider>
          <Analytics />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <TawkTo />
        </ThemeProvider>
      </body>
    </html>
  )
}
