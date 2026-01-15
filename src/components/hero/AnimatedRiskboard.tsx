'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const start = () => {
    if (hasStarted) return
    setHasStarted(true)

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return { count, start }
}

// Market Anchors Data
const marketAnchors = {
  EQUITY: [
    { ticker: 'SPY', price: '584.28', change: '+0.8%', up: true },
    { ticker: 'QQQ', price: '498.58', change: '+1.2%', up: true },
    { ticker: 'VGK', price: '68.45', change: '-0.3%', up: false },
    { ticker: 'EWJ', price: '72.88', change: '+0.4%', up: true },
    { ticker: 'VWO', price: '44.25', change: '+0.6%', up: true },
  ],
  RATES: [
    { ticker: 'ZT (2Y)', price: '103.45', change: '-0.1%', up: false },
    { ticker: 'ZF (5Y)', price: '108.92', change: '-0.2%', up: false },
    { ticker: 'ZN (10Y)', price: '110.28', change: '-0.4%', up: false },
    { ticker: 'ZB (30Y)', price: '118.56', change: '-0.6%', up: false },
  ],
  CREDIT: [
    { ticker: 'CDX.IG', price: '52.8', change: '+1.2bp', up: true },
    { ticker: 'CDX.HY', price: '342.5', change: '+3.5bp', up: true },
    { ticker: 'LQD', price: '108.42', change: '-0.3%', up: false },
    { ticker: 'HYG', price: '78.25', change: '+0.2%', up: true },
  ],
  FX: [
    { ticker: 'DXY', price: '104.25', change: '+0.2%', up: true },
    { ticker: 'EUR/USD', price: '1.0842', change: '-0.2%', up: false },
    { ticker: 'USD/JPY', price: '157.85', change: '+0.3%', up: true },
    { ticker: 'GBP/USD', price: '1.2685', change: '+0.1%', up: true },
  ],
  COMMODITIES: [
    { ticker: 'CL (Oil)', price: '78.45', change: '+1.8%', up: true },
    { ticker: 'GC (Gold)', price: '2,658', change: '+0.4%', up: true },
    { ticker: 'NG (Gas)', price: '2.85', change: '-2.1%', up: false },
    { ticker: 'HG (Copper)', price: '4.25', change: '+0.8%', up: true },
  ],
}

// Asset Class Card Data
const assetCards = [
  {
    name: 'EQUITY',
    color: '#579CF9',
    change: '+1.2%',
    up: true,
    metric: 'NET DELTA',
    value: '$42.5M',
    barWidth: 75,
    stats: [
      { label: 'BETA', value: '1.15' },
      { label: 'VEGA', value: '$280K' },
      { label: 'GAMMA', value: '$42K' },
    ],
    rows: [
      { label: 'US+CAN', pct: '48%', delta: '$28.4M', beta: '1.08', vega: '$134K', corr: '0.96', hedge: '-$19.6M' },
      { label: 'Europe', pct: '22%', delta: '$9.4M', beta: '0.95', vega: '$62K', corr: '0.88', hedge: '-$8.3M' },
      { label: 'Japan', pct: '15%', delta: '$6.4M', beta: '0.82', vega: '$42K', corr: '0.85', hedge: '-$5.4M' },
      { label: 'SE Asia', pct: '10%', delta: '$4.3M', beta: '1.15', vega: '$28K', corr: '0.78', hedge: '-$3.4M' },
      { label: 'RoW', pct: '5%', delta: '$2.0M', beta: '0.92', vega: '$14K', corr: '0.72', hedge: '-$1.4M' },
    ],
    bottom: { positions: '342', var: '$2.1M', cvar: '$3.4M' },
    footer: { gross: '$320M', net: '$42.5M' },
  },
  {
    name: 'RATES',
    color: '#3CD574',
    change: '-0.8%',
    up: false,
    metric: 'DV01',
    value: '$85,000',
    barWidth: 55,
    stats: [
      { label: 'DURATION', value: '4.2 yrs' },
      { label: 'CONVEXITY', value: '0.45' },
      { label: 'YIELD', value: '5.25%' },
    ],
    rows: [
      { label: '2Y', pct: '21%', delta: '$18K', beta: '1.9', vega: '0.08', corr: '0.92', hedge: '-$16.5K' },
      { label: '5Y', pct: '38%', delta: '$32K', beta: '4.6', vega: '0.25', corr: '0.89', hedge: '-$28.5K' },
      { label: '10Y', pct: '33%', delta: '$28K', beta: '8.2', vega: '0.72', corr: '0.85', hedge: '-$23.8K' },
      { label: '30Y', pct: '8%', delta: '$7K', beta: '18.5', vega: '3.80', corr: '0.78', hedge: '-$5.5K' },
    ],
    bottom: { positions: '156', var: '$1.8M', cvar: '$2.9M' },
    footer: { gross: '$180M', net: '$120M' },
  },
  {
    name: 'CREDIT',
    color: '#a855f7',
    change: '-1.2%',
    up: false,
    metric: 'CS01',
    value: '$42,000',
    barWidth: 45,
    stats: [
      { label: 'CR. DUR', value: '3.8 yrs' },
      { label: 'AVG PD', value: '2.4%' },
      { label: 'AVG LGD', value: '40%' },
    ],
    rows: [
      { label: 'AAA-AA', pct: '18%', delta: '$7.5K', beta: '0.1%', vega: '25%', corr: '0.85', hedge: '-$6.4K' },
      { label: 'A', pct: '32%', delta: '$13.4K', beta: '0.5%', vega: '35%', corr: '0.88', hedge: '-$11.8K' },
      { label: 'BBB', pct: '28%', delta: '$11.8K', beta: '1.8%', vega: '40%', corr: '0.82', hedge: '-$9.7K' },
      { label: 'HY', pct: '16%', delta: '$6.7K', beta: '4.2%', vega: '55%', corr: '0.74', hedge: '-$5.0K' },
      { label: 'Distress', pct: '6%', delta: '$2.6K', beta: '18.5%', vega: '65%', corr: '0.42', hedge: 'N/A' },
    ],
    bottom: { positions: '89', var: '$890K', cvar: '$1.4M' },
    footer: { gross: '$95M', net: '$72M' },
  },
  {
    name: 'FX',
    color: '#06b6d4',
    change: '+0.4%',
    up: true,
    metric: 'FX DELTA',
    value: '$18.2M',
    barWidth: 35,
    stats: [
      { label: 'FX VEGA', value: '$320K' },
      { label: 'BASIS', value: '42 bps' },
      { label: 'PAIRS', value: '12' },
    ],
    rows: [
      { label: 'EUR', pct: '38%', delta: '$6.9M', beta: '$122K', vega: '15bp', corr: '0.94', hedge: '-$6.5M' },
      { label: 'JPY', pct: '25%', delta: '$4.5M', beta: '$80K', vega: '12bp', corr: '0.91', hedge: '-$4.1M' },
      { label: 'GBP', pct: '18%', delta: '$3.3M', beta: '$58K', vega: '8bp', corr: '0.89', hedge: '-$2.9M' },
      { label: 'Crypto', pct: '12%', delta: '$2.2M', beta: '$45K', vega: '5bp', corr: '0.72', hedge: '-$1.6M' },
      { label: 'Other', pct: '7%', delta: '$1.3M', beta: '$15K', vega: '2bp', corr: '0.65', hedge: '-$0.8M' },
    ],
    bottom: { positions: '45', var: '$540K', cvar: '$850K' },
    footer: { gross: '$65M', net: '$18.2M' },
  },
  {
    name: 'COMMODITIES',
    color: '#eab308',
    change: '+1.5%',
    up: true,
    metric: 'NET EXPOSURE',
    value: '$28.5M',
    barWidth: 40,
    stats: [
      { label: 'P. SENS', value: '$285K' },
      { label: 'BASIS', value: '$45K' },
      { label: 'ROLL', value: '-0.8%' },
    ],
    rows: [
      { label: 'Crude', pct: '42%', delta: '$12M', beta: '$120K', vega: '$18K', corr: '0.92', hedge: '-$11M' },
      { label: 'Gold', pct: '28%', delta: '$8M', beta: '$80K', vega: '$8K', corr: '0.88', hedge: '-$7M' },
      { label: 'NatGas', pct: '15%', delta: '$4.3M', beta: '$43K', vega: '$12K', corr: '0.75', hedge: '-$3.2M' },
      { label: 'Copper', pct: '10%', delta: '$2.8M', beta: '$28K', vega: '$5K', corr: '0.82', hedge: '-$2.3M' },
      { label: 'Other', pct: '5%', delta: '$1.4M', beta: '$14K', vega: '$2K', corr: '0.65', hedge: '-$0.9M' },
    ],
    bottom: { positions: '67', var: '$1.2M', cvar: '$1.9M' },
    footer: { gross: '$45M', net: '$28.5M' },
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
}

const barVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.8 }
  })
}

export default function AnimatedRiskboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const firmGross = useCounter(2098000000, 2000)
  const firmNet = useCounter(641000000, 2000)
  const totalPositions = useCounter(4081, 1500)
  const podGross = useCounter(1280000000, 2000)
  const podNet = useCounter(485000000, 2000)
  const podPositions = useCounter(1247, 1500)

  useEffect(() => {
    if (isInView) {
      firmGross.start()
      firmNet.start()
      totalPositions.start()
      podGross.start()
      podNet.start()
      podPositions.start()
    }
  }, [isInView])

  const formatB = (n: number) => `$${(n / 1000000000).toFixed(2)}B`
  const formatM = (n: number) => `$${Math.round(n / 1000000)}M`

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full rounded-xl overflow-hidden border border-white/10 dark:border-white/10 bg-[#0f172a] shadow-2xl"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[rgba(15,23,42,0.95)]">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-slate-100">Riskboard</span>
          <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Updated: 14:52:18 UTC</span>
        </div>
      </motion.div>

      {/* Market Anchors */}
      <motion.div variants={itemVariants} className="px-4 py-3 border-b border-white/10 bg-[rgba(30,41,59,0.6)] overflow-x-auto">
        <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Market Anchors</div>
        <div className="flex gap-8 min-w-max">
          {Object.entries(marketAnchors).map(([category, items]) => (
            <div key={category} className="min-w-[140px]">
              <div className={`text-xs font-bold mb-1 ${
                category === 'EQUITY' ? 'text-[#579CF9]' :
                category === 'RATES' ? 'text-[#3CD574]' :
                category === 'CREDIT' ? 'text-[#a855f7]' :
                category === 'FX' ? 'text-[#06b6d4]' :
                'text-[#eab308]'
              }`}>{category}</div>
              {items.slice(0, 4).map((item) => (
                <div key={item.ticker} className="flex items-center gap-2 text-[11px] py-0.5">
                  <span className="text-slate-300 font-medium w-16">{item.ticker}</span>
                  <span className="text-slate-400 font-mono">{item.price}</span>
                  <span className={`font-medium ${item.up ? 'text-green-400' : 'text-red-400'}`}>{item.change}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Firm Summary Strip */}
      <motion.div variants={itemVariants} className="flex items-center gap-6 px-4 py-2 border-b border-white/10 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Firm Gross:</span>
          <span className="text-slate-100 font-bold font-mono">{formatB(firmGross.count)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Firm Net:</span>
          <span className="text-slate-100 font-bold font-mono">{formatM(firmNet.count)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Total Positions:</span>
          <span className="text-slate-100 font-bold font-mono">{totalPositions.count.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Pod Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 px-4 py-2 border-b border-white/10">
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded">Pod 1</span>
        <button className="text-xs text-slate-300 bg-slate-700 px-3 py-1 rounded border border-white/10">Portfolios ▼</button>
        <span className="text-xs text-slate-400">All</span>
        <button className="text-xs text-green-400 bg-green-500/15 border border-green-500/30 px-3 py-1 rounded font-semibold">⟳ Calculate</button>
        <div className="flex items-center gap-4 ml-4 text-sm">
          <span><span className="text-slate-400">Gross:</span> <span className="text-slate-100 font-bold font-mono">{formatB(podGross.count)}</span></span>
          <span><span className="text-slate-400">Net:</span> <span className="text-slate-100 font-bold font-mono">{formatM(podNet.count)}</span></span>
          <span><span className="text-slate-400">Positions:</span> <span className="text-slate-100 font-bold font-mono">{podPositions.count.toLocaleString()}</span></span>
        </div>
        <span className="text-[10px] text-slate-500 ml-auto font-mono">Last: 09:42:15</span>
      </motion.div>

      {/* Asset Class Cards */}
      <div className="flex gap-4 p-4 overflow-x-auto pb-6" style={{ scrollbarWidth: 'thin' }}>
        {assetCards.map((card, i) => (
          <motion.div
            key={card.name}
            variants={cardVariants}
            custom={i}
            className="min-w-[320px] w-[320px] flex-shrink-0 bg-[rgba(30,41,59,0.9)] rounded-lg border border-white/10 p-4 flex flex-col"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold" style={{ color: card.color }}>{card.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${card.up ? 'text-green-400' : 'text-red-400'}`}>
                  {card.up ? '▲' : '▼'} {card.change}
                </span>
                <button className="text-[10px] text-white bg-slate-600 px-2 py-1 rounded border border-white/20 font-semibold">Trades</button>
              </div>
            </div>

            {/* Primary Metric */}
            <div className="bg-[rgba(30,60,50,0.5)] rounded-lg p-3 mb-3">
              <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">{card.metric}</div>
              <div className="text-2xl font-bold font-mono text-slate-100">{card.value}</div>
              <div className="h-1 bg-slate-700 rounded mt-2 overflow-hidden">
                <motion.div
                  variants={barVariants}
                  custom={card.barWidth}
                  className="h-full rounded"
                  style={{ backgroundColor: card.color }}
                />
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {card.stats.map((stat) => (
                <div key={stat.label} className="bg-slate-700/50 rounded p-2 text-center">
                  <div className="text-[8px] text-slate-300 uppercase">{stat.label}</div>
                  <div className="text-xs font-semibold font-mono text-slate-100">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="flex-1 bg-[rgba(15,23,42,0.5)] rounded border border-blue-500/20 overflow-hidden text-[10px]">
              <div className="grid grid-cols-7 bg-blue-500/20 px-2 py-1 font-semibold" style={{ color: card.color }}>
                <span></span>
                <span className="text-center">%</span>
                <span className="text-center">{card.name === 'RATES' ? 'DV01' : card.name === 'CREDIT' ? 'CS01' : 'DELTA'}</span>
                <span className="text-center">{card.name === 'RATES' ? 'DUR' : card.name === 'CREDIT' ? 'PD' : 'BETA'}</span>
                <span className="text-center">{card.name === 'RATES' ? 'CONV' : card.name === 'CREDIT' ? 'LGD' : 'VEGA'}</span>
                <span className="text-center">CORR.</span>
                <span className="text-center">0HEDGE</span>
              </div>
              {card.rows.slice(0, 4).map((row, idx) => (
                <div key={row.label} className={`grid grid-cols-7 px-2 py-1 ${idx % 2 === 0 ? 'bg-blue-500/5' : ''}`}>
                  <span className="font-semibold" style={{ color: card.color }}>{row.label}</span>
                  <span className="text-center text-slate-300">{row.pct}</span>
                  <span className="text-center text-slate-300 font-mono">{row.delta}</span>
                  <span className="text-center text-slate-300 font-mono">{row.beta}</span>
                  <span className="text-center text-slate-300 font-mono">{row.vega}</span>
                  <span className="text-center text-slate-300 font-mono">{row.corr}</span>
                  <span className="text-center text-slate-300 font-mono">{row.hedge}</span>
                </div>
              ))}
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-white/10">
              <div className="text-center">
                <div className="text-[8px] text-slate-500 uppercase">Positions</div>
                <div className="text-xs font-bold text-slate-100">{card.bottom.positions}</div>
              </div>
              <div className="text-center">
                <div className="text-[8px] text-slate-500 uppercase">VAR (95%)</div>
                <div className="text-xs font-bold text-red-400">{card.bottom.var}</div>
              </div>
              <div className="text-center">
                <div className="text-[8px] text-slate-500 uppercase">CVAR (95%)</div>
                <div className="text-xs font-bold text-red-400">{card.bottom.cvar}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
              <div className="bg-slate-700/40 rounded p-2 text-center">
                <div className="text-[8px] text-slate-400 uppercase">Gross Exposure</div>
                <div className="text-sm font-bold text-slate-100 font-mono">{card.footer.gross}</div>
              </div>
              <div className="bg-slate-700/40 rounded p-2 text-center">
                <div className="text-[8px] text-slate-400 uppercase">Net Exposure</div>
                <div className="text-sm font-bold text-slate-100 font-mono">{card.footer.net}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
