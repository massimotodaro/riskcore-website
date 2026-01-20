import { Metadata } from 'next'
import SecurityContent from './SecurityContent'

export const metadata: Metadata = {
  title: 'Security | RISKCORE - Enterprise-Grade Security',
  description: 'Learn about RISKCORE security practices. Bank-grade encryption, GDPR compliant, self-hosted options, and comprehensive access controls for your risk data.',
  openGraph: {
    title: 'Security | RISKCORE - Enterprise-Grade Security',
    description: 'Bank-grade encryption, GDPR compliant, and self-hosted options for your risk data.',
    url: 'https://riskcore.io/security',
  },
}

export default function SecurityPage() {
  return <SecurityContent />
}
