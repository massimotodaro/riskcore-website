'use client'

/**
 * FixedChallengesArrow.tsx
 *
 * A fixed curved arrow on the LEFT side of the screen
 * that appears after scrolling past the hero section.
 * Color changes as user scrolls through the page sections.
 * Links back to the landing page (the challenges/problems).
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Our 5 brand colors
const colors = [
  '#3b82f6', // blue
  '#a855f7', // purple
  '#22c55e', // green
  '#f97316', // orange
  '#06b6d4', // turquoise/cyan
]

export default function FixedChallengesArrow() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentColor, setCurrentColor] = useState(colors[0])

  useEffect(() => {
    const handleScroll = () => {
      // Desktop: Show when the Features section starts
      // Mobile: Always show (no scroll threshold needed)
      const isMobile = window.innerWidth < 1024

      if (isMobile) {
        setIsVisible(true)
      } else {
        const featuresSection = document.getElementById('features-section')
        if (featuresSection) {
          const sectionTop = featuresSection.getBoundingClientRect().top
          setIsVisible(sectionTop <= window.innerHeight * 0.5)
        } else {
          // Fallback: show after scrolling 80vh if features section not found
          setIsVisible(window.scrollY > window.innerHeight * 0.8)
        }
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
          {/* Desktop: left side, vertically centered */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-50"
          >
            <Link href="/#problem">
              <motion.div
                className="group flex flex-col items-center cursor-pointer pl-4"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Curved Arrow SVG - Mirrored for left side */}
                <motion.svg
                  width="80"
                  height="120"
                  viewBox="0 0 80 120"
                  fill="none"
                  className="drop-shadow-lg"
                  style={{
                    filter: `drop-shadow(0 0 15px ${currentColor}40)`,
                    transform: 'scaleX(-1)' // Mirror horizontally
                  }}
                >
                {/* Curved swooping arrow path */}
                <defs>
                  <linearGradient id="arrowGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill="url(#arrowGradientLeft)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Sleek curved line */}
                <motion.path
                  d="M8 15 Q 0 55, 25 80 Q 45 98, 75 85"
                  stroke="url(#arrowGradientLeft)"
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
                  stroke="url(#arrowGradientLeft)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.svg>

              {/* Challenges text */}
              <motion.span
                className="text-xs font-bold uppercase tracking-[0.2em] mt-2"
                animate={{ color: currentColor }}
                transition={{ duration: 0.5 }}
              >
                Challenges
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>

          {/* Mobile: bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:hidden fixed bottom-6 left-4 z-50"
          >
            <Link href="/#problem">
              <motion.div
                className="group flex items-center gap-2 cursor-pointer px-4 py-3 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: `${currentColor}15`,
                  borderColor: `${currentColor}40`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke={currentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <motion.span
                  className="text-xs font-bold uppercase tracking-wider"
                  animate={{ color: currentColor }}
                  transition={{ duration: 0.5 }}
                >
                  Challenges
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
