import CorrelationBlindSpotE from '@/../../designs/why-riskcore/CorrelationBlindSpotE'

export default function PreviewCorrelationE() {
  return (
    <div className="pt-20">
      <div className="bg-slate-900 text-center py-4 border-b border-white/10">
        <span className="text-purple-400 font-bold">NEW - Cross-PM Correlation Framework:</span>
        <span className="text-slate-300 ml-2">Heatmap Matrix + RiskPod Cards + Alerts</span>
      </div>
      <CorrelationBlindSpotE />
    </div>
  )
}
