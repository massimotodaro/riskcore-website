'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    $crisp: unknown[]
    CRISP_WEBSITE_ID: string
  }
}

export default function CrispChat() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

    // Skip if no website ID configured
    if (!websiteId) {
      console.log('Crisp chat not configured (NEXT_PUBLIC_CRISP_WEBSITE_ID not set)')
      return
    }

    // Initialize Crisp
    window.$crisp = []
    window.CRISP_WEBSITE_ID = websiteId

    // Load Crisp script
    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
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
