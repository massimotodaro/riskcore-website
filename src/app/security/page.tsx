import { Metadata } from 'next'
import SecurityContent from './SecurityContent'

export const metadata: Metadata = {
  title: 'Security | RISKCORE - Enterprise-Grade Security',
  description: 'Learn about RISKCORE security practices. SOC 2 compliant, bank-grade encryption, self-hosted options, and comprehensive access controls for your risk data.',
  openGraph: {
    title: 'Security | RISKCORE - Enterprise-Grade Security',
    description: 'SOC 2 compliant, bank-grade encryption, and self-hosted options for your risk data.',
    url: 'https://riskcore.io/security',
  },
}

export default function SecurityPage() {
  return <SecurityContent />
}
