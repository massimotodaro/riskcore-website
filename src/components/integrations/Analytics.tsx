'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { getCookieConsent } from '@/components/cookie-consent'

export default function Analytics() {
  const [hasConsent, setHasConsent] = useState(false)
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    // Check initial consent
    const consent = getCookieConsent()
    if (consent?.analytics) {
      setHasConsent(true)
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail?.analytics) {
        setHasConsent(true)
      }
    }

    window.addEventListener('cookieConsentChanged', handleConsentChange as EventListener)
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange as EventListener)
    }
  }, [])

  // Skip if no GA ID configured or no consent
  if (!gaId || !hasConsent) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
