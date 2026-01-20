'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">
        <span className="text-xs text-text-muted">Color Mode</span>
        <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="text-xs text-text-muted">Color Mode</span>
      <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full relative">
        {/* Spinning colorful circle */}
        <motion.div
          className="absolute w-4 h-4 rounded-full top-0.5"
          style={{
            left: isDark ? '2px' : 'calc(100% - 18px)',
            background: 'conic-gradient(#ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          layout
        />
      </div>
    </button>
  )
}
