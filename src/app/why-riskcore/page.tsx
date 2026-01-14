import { Metadata } from 'next'
import { Problem, Solution, HowItWorks } from '@/components'

export const metadata: Metadata = {
  title: 'Why RISKCORE | The Multi-Manager Risk Solution',
  description: 'Discover how RISKCORE solves the multi-manager risk nightmare. Aggregate data from any source, get real-time visibility, without replacing your existing systems.',
  openGraph: {
    title: 'Why RISKCORE | The Multi-Manager Risk Solution',
    description: 'Aggregate data from any source, get real-time visibility, without replacing your existing systems.',
    url: 'https://riskcore.io/why-riskcore',
  },
}

export default function WhyRiskcore() {
  return (
    <div className="pt-20">
      <Problem />
      <Solution />
      <HowItWorks />
    </div>
  )
}
