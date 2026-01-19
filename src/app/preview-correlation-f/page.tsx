import CorrelationBlindSpotF from '@/../../designs/why-riskcore/CorrelationBlindSpotF'

export default function PreviewCorrelationF() {
  return (
    <div className="pt-20">
      <div className="bg-slate-900 text-center py-4 border-b border-white/10">
        <span className="text-amber-400 font-bold">Option F:</span>
        <span className="text-slate-300 ml-2">Three Stages + Correlation Numbers</span>
      </div>
      <CorrelationBlindSpotF />
    </div>
  )
}
