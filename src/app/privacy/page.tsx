import { Metadata } from 'next'
import PrivacyContent from './PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | RISKCORE',
  description: 'Learn how RISKCORE collects, uses, and protects your personal data. UK GDPR compliant privacy policy for our risk aggregation platform.',
  openGraph: {
    title: 'Privacy Policy | RISKCORE',
    description: 'Learn how RISKCORE collects, uses, and protects your personal data.',
    url: 'https://riskcore.io/privacy',
  },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
