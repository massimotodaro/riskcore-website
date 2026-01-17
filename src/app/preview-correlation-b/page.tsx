import { Metadata } from 'next'
import CorrelationBlindSpotB from '../../../designs/why-riskcore/CorrelationBlindSpotB'

export const metadata: Metadata = {
  title: 'Preview: Correlation Blind Spot - The Matrix',
  robots: 'noindex',
}

export default function PreviewCorrelationB() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <CorrelationBlindSpotB />
    </div>
  )
}
