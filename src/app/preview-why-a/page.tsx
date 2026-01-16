import { Metadata } from 'next'
import WhyRiskcoreVariationA from '../../../designs/why-riskcore/VariationA'

export const metadata: Metadata = {
  title: 'Preview: Why RISKCORE - Variation A',
  robots: 'noindex',
}

export default function PreviewWhyA() {
  return <WhyRiskcoreVariationA />
}
