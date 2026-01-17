import { Metadata } from 'next'
import {
  DataSilosProblem,
  SlowAnswersProblem,
  CompetitorsProblem,
  RegulatoryBlindSpotsProblem,
  CorrelationProblem,
  SpreadsheetTaxProblem,
} from '@/components/problems'

export const metadata: Metadata = {
  title: 'Preview: Problem Components',
  robots: 'noindex',
}

export default function ProblemPreview() {
  return (
    <div className="pt-20">
      {/* Navigation helper */}
      <div className="fixed top-24 right-6 z-50 bg-[#1e293b]/95 backdrop-blur-sm border border-white/10 rounded-xl p-4 hidden lg:block">
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Jump to:</p>
        <nav className="space-y-1">
          <a href="#data-silos" className="block text-sm text-slate-400 hover:text-white transition-colors">1. Data Silos</a>
          <a href="#system-fragmentation" className="block text-sm text-slate-400 hover:text-white transition-colors">2. System Fragmentation</a>
          <a href="#slow-answers" className="block text-sm text-slate-400 hover:text-white transition-colors">3. Slow Answers</a>
          <a href="#regulatory" className="block text-sm text-slate-400 hover:text-white transition-colors">4. Regulatory</a>
          <a href="#correlation" className="block text-sm text-slate-400 hover:text-white transition-colors">5. Correlation</a>
          <a href="#spreadsheet-tax" className="block text-sm text-slate-400 hover:text-white transition-colors">6. Spreadsheet Tax</a>
        </nav>
      </div>

      {/* Components */}
      <div id="data-silos">
        <DataSilosProblem />
      </div>

      <div id="system-fragmentation">
        <CompetitorsProblem />
      </div>

      <div id="slow-answers">
        <SlowAnswersProblem />
      </div>

      <div id="regulatory">
        <RegulatoryBlindSpotsProblem />
      </div>

      <div id="correlation">
        <CorrelationProblem />
      </div>

      <div id="spreadsheet-tax">
        <SpreadsheetTaxProblem />
      </div>
    </div>
  )
}
