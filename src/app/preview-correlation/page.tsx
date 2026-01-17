import { Metadata } from 'next'
import CorrelationBlindSpot from '../../../designs/why-riskcore/CorrelationBlindSpot'

export const metadata: Metadata = {
  title: 'Preview: Correlation Blind Spot Section',
  robots: 'noindex',
}

export default function PreviewCorrelation() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <CorrelationBlindSpot />
    </div>
  )
}
