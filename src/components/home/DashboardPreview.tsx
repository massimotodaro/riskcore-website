'use client'

/**
 * RiskPodsCarousel.tsx
 *
 * RiskPods Section Variant 2: "The Interactive Carousel"
 *
 * Features interactive Book Selector and Time Selector at the top,
 * emphasizing the single-to-multi-book aggregation capability.
 * Tab-based navigation with one featured RiskPod at a time.
 *
 * Target: Risk analysts, PMs, CIOs who need aggregated views
 *
 * Usage:
 *   <RiskPodsCarousel />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface DataRow {
  label: string
  values: string[]
}

interface RiskCardData {
  title: string
  color: string
  primaryLabel: string
  primaryValue: string
  change: string
  isUp: boolean
  secondaryMetrics: { label: string; value: string }[]
  tableHeaders: string[]
  tableRows: DataRow[]
  positions: number
  var95: string
  cvar95: string
  grossExposure: string
  netExposure: string
  description: string
}

interface BookOption {
  id: string
  name: string
  type: 'single' | 'aggregated'
  subtext?: string
}

// ==============================================
// CONSTANTS
// ==============================================

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const bookOptions: BookOption[] = [
  { id: 'all', name: 'All Books', type: 'aggregated', subtext: '12 books • $2.1B AUM' },
  { id: 'equity-pms', name: 'Equity PMs', type: 'aggregated', subtext: '5 books • $890M' },
  { id: 'macro-pms', name: 'Macro PMs', type: 'aggregated', subtext: '4 books • $720M' },
  { id: 'credit-pms', name: 'Credit PMs', type: 'aggregated', subtext: '3 books • $490M' },
  { id: 'alpha', name: 'Alpha Fund', type: 'single', subtext: '$245M' },
  { id: 'beta', name: 'Beta Quant', type: 'single', subtext: '$189M' },
  { id: 'gamma', name: 'Gamma Global', type: 'single', subtext: '$156M' },
  { id: 'delta', name: 'Delta Macro', type: 'single', subtext: '$312M' },
  { id: 'epsilon', name: 'Epsilon Credit', type: 'single', subtext: '$178M' },
]

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function formatDateDisplay(date: Date): string {
  const month = MONTHS[date.getMonth()]
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month} ${day} ${year} ${hours}:${minutes}`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

// ==============================================
// BOOK SELECTOR COMPONENT
// ==============================================

interface BookSelectorProps {
  selectedBook: BookOption
  onBookSelect: (book: BookOption) => void
}

function BookSelector({ selectedBook, onBookSelect }: BookSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const aggregatedBooks = bookOptions.filter(b => b.type === 'aggregated')
  const singleBooks = bookOptions.filter(b => b.type === 'single')

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-slate-800/80 rounded-xl border border-white/10
                   hover:border-emerald-500/30 transition-colors min-w-[220px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-emerald-400">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
            <path d="M3 21h18" />
            <path d="M9 7h6" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
          </svg>
          <div className="text-left">
            <div className="text-sm font-semibold text-slate-100">{selectedBook.name}</div>
            <div className="text-[10px] text-slate-500">{selectedBook.subtext}</div>
          </div>
        </div>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-slate-500 ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-emerald-500/30 rounded-xl p-2 shadow-2xl z-50 min-w-[280px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Aggregated Views */}
            <div className="mb-2">
              <div className="text-[10px] text-emerald-400 uppercase tracking-wider px-2 py-1 font-semibold">
                Aggregated Views
              </div>
              {aggregatedBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    onBookSelect(book)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedBook.id === book.id
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <div className="text-sm font-medium">{book.name}</div>
                    <div className="text-[10px] text-slate-500">{book.subtext}</div>
                  </div>
                  {selectedBook.id === book.id && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-auto text-emerald-400">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-2" />

            {/* Single Books */}
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider px-2 py-1 font-semibold">
                Individual Books
              </div>
              {singleBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    onBookSelect(book)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedBook.id === book.id
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <div>
                    <div className="text-sm font-medium">{book.name}</div>
                    <div className="text-[10px] text-slate-500">{book.subtext}</div>
                  </div>
                  {selectedBook.id === book.id && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-auto text-emerald-400">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==============================================
// TIME SELECTOR COMPONENT
// ==============================================

interface TimeSelectorProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

function TimeSelector({ selectedDate, onDateSelect }: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(new Date(selectedDate))
  const [selectedHour, setSelectedHour] = useState(selectedDate.getHours())
  const [selectedMinute, setSelectedMinute] = useState(selectedDate.getMinutes())
  const containerRef = useRef<HTMLDivElement>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const handleDayClick = (day: number) => {
    const newDate = new Date(year, month, day, selectedHour, selectedMinute)
    onDateSelect(newDate)
  }

  const handleTimeChange = (hours: number, minutes: number) => {
    setSelectedHour(hours)
    setSelectedMinute(minutes)
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hours, minutes)
    onDateSelect(newDate)
  }

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-slate-800/80 rounded-xl border border-white/10
                   hover:border-emerald-500/30 transition-colors min-w-[220px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-emerald-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <div className="text-left">
            <div className="text-sm font-semibold text-slate-100 font-mono">{formatDateDisplay(selectedDate)}</div>
            <div className="text-[10px] text-slate-500">Time Travel</div>
          </div>
        </div>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-slate-500 ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-slate-900 border border-emerald-500/30 rounded-xl p-3 shadow-2xl z-50 min-w-[280px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-slate-200">{FULL_MONTHS[month]} {year}</span>
              <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-[10px] text-slate-500 text-center font-medium py-1">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {days.map((day, i) => (
                <button
                  key={i}
                  disabled={day === null}
                  onClick={() => day && handleDayClick(day)}
                  className={`text-[11px] py-1.5 rounded transition-all ${
                    day === null ? 'invisible' : 'hover:bg-emerald-500/20'
                  } ${day && isToday(day) ? 'ring-1 ring-emerald-500/50' : ''} ${
                    day && isSelected(day) ? 'bg-emerald-500 text-slate-900 font-bold' : 'text-slate-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time Selector */}
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[10px] text-slate-500 uppercase">Time:</span>
                <select
                  value={selectedHour}
                  onChange={(e) => handleTimeChange(parseInt(e.target.value), selectedMinute)}
                  className="bg-slate-800 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="text-slate-400">:</span>
                <select
                  value={selectedMinute}
                  onChange={(e) => handleTimeChange(selectedHour, parseInt(e.target.value))}
                  className="bg-slate-800 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Now', getValue: () => new Date() },
                  { label: 'Yesterday Close', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); d.setHours(16, 0, 0, 0); return d; }},
                  { label: 'Last Friday', getValue: () => { const d = new Date(); const day = d.getDay(); const diff = day === 0 ? 2 : day === 6 ? 1 : day + 2; d.setDate(d.getDate() - diff); d.setHours(16, 0, 0, 0); return d; }},
                  { label: 'Month Start', getValue: () => { const d = new Date(); d.setDate(1); d.setHours(9, 30, 0, 0); return d; }},
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      const newDate = preset.getValue()
                      setViewDate(newDate)
                      setSelectedHour(newDate.getHours())
                      setSelectedMinute(newDate.getMinutes())
                      onDateSelect(newDate)
                    }}
                    className="text-[10px] py-1.5 px-2 bg-slate-800/80 hover:bg-emerald-500/20 border border-white/10
                               hover:border-emerald-500/30 rounded text-slate-300 hover:text-emerald-400 transition-all"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==============================================
// RISK CARD COMPONENT (Exact match to Riskboard)
// ==============================================

function RiskCard({ data }: { data: RiskCardData }) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    setBarWidth(0)
    const timer = setTimeout(() => setBarWidth(65), 300)
    return () => clearTimeout(timer)
  }, [data.title])

  return (
    <motion.div
      className="bg-slate-800/50 border border-white/10 rounded-lg overflow-hidden flex flex-col w-full max-w-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ borderColor: `${data.color}40` }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-base font-bold" style={{ color: data.color }}>{data.title}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${data.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {data.isUp ? '▲' : '▼'} {data.change}
          </span>
          <span className="text-slate-600 text-xs">::</span>
          <motion.button
            className="px-3 py-1 text-xs font-medium border border-white/20 rounded text-slate-300 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trades
          </motion.button>
        </div>
      </div>

      {/* Primary Metric */}
      <div className="px-4 py-3">
        <div className="text-xs text-slate-500 uppercase tracking-wide">{data.primaryLabel}</div>
        <motion.div
          className="text-3xl font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {data.primaryValue}
        </motion.div>
        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-700/50 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}88)` }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-3">
        {data.secondaryMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="bg-slate-900/50 rounded px-3 py-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div className="text-[9px] text-slate-500 uppercase">{metric.label}</div>
            <div className="text-sm font-mono font-semibold text-slate-200">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <div className="px-4 flex-1">
        {/* Table Header */}
        <div
          className="grid gap-1 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-wide rounded-t"
          style={{
            gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)`,
            backgroundColor: `${data.color}15`,
            color: data.color
          }}
        >
          {data.tableHeaders.map((header, i) => (
            <span key={i} className={i > 0 ? 'text-center' : ''}>{header}</span>
          ))}
        </div>
        {/* Table Rows */}
        <div className="bg-slate-900/30 rounded-b">
          {data.tableRows.map((row, rowIndex) => (
            <motion.div
              key={row.label}
              className="grid gap-1 px-2 py-1 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/5"
              style={{ gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + rowIndex * 0.05 }}
            >
              <span className="font-medium" style={{ color: data.color }}>{row.label}</span>
              {row.values.map((val, i) => (
                <span key={i} className="text-center font-mono text-slate-300">{val}</span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-2 px-4 py-3 mt-auto">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="text-[9px] text-slate-500 uppercase">Positions</div>
          <div className="text-xs font-mono text-slate-200">{data.positions}</div>
        </motion.div>
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <div className="text-[9px] text-slate-500 uppercase">VaR (95%)</div>
          <div className="text-xs font-mono text-rose-400">{data.var95}</div>
        </motion.div>
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="text-[9px] text-slate-500 uppercase">CVaR (95%)</div>
          <div className="text-xs font-mono text-rose-400">{data.cvar95}</div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-3">
        <motion.div className="bg-slate-900/40 rounded px-3 py-2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <div className="text-[9px] text-slate-500 uppercase">Gross Exposure</div>
          <div className="text-sm font-mono font-semibold text-slate-200">{data.grossExposure}</div>
        </motion.div>
        <motion.div className="bg-slate-900/40 rounded px-3 py-2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <div className="text-[9px] text-slate-500 uppercase">Net Exposure</div>
          <div className="text-sm font-mono font-semibold text-slate-200">{data.netExposure}</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==============================================
// CARD DATA
// ==============================================

const riskCardsData: RiskCardData[] = [
  {
    title: 'EQUITY',
    color: '#3b82f6',
    primaryLabel: 'NET DELTA',
    primaryValue: '$42.5M',
    change: '+1.2%',
    isUp: true,
    secondaryMetrics: [
      { label: 'Beta', value: '1.15' },
      { label: 'Vega', value: '$280K' },
      { label: 'Gamma', value: '$42K' },
    ],
    tableHeaders: ['', '%', 'DELTA', 'BETA', 'VEGA', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'US+CAN', values: ['48%', '$20.4M', '1.08', '$134K', '0.96', '-$19.6M'] },
      { label: 'Europe', values: ['22%', '$9.4M', '0.95', '$62K', '0.88', '-$8.3M'] },
      { label: 'Japan', values: ['15%', '$6.4M', '0.82', '$42K', '0.85', '-$5.4M'] },
      { label: 'SE Asia', values: ['10%', '$4.3M', '1.15', '$28K', '0.78', '-$3.4M'] },
      { label: 'RoW', values: ['5%', '$2.0M', '0.92', '$14K', '0.72', '-$1.4M'] },
    ],
    positions: 342,
    var95: '$2.1M',
    cvar95: '$3.4M',
    grossExposure: '$320M',
    netExposure: '$42.5M',
    description: 'Aggregate equity exposure across all portfolios and see key risk parameters. Have the historical correlation to the Risk Benchmark and the required notional to neutralize each position\'s delta — updated in real-time.',
  },
  {
    title: 'RATES',
    color: '#22c55e',
    primaryLabel: 'DV01',
    primaryValue: '$85,000',
    change: '-0.8%',
    isUp: false,
    secondaryMetrics: [
      { label: 'Duration', value: '4.2 yrs' },
      { label: 'Convexity', value: '0.45' },
      { label: 'Yield', value: '5.25%' },
    ],
    tableHeaders: ['', '%', 'DV01', 'DUR', 'CONV', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: '2Y', values: ['21%', '$18K', '1.9', '0.08', '0.92', '-$16.5K'] },
      { label: '5Y', values: ['38%', '$32K', '4.6', '0.25', '0.89', '-$28.5K'] },
      { label: '10Y', values: ['33%', '$28K', '8.2', '0.72', '0.85', '-$23.8K'] },
      { label: '30Y', values: ['8%', '$7K', '18.5', '3.80', '0.78', '-$5.5K'] },
    ],
    positions: 156,
    var95: '$1.8M',
    cvar95: '$2.9M',
    grossExposure: '$180M',
    netExposure: '$120M',
    description: 'Aggregate interest rate sensitivity across all fixed income positions. See correlation to your Risk Benchmark and the exact DV01 offset needed to flatten each tenor — updated in real-time.',
  },
  {
    title: 'CREDIT',
    color: '#a855f7',
    primaryLabel: 'CS01',
    primaryValue: '$42,000',
    change: '-1.2%',
    isUp: false,
    secondaryMetrics: [
      { label: 'CR. DUR', value: '3.8 yrs' },
      { label: 'AVG PD', value: '2.4%' },
      { label: 'AVG LGD', value: '40%' },
    ],
    tableHeaders: ['', '%', 'CS01', 'PD', 'LGD', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'AAA-AA', values: ['18%', '$7.5K', '0.1%', '25%', '0.85', '-$6.4K'] },
      { label: 'A', values: ['32%', '$13.4K', '0.5%', '35%', '0.88', '-$11.8K'] },
      { label: 'BBB', values: ['28%', '$11.8K', '1.8%', '40%', '0.82', '-$9.7K'] },
      { label: 'HY', values: ['16%', '$6.7K', '4.2%', '55%', '0.74', '-$5.0K'] },
      { label: 'Distress', values: ['6%', '$2.6K', '18.5%', '65%', '0.42', 'N/A'] },
    ],
    positions: 89,
    var95: '$890K',
    cvar95: '$1.4M',
    grossExposure: '$95M',
    netExposure: '$72M',
    description: 'Aggregate credit spread sensitivity by rating bucket. See correlation to your Risk Benchmark and the CDS notional required to neutralize spread risk — updated in real-time.',
  },
  {
    title: 'FX',
    color: '#06b6d4',
    primaryLabel: 'FX DELTA',
    primaryValue: '$18.2M',
    change: '+0.4%',
    isUp: true,
    secondaryMetrics: [
      { label: 'FX Vega', value: '$320K' },
      { label: 'Basis', value: '42 bps' },
      { label: 'Pairs', value: '12' },
    ],
    tableHeaders: ['', '%', 'DELTA', 'VEGA', 'BASIS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'EUR', values: ['38%', '$6.9M', '$122K', '15bp', '0.94', '-$6.5M'] },
      { label: 'JPY', values: ['25%', '$4.5M', '$80K', '12bp', '0.91', '-$4.1M'] },
      { label: 'GBP', values: ['18%', '$3.3M', '$58K', '8bp', '0.89', '-$2.9M'] },
      { label: 'Crypto', values: ['12%', '$2.2M', '$45K', '5bp', '0.72', '-$1.6M'] },
      { label: 'Other', values: ['7%', '$1.3M', '$15K', '2bp', '0.65', '-$0.8M'] },
    ],
    positions: 45,
    var95: '$540K',
    cvar95: '$850K',
    grossExposure: '$65M',
    netExposure: '$18.2M',
    description: 'Aggregate currency exposure across all positions — including embedded FX risk in equities and bonds. See correlation to your Risk Benchmark and the FX trade needed to neutralize each exposure — updated in real-time.',
  },
  {
    title: 'COMMODITIES',
    color: '#eab308',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$28.5M',
    change: '+1.5%',
    isUp: true,
    secondaryMetrics: [
      { label: 'P. Sens', value: '$285K' },
      { label: 'Basis', value: '$45K' },
      { label: 'Roll', value: '-0.8%' },
    ],
    tableHeaders: ['', '%', 'EXP', 'P.SENS', 'BASIS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'Crude', values: ['42%', '$12M', '$120K', '$18K', '0.92', '-$11M'] },
      { label: 'Gold', values: ['28%', '$8M', '$80K', '$8K', '0.88', '-$7M'] },
      { label: 'NatGas', values: ['15%', '$4.3M', '$43K', '$12K', '0.75', '-$3.2M'] },
      { label: 'Copper', values: ['10%', '$2.8M', '$28K', '$5K', '0.82', '-$2.3M'] },
      { label: 'Other', values: ['5%', '$1.4M', '$14K', '$2K', '0.65', '-$0.9M'] },
    ],
    positions: 67,
    var95: '$1.2M',
    cvar95: '$1.9M',
    grossExposure: '$45M',
    netExposure: '$28.5M',
    description: 'Aggregate commodity exposure across futures, ETFs, and commodity-linked equities. See correlation to your Risk Benchmark and the futures position needed to neutralize each exposure — updated in real-time.',
  },
  {
    title: 'OTHER',
    color: '#94a3b8',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$5.8M',
    change: '-0.0%',
    isUp: false,
    secondaryMetrics: [
      { label: 'P. Sens', value: '$58K' },
      { label: 'Vol Sens', value: '$125K' },
      { label: 'Complx', value: 'Medium' },
    ],
    tableHeaders: ['', '%', 'EXP', 'P.SENS', 'V.SENS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'Volatility', values: ['55%', '$3.2M', '$32K', '$95K', '0.78', '-$2.5M'] },
      { label: 'Struct.', values: ['35%', '$2.0M', '$20K', '$25K', '0.65', '-$1.3M'] },
      { label: 'Unclass.', values: ['10%', '$0.6M', '$6K', '$5K', 'N/A', 'N/A'] },
    ],
    positions: 23,
    var95: '$280K',
    cvar95: '$450K',
    grossExposure: '$12M',
    netExposure: '$5.8M',
    description: 'Aggregate volatility products, structured notes, and exotic derivatives. See correlation to your Risk Benchmark and the delta-equivalent hedge where available — updated in real-time.',
  },
]

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function DashboardPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedBook, setSelectedBook] = useState<BookOption>(bookOptions[0])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const activeCard = riskCardsData[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #10182B)' }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        animate={{ backgroundColor: `${activeCard.color}10` }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Single Book to Firm-Wide Aggregation
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            One Dashboard.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Any Combination of Books.
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            For the first time, get aggregate risk figures for a single book, a group of PMs,
            or your entire firm — all in one unified view. And travel back to any point in time
            to see exactly what your risk looked like.
          </motion.p>
        </motion.div>

        {/* Book + Time Selectors */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <BookSelector selectedBook={selectedBook} onBookSelect={setSelectedBook} />
          <TimeSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </motion.div>

        {/* Current Selection Indicator */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-slate-500">
            Viewing:{' '}
            <span className="text-emerald-400 font-semibold">{selectedBook.name}</span>
            {' '}as of{' '}
            <span className="text-emerald-400 font-mono">{formatDateDisplay(selectedDate)}</span>
          </span>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          {riskCardsData.map((card, index) => (
            <motion.button
              key={card.title}
              onClick={() => setActiveIndex(index)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeIndex === index
                  ? 'text-slate-900 shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
              style={activeIndex === index ? { backgroundColor: card.color } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {card.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Card Display */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <RiskCard key={activeCard.title} data={activeCard} />
            </AnimatePresence>
          </motion.div>

          {/* Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: activeCard.color }} />
                  <h3 className="text-2xl font-bold text-slate-100">{activeCard.title} RiskPod</h3>
                </div>

                {/* Description */}
                <p className="text-base text-slate-400 leading-relaxed mb-8">{activeCard.description}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-slate-100">{activeCard.positions}</div>
                    <div className="text-xs text-slate-500">Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-rose-400">{activeCard.var95}</div>
                    <div className="text-xs text-slate-500">VaR (95%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-slate-100">{activeCard.grossExposure}</div>
                    <div className="text-xs text-slate-500">Gross</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
        >
          <motion.button
            className="px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo
          </motion.button>
          <p className="text-slate-500 text-sm mt-4">
            Single book or firm-wide. Current state or historical. Your risk, your way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
