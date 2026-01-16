import { Metadata } from 'next'
import TermsContent from './TermsContent'

export const metadata: Metadata = {
  title: 'Terms of Service | RISKCORE',
  description: 'Terms of Service for RISKCORE risk aggregation platform. Read our terms covering service usage, subscriptions, and user responsibilities.',
  openGraph: {
    title: 'Terms of Service | RISKCORE',
    description: 'Terms of Service for RISKCORE risk aggregation platform.',
    url: 'https://riskcore.io/terms',
  },
}

export default function TermsPage() {
  return <TermsContent />
}
