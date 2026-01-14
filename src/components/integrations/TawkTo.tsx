'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>
    Tawk_LoadStart?: Date
  }
}

export default function TawkTo() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID
    const widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID

    // Skip if not configured
    if (!propertyId || !widgetId) {
      console.log('Tawk.to not configured (NEXT_PUBLIC_TAWKTO_PROPERTY_ID or NEXT_PUBLIC_TAWKTO_WIDGET_ID not set)')
      return
    }

    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Load Tawk.to script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
