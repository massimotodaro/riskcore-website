import { Metadata } from 'next'
import { Founder, OpenSource } from '@/components'

export const metadata: Metadata = {
  title: 'About | RISKCORE - Built by Risk Professionals',
  description: 'Learn about RISKCORE and its founder Massimo Todaro. 20+ years of financial services experience, built to solve the multi-manager risk problem.',
  openGraph: {
    title: 'About | RISKCORE - Built by Risk Professionals',
    description: 'Learn about RISKCORE and its founder. Built by someone who lived the problem.',
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
