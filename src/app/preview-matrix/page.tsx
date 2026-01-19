'use client'

import CorrelationMatrix from '@/components/problems/CorrelationMatrix'
import RiskPodMatrixCard, { riskPodData } from '@/components/problems/RiskPodMatrixCard'

export default function PreviewMatrix() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section: Title + Overall Matrix */}
        <div className="flex items-center justify-between gap-12 mb-8">
          {/* Left side - Title and subtitle */}
          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
              Proprietary Technology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6 font-['Space_Grotesk']">
              Cross-PM Correlation Framework
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Traditional tools analyze each PM in isolation. Our proprietary correlation engine reveals hidden risk relationships between strategies that other platforms miss entirely.
            </p>
          </div>

          {/* Right side - Matrix only */}
          <div className="flex-shrink-0">
            <CorrelationMatrix />
          </div>
        </div>

        {/* 5 RiskPod cards in a row */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {riskPodData.filter(pod => pod.name !== 'Other').map((pod) => (
            <RiskPodMatrixCard
              key={pod.name}
              name={pod.name}
              abbr={pod.abbr}
              anchor={pod.anchor}
              color={pod.color}
              matrix={pod.matrix}
            />
          ))}
        </div>

        {/* Key Capabilities section */}
        <div className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-100">What makes our correlation framework unique</h3>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Strategy Correlation */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-purple-500/15">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Strategy Correlation</h4>
              <p className="text-sm text-slate-400">See how PM strategies move together in real-time</p>
            </div>

            {/* Factor Decomposition */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-blue-500/15">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Factor Decomposition</h4>
              <p className="text-sm text-slate-400">Break down correlations by asset class and factor</p>
            </div>

            {/* Tail Risk Detection */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-red-500/15">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Tail Risk Detection</h4>
              <p className="text-sm text-slate-400">Identify hidden concentration risks before they compound</p>
            </div>

            {/* Stress Testing */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-green-500/15">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-100 mb-2">Stress Testing</h4>
              <p className="text-sm text-slate-400">Model 2008, 2020, and custom scenarios instantly</p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <blockquote className="text-lg font-medium text-slate-300 italic text-center whitespace-nowrap">
              &ldquo;We discovered that two of our PMs had 0.85 correlation without knowing it. <span className="text-purple-400 not-italic font-semibold">RISKCORE showed us the blind spot.</span>&rdquo;
            </blockquote>
            <p className="mt-3 text-slate-500 font-medium text-center">— CRO, $8B Multi-Manager Fund</p>
          </div>
        </div>
      </div>
    </div>
  )
}
