import { Metadata } from 'next'
import { PricingFeatures, PricingCards, ComparisonMatrix, FAQ } from '@/components'

export const metadata: Metadata = {
  title: 'Pricing | RISKCORE - Simple, Transparent Pricing',
  description: 'RISKCORE pricing plans for every team size. Start free, scale as you grow. Open source core with premium cloud and enterprise options.',
  openGraph: {
    title: 'Pricing | RISKCORE - Simple, Transparent Pricing',
    description: 'Start free, scale as you grow. No hidden fees. Cancel anytime.',
    url: 'https://riskcore.io/pricing',
  },
}

export default function Pricing() {
  return (
    <div className="pt-20 theme-page-bg">
      <PricingFeatures />
      <PricingCards />
      <ComparisonMatrix />
      <FAQ />
    </div>
  )
}
