'use client'

/**
 * CorrelationMatrix.tsx - 6x6 Correlation Matrix Component
 *
 * Current proportions (25% smaller):
 * - Cell size: 74px x 74px
 * - Row label width: 79px
 * - Border spacing: 2px
 * - Font: 11px for labels, 16px for values
 */

import { motion } from 'framer-motion'

// Portfolio names for the matrix
const portfolioHeaders = [
  { short: 'Alpha', full: 'Alpha Growth' },
  { short: 'Macro', full: 'Macro Sys' },
  { short: 'Credit', full: 'Credit Opp' },
  { short: 'EM', full: 'EM Equity' },
  { short: 'Vol', full: 'Vol Trading' },
  { short: 'Rates', full: 'Rates RV' },
]

// Full correlation matrix data
const correlationMatrix = [
  [1.00, 0.72, 0.42, 0.85, -0.28, 0.31],
  [0.72, 1.00, 0.48, 0.68, -0.15, 0.52],
  [0.42, 0.48, 1.00, 0.35, -0.38, 0.62],
  [0.85, 0.68, 0.35, 1.00, -0.42, 0.18],
  [-0.28, -0.15, -0.38, -0.42, 1.00, -0.05],
  [0.31, 0.52, 0.62, 0.18, -0.05, 1.00],
]

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

// Get glow color based on value
function getGlowColor(value: number): string {
  if (value >= 0.7) return 'rgba(34, 197, 94, 0.6)' // green glow for high positive
  if (value <= -0.35) return 'rgba(239, 68, 68, 0.6)' // red glow for negative
  return 'transparent'
}

// Check if cell should glow
function shouldGlow(value: number): boolean {
  return Math.abs(value) >= 0.7 || value <= -0.35
}

// Correlation cell component
function CorrelationCell({
  value,
  delay = 0,
  isDiagonal = false,
  animate = true,
  glowDelay = 0,
}: {
  value: number
  delay?: number
  isDiagonal?: boolean
  animate?: boolean
  glowDelay?: number
}) {
  const style = getCorrelationStyle(value)
  const glowColor = getGlowColor(value)
  const hasGlow = shouldGlow(value) && !isDiagonal

  const cellContent = (
    <div
      style={{
        width: '74px',
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontFamily: "'SF Mono', Monaco, 'Consolas', monospace",
        fontSize: '16px',
        borderRadius: '3px',
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {value.toFixed(2)}
    </div>
  )

  if (!animate) return cellContent

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={hasGlow ? {
        opacity: 1,
        scale: 1,
        boxShadow: [
          `0 0 0px ${glowColor}`,
          `0 0 15px ${glowColor}`,
          `0 0 0px ${glowColor}`,
        ]
      } : { opacity: 1, scale: 1 }}
      transition={hasGlow ? {
        opacity: { delay, duration: 0.2 },
        scale: { delay, duration: 0.2 },
        boxShadow: { delay: glowDelay, duration: 2, repeat: Infinity, ease: 'easeInOut' }
      } : { delay, duration: 0.2, ease: 'easeOut' }}
      style={{
        width: '74px',
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontFamily: "'SF Mono', Monaco, 'Consolas', monospace",
        fontSize: '16px',
        borderRadius: '3px',
        cursor: isDiagonal ? 'default' : 'pointer',
        backgroundColor: style.bg,
        color: style.text,
      }}
      whileHover={!isDiagonal ? { scale: 1.08, zIndex: 10 } : {}}
    >
      {value.toFixed(2)}
    </motion.div>
  )
}

interface CorrelationMatrixProps {
  animate?: boolean
  className?: string
}

export default function CorrelationMatrix({
  animate = true,
  className = ''
}: CorrelationMatrixProps) {
  return (
    <div className={className} style={{ display: 'inline-block' }}>
      <table
        style={{
          borderCollapse: 'separate',
          borderSpacing: '2px',
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '79px' }}></th>
            {portfolioHeaders.map((p) => (
              <th
                key={p.short}
                style={{
                  width: '74px',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  textAlign: 'center',
                  paddingBottom: '5px',
                  lineHeight: 1.3,
                }}
              >
                {p.short}<br/>{p.full.split(' ')[1] || ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {correlationMatrix.map((row, i) => (
            <tr key={portfolioHeaders[i].full}>
              <th
                style={{
                  width: '79px',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  textAlign: 'right',
                  paddingRight: '9px',
                }}
              >
                {portfolioHeaders[i].full}
              </th>
              {row.map((value, j) => (
                <td key={j} style={{ padding: 0, verticalAlign: 'middle' }}>
                  <CorrelationCell
                    value={value}
                    delay={animate ? 0.01 * (i * 6 + j) : 0}
                    isDiagonal={i === j}
                    animate={animate}
                    glowDelay={(i * 6 + j) * 0.3}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
