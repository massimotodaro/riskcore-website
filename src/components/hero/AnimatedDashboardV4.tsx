'use client'

import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState, MouseEvent } from 'react'
import { TrendingUp, TrendingDown, Shield, Target, Layers } from 'lucide-react'

// 3D Card component with mouse tracking
function Card3D({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated counter hook
function useCounter(end: number, duration: number = 2500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}

// Floating metric card with depth
function FloatingMetricCard({ icon: Icon, label, value, change, positive, color, delay, depth }: {
  icon: any
  label: string
  value: string
  change: string
  positive: boolean
  color: string
  delay: number
  depth: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, z: -50 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      style={{ transform: `translateZ(${depth}px)` }}
      className="glass-card p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-xs text-text-muted uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold font-mono text-text-primary mb-1">{value}</div>
      <div className={`text-xs font-semibold flex items-center gap-1 ${positive ? 'text-brand-green' : 'text-red-400'}`}>
        {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {change}
      </div>
    </motion.div>
  )
}

// Asset bar with animation
function AssetBar({ name, value, pct, color, delay }: {
  name: string
  value: string
  pct: number
  color: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium" style={{ color }}>{name}</span>
        <span className="text-sm font-mono text-text-secondary">{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full transition-shadow group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Asset classes
const assetClasses = [
  { name: 'EQUITY', value: '$320M', pct: 75, color: '#579CF9' },
  { name: 'RATES', value: '$180M', pct: 55, color: '#3CD574' },
  { name: 'CREDIT', value: '$95M', pct: 45, color: '#a855f7' },
  { name: 'FX', value: '$65M', pct: 35, color: '#06b6d4' },
  { name: 'COMMODITIES', value: '$45M', pct: 25, color: '#eab308' },
]

export default function AnimatedDashboardV4() {
  const firmExposure = useCounter(442000000, 2500)
  const firmVaR = useCounter(13700000, 2500)
  const positions = useCounter(4247, 2000)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative w-full max-w-5xl mx-auto perspective-[1500px]"
    >
      {/* 3D Dashboard Card */}
      <Card3D className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl border border-white/10 dark:border-white/10 bg-bg-secondary/80 dark:bg-[rgba(30,41,59,0.9)] backdrop-blur-xl shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Header with depth */}
          <motion.div
            className="flex items-center justify-between mb-8"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Layers className="w-6 h-6 text-brand-green" />
              </motion.div>
              <span className="text-lg font-bold text-text-primary">RISKCORE DASHBOARD</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-brand-green"
              />
              <span className="text-sm text-text-muted">Real-time</span>
            </div>
          </motion.div>

          {/* Main Metrics - Floating Cards */}
          <div
            className="grid grid-cols-3 gap-4 mb-8"
            style={{ transform: 'translateZ(20px)' }}
          >
            <FloatingMetricCard
              icon={Target}
              label="Firm Exposure"
              value={`$${Math.floor(firmExposure.count / 1000000)}M`}
              change="+2.4% today"
              positive={true}
              color="#22c55e"
              delay={0.3}
              depth={15}
            />
            <FloatingMetricCard
              icon={Shield}
              label="Value at Risk"
              value={`$${(firmVaR.count / 1000000).toFixed(1)}M`}
              change="3.1% of NAV"
              positive={true}
              color="#3b82f6"
              delay={0.4}
              depth={25}
            />
            <FloatingMetricCard
              icon={Layers}
              label="Positions"
              value={positions.count.toLocaleString()}
              change="+127 today"
              positive={true}
              color="#a855f7"
              delay={0.5}
              depth={20}
            />
          </div>

          {/* Asset Class Distribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-5 rounded-xl bg-white/5 border border-white/10"
            style={{ transform: 'translateZ(10px)' }}
          >
            <div className="text-xs text-text-muted uppercase tracking-wider mb-4">
              Asset Class Exposure
            </div>
            <div className="space-y-4">
              {assetClasses.map((asset, i) => (
                <AssetBar
                  key={asset.name}
                  {...asset}
                  delay={0.7 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom Row: PM Cards with depth illusion */}
          <div className="grid grid-cols-4 gap-3 mt-6" style={{ transform: 'translateZ(5px)' }}>
            {[
              { name: 'Alpha Fund', return: '+1.92%', positive: true },
              { name: 'Beta Quant', return: '-1.06%', positive: false },
              { name: 'Gamma Global', return: '+2.06%', positive: true },
              { name: 'Delta Macro', return: '+0.84%', positive: true },
            ].map((pm, i) => (
              <motion.div
                key={pm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, z: 20 }}
                className={`p-3 rounded-lg border backdrop-blur-sm cursor-pointer transition-colors ${
                  pm.positive
                    ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40'
                    : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                }`}
              >
                <div className="text-xs text-text-muted mb-1">{pm.name}</div>
                <div className={`text-lg font-bold font-mono ${pm.positive ? 'text-brand-green' : 'text-red-400'}`}>
                  {pm.return}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reflection effect at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent rounded-b-2xl pointer-events-none" />
        </motion.div>

        {/* Shadow/reflection below card */}
        <div className="absolute inset-x-8 -bottom-8 h-16 bg-gradient-to-b from-black/30 to-transparent blur-xl rounded-full" />
      </Card3D>

      {/* Ambient glow effects */}
      <motion.div
        className="absolute -inset-8 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ filter: 'blur(40px)' }}
      />

      {/* Hidden span refs for counters */}
      <span ref={firmExposure.ref} className="hidden" />
      <span ref={firmVaR.ref} className="hidden" />
      <span ref={positions.ref} className="hidden" />
    </motion.div>
  )
}
