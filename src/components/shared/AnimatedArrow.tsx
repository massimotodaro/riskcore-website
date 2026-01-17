'use client'

/**
 * AnimatedArrow - Reusable animated arrow component
 *
 * Supports multiple arrow styles:
 * - horizontal: straight left-to-right arrow
 * - vertical: straight top-to-bottom arrow
 * - curved-over: arcs up and over (for connecting cards from top)
 * - curved-under: arcs down and under
 * - hand-drawn: wavy hand-drawn style arrow
 *
 * Usage:
 * <AnimatedArrow variant="curved-over" color="#3b82f6" />
 * <AnimatedArrow variant="horizontal" color="#22c55e" label="30m" />
 */

import { motion } from 'framer-motion'

export type ArrowVariant =
  | 'horizontal'
  | 'horizontal-reverse'
  | 'vertical'
  | 'vertical-reverse'
  | 'curved-over'
  | 'curved-under'
  | 'hand-drawn'
  | 'corner-down-left'
  | 'corner-down-right'

export interface AnimatedArrowProps {
  /** Arrow style variant */
  variant?: ArrowVariant
  /** Arrow color (hex or CSS color) */
  color?: string
  /** Arrow size - affects width/height */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Stroke width */
  strokeWidth?: number
  /** Animation delay in seconds */
  delay?: number
  /** Animation duration in seconds */
  duration?: number
  /** Optional label to display (e.g., time like "30m") */
  label?: string
  /** Show label above or below arrow */
  labelPosition?: 'above' | 'below' | 'center'
  /** Additional CSS classes */
  className?: string
}

// Size configurations
const sizeConfig = {
  sm: { width: 32, height: 24, fontSize: 'text-[10px]' },
  md: { width: 48, height: 32, fontSize: 'text-xs' },
  lg: { width: 64, height: 40, fontSize: 'text-sm' },
  xl: { width: 80, height: 48, fontSize: 'text-base' },
}

export function AnimatedArrow({
  variant = 'horizontal',
  color = '#3b82f6',
  size = 'md',
  strokeWidth = 2,
  delay = 0,
  duration = 0.5,
  label,
  labelPosition = 'above',
  className = '',
}: AnimatedArrowProps) {
  const config = sizeConfig[size]

  // Get the appropriate SVG path based on variant
  const getArrowPath = () => {
    switch (variant) {
      case 'horizontal':
        return {
          viewBox: '0 0 48 24',
          path: 'M4 12 H36',
          arrow: 'M32 6 L42 12 L32 18',
        }
      case 'horizontal-reverse':
        return {
          viewBox: '0 0 48 24',
          path: 'M44 12 H12',
          arrow: 'M16 6 L6 12 L16 18',
        }
      case 'vertical':
        return {
          viewBox: '0 0 24 48',
          path: 'M12 4 V36',
          arrow: 'M6 32 L12 42 L18 32',
        }
      case 'vertical-reverse':
        return {
          viewBox: '0 0 24 48',
          path: 'M12 44 V12',
          arrow: 'M6 16 L12 6 L18 16',
        }
      case 'curved-over':
        return {
          viewBox: '0 0 48 40',
          path: 'M4 36 C4 16, 4 8, 24 8 C44 8, 44 16, 44 36',
          arrow: 'M40 30 L44 38 L48 30',
        }
      case 'curved-under':
        return {
          viewBox: '0 0 48 40',
          path: 'M4 4 C4 24, 4 32, 24 32 C44 32, 44 24, 44 4',
          arrow: 'M40 10 L44 2 L48 10',
        }
      case 'hand-drawn':
        return {
          viewBox: '0 0 60 150',
          path: 'M 30 5 Q 35 40 28 75 Q 22 110 30 130',
          arrow: 'M 15 115 Q 25 135 30 145 Q 35 135 45 115',
        }
      case 'corner-down-left':
        return {
          viewBox: '0 0 80 48',
          path: 'M76 4 V20 C76 28, 68 28, 8 28 L8 44',
          arrow: 'M4 38 L8 46 L12 38',
        }
      case 'corner-down-right':
        return {
          viewBox: '0 0 80 48',
          path: 'M4 4 V20 C4 28, 12 28, 72 28 L72 44',
          arrow: 'M68 38 L72 46 L76 38',
        }
      default:
        return {
          viewBox: '0 0 48 24',
          path: 'M4 12 H36',
          arrow: 'M32 6 L42 12 L32 18',
        }
    }
  }

  const { viewBox, path, arrow } = getArrowPath()

  // Determine dimensions based on variant
  const isVertical = variant === 'vertical' || variant === 'vertical-reverse' || variant === 'hand-drawn'
  const isCorner = variant === 'corner-down-left' || variant === 'corner-down-right'

  const width = isVertical ? config.height : (isCorner ? config.width * 1.5 : config.width)
  const height = isVertical ? config.width * 2 : (isCorner ? config.height * 1.5 : config.height)

  const renderLabel = () => {
    if (!label) return null

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + duration * 0.6, duration: 0.3 }}
        className={`px-2 py-0.5 rounded-full ${config.fontSize} font-bold`}
        style={{
          backgroundColor: `${color}20`,
          border: `1px solid ${color}40`,
          color: color,
        }}
      >
        {label}
      </motion.div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={{
        width: labelPosition === 'center' ? width : 'auto',
        minWidth: width,
      }}
    >
      {labelPosition === 'above' && renderLabel()}

      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        className={labelPosition === 'above' ? '-mt-1' : labelPosition === 'below' ? '-mb-1' : ''}
      >
        {/* Main path */}
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration, delay, ease: 'easeOut' }}
        />
        {/* Arrowhead */}
        <motion.path
          d={arrow}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: delay + duration * 0.8 }}
        />
      </svg>

      {labelPosition === 'below' && renderLabel()}
      {labelPosition === 'center' && (
        <div className="absolute">{renderLabel()}</div>
      )}
    </div>
  )
}

export default AnimatedArrow
