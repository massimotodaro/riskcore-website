'use client'

/**
 * FixedSolutionArrow.tsx
 *
 * A fixed curved arrow on the right side of the screen
 * that appears after scrolling past the hero section.
 * Color changes as user scrolls through the page sections.
 * Links to the "Why RISKCORE" page (the solution).
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Our 5 brand colors
const colors = [
  '#34d399', // green/emerald (matches RISKCORE)
  '#3b82f6', // blue
  '#a855f7', // purple
  '#f97316', // orange
  '#06b6d4', // turquoise/cyan
]

export default function FixedSolutionArrow() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentColor, setCurrentColor] = useState('#34d399') // Start with green to match RISKCORE

  useEffect(() => {
    const handleScroll = () => {
      // Desktop: Show after scrolling past 80vh (the hero height)
      // Mobile: Show after scrolling 200px
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        setIsVisible(window.scrollY > 200)
      } else {
        setIsVisible(window.scrollY > window.innerHeight * 0.8)
      }

      // Calculate which color to show based on scroll position
      // Divide the page into sections for each color
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = window.scrollY / scrollableHeight

      // Map scroll progress to color index (0 to 4)
      const colorIndex = Math.min(
        Math.floor(scrollProgress * colors.length),
        colors.length - 1
      )
      setCurrentColor(colors[colorIndex])
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: right side, vertically centered */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50"
          >
            <Link href="/why-riskcore">
              <motion.div
                className="group flex flex-col items-center cursor-pointer pr-4"
                whileHover={{ x: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Curved Arrow SVG */}
                <motion.svg
                  width="80"
                  height="120"
                  viewBox="0 0 80 120"
                  fill="none"
                  className="drop-shadow-lg"
                  style={{ filter: `drop-shadow(0 0 15px ${currentColor}40)` }}
                >
                {/* Curved swooping arrow path */}
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <motion.stop
                      offset="0%"
                      animate={{ stopColor: currentColor }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.stop
                      offset="100%"
                      animate={{ stopColor: currentColor }}
                      transition={{ duration: 0.5 }}
                      style={{ opacity: 0.6 }}
                    />
                  </linearGradient>
                </defs>

                {/* Main curved arrow body */}
                <motion.path
                  d="M10 20
                     Q 5 60, 30 80
                     Q 50 95, 70 85
                     L 65 95
                     L 78 82
                     L 62 78
                     L 68 83
                     Q 50 92, 32 78
                     Q 10 62, 15 25
                     Q 18 15, 10 20"
                  fill="url(#arrowGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Sleek curved line */}
                <motion.path
                  d="M8 15 Q 0 55, 25 80 Q 45 98, 75 85"
                  stroke="url(#arrowGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                {/* Arrow head */}
                <motion.path
                  d="M65 95 L78 82 L62 78"
                  stroke="url(#arrowGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.svg>

              {/* Solution text */}
              <motion.span
                className="text-xs font-bold uppercase tracking-[0.2em] mt-2"
                animate={{ color: currentColor }}
                transition={{ duration: 0.5 }}
              >
                Solution
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>

          {/* Mobile: bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:hidden fixed bottom-6 right-4 z-50"
          >
            <Link href="/why-riskcore">
              <motion.div
                className="group flex items-center gap-2 cursor-pointer px-4 py-3 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: `${currentColor}15`,
                  borderColor: `${currentColor}40`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="text-xs font-bold uppercase tracking-wider"
                  animate={{ color: currentColor }}
                  transition={{ duration: 0.5 }}
                >
                  Solution
                </motion.span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke={currentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
