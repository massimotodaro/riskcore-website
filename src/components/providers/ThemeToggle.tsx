'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <button
        className="p-2 rounded-lg bg-bg-secondary/50 border border-white/10 transition-all duration-300"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative p-2 rounded-lg
        bg-bg-secondary/50 hover:bg-bg-secondary
        border border-black/10 dark:border-white/10
        hover:border-brand-blue/50
        transition-all duration-300 ease-in-out
        group
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon - shown in dark mode, hidden in light mode */}
        <Sun
          className={`
            absolute inset-0 w-5 h-5 text-yellow-400
            transition-all duration-300 ease-in-out
            ${isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
            }
          `}
        />
        {/* Moon icon - shown in light mode, hidden in dark mode */}
        <Moon
          className={`
            absolute inset-0 w-5 h-5 text-slate-700 dark:text-slate-400
            transition-all duration-300 ease-in-out
            ${isDark
              ? 'opacity-0 -rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
      </div>
    </button>
  )
}
