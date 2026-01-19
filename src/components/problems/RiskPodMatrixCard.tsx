'use client'

/**
 * RiskPodMatrixCard.tsx - Small RiskPod Correlation Matrix Card
 */

// Get color style based on correlation value
function getCorrelationStyle(value: number): { bg: string; text: string } {
  if (value === 1) return { bg: '#334155', text: '#64748b' }
  if (value >= 0.85) return { bg: '#15803d', text: '#ffffff' }
  if (value >= 0.75) return { bg: '#16a34a', text: '#ffffff' }
  if (value >= 0.65) return { bg: '#22c55e', text: '#ffffff' }
  if (value >= 0.55) return { bg: '#4ade80', text: '#0f172a' }
  if (value >= 0.45) return { bg: '#86efac', text: '#0f172a' }
  if (value >= 0.35) return { bg: '#bbf7d0', text: '#0f172a' }
  if (value >= 0.25) return { bg: '#dcfce7', text: '#0f172a' }
  if (value >= 0.15) return { bg: '#f0fdf4', text: '#0f172a' }
  if (value > -0.15) return { bg: '#334155', text: '#94a3b8' }
  if (value > -0.25) return { bg: '#fee2e2', text: '#0f172a' }
  if (value > -0.35) return { bg: '#fecaca', text: '#0f172a' }
  if (value > -0.45) return { bg: '#fca5a5', text: '#0f172a' }
  if (value > -0.55) return { bg: '#f87171', text: '#ffffff' }
  return { bg: '#dc2626', text: '#ffffff' }
}

const columnHeaders = ['Alpha', 'Macro', 'Credit', 'EM', 'Vol', 'Rates']
const rowHeaders = ['Alpha', 'Macro', 'Credit', 'EM Eq', 'Vol', 'Rates']

interface RiskPodMatrixCardProps {
  name: string
  abbr: string
  anchor: string
  color: string
  matrix: number[][]
}

export default function RiskPodMatrixCard({ name, abbr, anchor, color, matrix }: RiskPodMatrixCardProps) {
  return (
    <div
      className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-xl p-3"
      style={{ borderTopColor: color, borderTopWidth: '2px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {abbr}
          </div>
          <span className="text-xs font-semibold text-slate-100">{name}</span>
        </div>
        <span className="text-[9px] text-slate-500 font-mono">{anchor}</span>
      </div>

      {/* Matrix */}
      <table style={{ borderCollapse: 'separate', borderSpacing: '1px' }}>
        <thead>
          <tr>
            <th style={{ width: '28px' }}></th>
            {columnHeaders.map((h) => (
              <th
                key={h}
                style={{
                  width: '24px',
                  fontSize: '7px',
                  fontWeight: 500,
                  color: '#64748b',
                  textAlign: 'center',
                  paddingBottom: '2px',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={rowHeaders[i]}>
              <th
                style={{
                  width: '28px',
                  fontSize: '7px',
                  fontWeight: 500,
                  color: '#64748b',
                  textAlign: 'right',
                  paddingRight: '3px',
                }}
              >
                {rowHeaders[i]}
              </th>
              {row.map((value, j) => {
                const style = getCorrelationStyle(value)
                return (
                  <td key={j} style={{ padding: 0 }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: 600,
                        fontFamily: "'SF Mono', Monaco, 'Consolas', monospace",
                        borderRadius: '2px',
                        backgroundColor: style.bg,
                        color: style.text,
                      }}
                    >
                      {value.toFixed(2)}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Pre-configured RiskPod data
export const riskPodData = [
  {
    name: 'Equity',
    abbr: 'EQ',
    anchor: 'SPX',
    color: '#3b82f6',
    matrix: [
      [1.00, 0.82, 0.48, 0.92, -0.52, 0.22],
      [0.82, 1.00, 0.41, 0.78, -0.38, 0.28],
      [0.48, 0.41, 1.00, 0.45, -0.32, 0.18],
      [0.92, 0.78, 0.45, 1.00, -0.58, 0.15],
      [-0.52, -0.38, -0.32, -0.58, 1.00, 0.08],
      [0.22, 0.28, 0.18, 0.15, 0.08, 1.00],
    ],
  },
  {
    name: 'Rates',
    abbr: 'RT',
    anchor: 'US10Y',
    color: '#22c55e',
    matrix: [
      [1.00, 0.58, 0.52, 0.38, 0.12, 0.72],
      [0.58, 1.00, 0.65, 0.48, 0.18, 0.85],
      [0.52, 0.65, 1.00, 0.42, 0.08, 0.78],
      [0.38, 0.48, 0.42, 1.00, 0.15, 0.52],
      [0.12, 0.18, 0.08, 0.15, 1.00, 0.22],
      [0.72, 0.85, 0.78, 0.52, 0.22, 1.00],
    ],
  },
  {
    name: 'Credit',
    abbr: 'CR',
    anchor: 'CDX.IG',
    color: '#a855f7',
    matrix: [
      [1.00, 0.42, 0.65, 0.35, -0.42, 0.52],
      [0.42, 1.00, 0.55, 0.38, -0.18, 0.48],
      [0.65, 0.55, 1.00, 0.42, -0.52, 0.72],
      [0.35, 0.38, 0.42, 1.00, -0.28, 0.32],
      [-0.42, -0.18, -0.52, -0.28, 1.00, -0.15],
      [0.52, 0.48, 0.72, 0.32, -0.15, 1.00],
    ],
  },
  {
    name: 'FX',
    abbr: 'FX',
    anchor: 'DXY',
    color: '#06b6d4',
    matrix: [
      [1.00, 0.52, 0.22, 0.62, 0.08, 0.18],
      [0.52, 1.00, 0.28, 0.55, 0.15, 0.32],
      [0.22, 0.28, 1.00, 0.18, 0.02, 0.22],
      [0.62, 0.55, 0.18, 1.00, 0.12, 0.15],
      [0.08, 0.15, 0.02, 0.12, 1.00, 0.05],
      [0.18, 0.32, 0.22, 0.15, 0.05, 1.00],
    ],
  },
  {
    name: 'Commodities',
    abbr: 'CM',
    anchor: 'BCOM',
    color: '#f97316',
    matrix: [
      [1.00, 0.62, 0.18, 0.72, -0.12, 0.08],
      [0.62, 1.00, 0.22, 0.58, -0.05, 0.15],
      [0.18, 0.22, 1.00, 0.15, -0.18, 0.28],
      [0.72, 0.58, 0.15, 1.00, -0.15, 0.12],
      [-0.12, -0.05, -0.18, -0.15, 1.00, 0.02],
      [0.08, 0.15, 0.28, 0.12, 0.02, 1.00],
    ],
  },
  {
    name: 'Other',
    abbr: 'OT',
    anchor: 'VIX',
    color: '#94a3b8',
    matrix: [
      [1.00, 0.42, 0.18, 0.48, 0.75, 0.15],
      [0.42, 1.00, 0.22, 0.38, 0.62, 0.18],
      [0.18, 0.22, 1.00, 0.15, 0.32, 0.42],
      [0.48, 0.38, 0.15, 1.00, 0.58, 0.12],
      [0.75, 0.62, 0.32, 0.58, 1.00, 0.22],
      [0.15, 0.18, 0.42, 0.12, 0.22, 1.00],
    ],
  },
]
