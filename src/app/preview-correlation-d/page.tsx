import { Metadata } from 'next'
import CorrelationBlindSpotD from '../../../designs/why-riskcore/CorrelationBlindSpotD'

export const metadata: Metadata = {
  title: 'Preview: Correlation Blind Spot - Timeline',
  robots: 'noindex',
}

export default function PreviewCorrelationD() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <CorrelationBlindSpotD />
    </div>
  )
}
