import { Metadata } from 'next'
import CorrelationBlindSpotC from '../../../designs/why-riskcore/CorrelationBlindSpotC'

export const metadata: Metadata = {
  title: 'Preview: Correlation Blind Spot - Expandable Cards',
  robots: 'noindex',
}

export default function PreviewCorrelationC() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <CorrelationBlindSpotC />
    </div>
  )
}
