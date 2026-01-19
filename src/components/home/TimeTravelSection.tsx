'use client'

/**
 * TimeTravelSection.tsx
 *
 * "You're now officially the Marty McFly of Risk Management."
 *
 * Landing page section showcasing the Time Travel feature.
 * For risk managers who've always wanted to go back in time
 * (but for compliance reasons, not personal ones).
 *
 * Usage:
 *   <TimeTravelSection />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// ==============================================
// HELPER FUNCTIONS
// ==============================================

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
// CALENDAR PICKER COMPONENT
// ==============================================

interface CalendarPickerProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onClose: () => void
}

function CalendarPicker({ selectedDate, onDateSelect, onClose }: CalendarPickerProps) {
  const [viewDate, setViewDate] = useState(new Date(selectedDate))
  const [selectedHour, setSelectedHour] = useState(selectedDate.getHours())
  const [selectedMinute, setSelectedMinute] = useState(selectedDate.getMinutes())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (day: number) => {
    const newDate = new Date(year, month, day, selectedHour, selectedMinute)
    onDateSelect(newDate)
  }

  const handleTimeChange = (hours: number, minutes: number) => {
    setSelectedHour(hours)
    setSelectedMinute(minutes)
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    )
    onDateSelect(newDate)
  }

  // Generate calendar days
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()
  }

  return (
    <motion.div
      className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-emerald-500/30 rounded-xl p-3 shadow-2xl z-50"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-slate-200">
          {FULL_MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-[10px] text-slate-500 text-center font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map((day, i) => (
          <button
            key={i}
            disabled={day === null}
            onClick={() => day && handleDayClick(day)}
            className={`
              text-[11px] py-1.5 rounded transition-all
              ${day === null ? 'invisible' : 'hover:bg-emerald-500/20'}
              ${day && isToday(day) ? 'ring-1 ring-emerald-500/50' : ''}
              ${day && isSelected(day)
                ? 'bg-emerald-500 text-slate-900 font-bold'
                : 'text-slate-300'
              }
            `}
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
            { label: 'Yesterday Close', getValue: () => {
              const d = new Date()
              d.setDate(d.getDate() - 1)
              d.setHours(16, 0, 0, 0)
              return d
            }},
            { label: 'Last Friday', getValue: () => {
              const d = new Date()
              const day = d.getDay()
              const diff = day === 0 ? 2 : day === 6 ? 1 : day + 2
              d.setDate(d.getDate() - diff)
              d.setHours(16, 0, 0, 0)
              return d
            }},
            { label: 'Month Start', getValue: () => {
              const d = new Date()
              d.setDate(1)
              d.setHours(9, 30, 0, 0)
              return d
            }},
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

      {/* Close hint */}
      <div className="text-center mt-3">
        <button
          onClick={onClose}
          className="text-[10px] text-slate-500 hover:text-emerald-400 transition-colors"
        >
          Click outside to close
        </button>
      </div>
    </motion.div>
  )
}

// ==============================================
// ANIMATED TIME TRAVEL DASHBOARD
// ==============================================

function AnimatedDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize with current date on mount
  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-72"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Dashboard frame */}
      <motion.div
        className="relative bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4
                   shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        whileHover={{ borderColor: 'rgba(16,185,129,0.6)' }}
      >
        {/* Date/Time Display */}
        <div className="text-center mb-3">
          <motion.div
            className="font-mono text-2xl font-bold text-emerald-400"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {formatDateDisplay(selectedDate)}
          </motion.div>
        </div>

        {/* Interactive Time Selector */}
        <div className="relative">
          <motion.button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="w-full flex items-center justify-center gap-2 bg-slate-800/80 rounded-lg px-3 py-2 border border-white/10
                       hover:border-emerald-500/30 transition-colors cursor-pointer"
            animate={!isCalendarOpen ? {
              boxShadow: ['0 0 0px #10b981', '0 0 15px #10b981', '0 0 0px #10b981']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-slate-300">
              {isCalendarOpen ? 'Select Date & Time' : 'Change Date & Time'}
            </span>
            <motion.span
              className="text-slate-500 text-xs"
              animate={{ rotate: isCalendarOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </motion.button>

          {/* Calendar Dropdown */}
          {isCalendarOpen && (
            <CalendarPicker
              selectedDate={selectedDate}
              onDateSelect={(date) => setSelectedDate(date)}
              onClose={() => setIsCalendarOpen(false)}
            />
          )}
        </div>

        {/* Calculate button */}
        <motion.button
          className="w-full mt-3 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg
                     text-emerald-400 text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(16,185,129,0)',
              '0 0 20px rgba(16,185,129,0.4)',
              '0 0 0px rgba(16,185,129,0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <motion.span
            className="inline-block mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ↻
          </motion.span>
          Calculate
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// SPEED LINES ANIMATION (88 MPH VIBES)
// ==============================================

function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
          style={{
            top: `${10 + i * 8}%`,
            left: '-100%',
            width: '50%',
          }}
          animate={{
            x: ['0%', '400%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ==============================================
// MODERN SVG ICONS FOR FEATURE CARDS
// ==============================================

const FeatureIcons = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M16 3l2 2" />
      <path d="M8 3l-2 2" />
    </svg>
  ),
  snapshot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 9h2" />
      <path d="M19 9h2" />
    </svg>
  ),
  greeks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-6 4 4 5-8" />
      <circle cx="7" cy="16" r="1.5" fill="currentColor" />
      <circle cx="11" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      <circle cx="20" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  ),
}

// ==============================================
// FEATURE CARDS
// ==============================================

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-5
                 hover:border-emerald-500/30 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="text-emerald-400 mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-slate-100 mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ==============================================
// MAIN TIME TRAVEL SECTION
// ==============================================

export default function TimeTravelSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const features = [
    {
      icon: FeatureIcons.clock,
      title: 'Any Point in Time',
      description: 'Jump to market close, pre-announcement, post-earnings, or any custom timestamp. Your risk, your timeline.',
    },
    {
      icon: FeatureIcons.snapshot,
      title: 'Position Snapshots',
      description: 'See exactly what you held at any moment. No more "I think we had exposure" - now you know.',
    },
    {
      icon: FeatureIcons.greeks,
      title: 'Historical Greeks',
      description: 'Delta, Gamma, Vega, Theta - all recalculated for any point in history. Hindsight is finally 20/20.',
    },
    {
      icon: FeatureIcons.audit,
      title: 'Audit Trail',
      description: 'Regulators asking questions? Travel back and show them exactly what your book looked like.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden bg-transparent"
    >
      {/* Background effects */}
      <SpeedLines />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Time Travel for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Risk Managers
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Because &ldquo;what was our exposure last Friday?&rdquo; shouldn&apos;t require
            three spreadsheets and a prayer.
          </motion.p>
        </motion.div>

        {/* Main Content - Quote + Visual */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - The Marty McFly Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed mb-6">
                You&apos;re now officially the{' '}
                <span className="text-emerald-400 font-bold">Marty McFly</span>
                {' '}of Risk Management.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Instead of a DeLorean doing 88 mph, you&apos;ve got a dropdown doing{' '}
                <span className="text-slate-200">T-minus whatever-you-want</span>.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                Now you can finally answer the question that&apos;s been haunting you:{' '}
                <motion.span
                  className="text-emerald-400 font-semibold italic"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  &ldquo;Did my PM have $50M of Tesla exposure last Friday before Elon tweeted again?&rdquo;
                </motion.span>
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="group flex items-center gap-3 px-6 py-3 bg-emerald-500 hover:bg-emerald-400
                           rounded-xl text-slate-900 font-semibold text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Go Back in Time</span>
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              <p className="text-sm text-slate-500 mt-3">
                Flux capacitor not included. Calculate button works just as well.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Animated Dashboard Visual */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatedDashboard />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={0.9 + index * 0.1}
            />
          ))}
        </motion.div>
      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}
