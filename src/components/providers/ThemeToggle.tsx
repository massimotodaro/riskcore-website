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
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">Dark Mode</span>
        <div className="w-10 h-5 bg-slate-700 rounded-full" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="text-xs text-text-muted">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      <div className="w-10 h-5 bg-slate-700 rounded-full relative overflow-hidden">
        {/* Circle - colorful spinning in dark mode, white in light mode */}
        <motion.div
          className="absolute w-4 h-4 rounded-full top-0.5"
          initial={false}
          animate={{
            left: isDark ? 2 : 22,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            left: { duration: 0.3, ease: 'easeInOut' },
            rotate: isDark
              ? { duration: 8, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }}
          style={{
            background: isDark
              ? 'conic-gradient(#ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)'
              : '#ffffff'
          }}
        />
      </div>
    </button>
  )
}
