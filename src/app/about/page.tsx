import { Metadata } from 'next'
import { Founder, OpenSource } from '@/components'

export const metadata: Metadata = {
  title: 'About | RISKCORE - Built by Risk Professionals',
  description: 'Learn about RISKCORE and the team behind it. Former bankers and investment managers who built a solution to the multi-manager risk problem.',
  openGraph: {
    title: 'About | RISKCORE - Built by Risk Professionals',
    description: 'Built by a team of former bankers and investment managers who lived the problem.',
    url: 'https://riskcore.io/about',
  },
}

export default function About() {
  return (
    <div className="pt-20">
      <Founder />
      <OpenSource />
    </div>
  )
}
