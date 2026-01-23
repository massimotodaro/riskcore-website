'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CookiePreferencesModal from './CookiePreferencesModal'

export interface CookiePreferences {
  necessary: boolean // Always true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'riskcore-cookie-consent'

export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function setCookieConsent(preferences: CookiePreferences): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
  // Dispatch custom event so other components can react
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: preferences }))
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already set preferences
    const stored = getCookieConsent()
    if (!stored) {
      // Small delay for better UX - let page load first
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setCookieConsent(allAccepted)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setCookieConsent(allRejected)
    setShowBanner(false)
  }

  const handleSavePreferences = (prefs: CookiePreferences) => {
    setCookieConsent(prefs)
    setShowPreferences(false)
    setShowBanner(false)
  }

  const handleOpenPreferences = () => {
    setShowPreferences(true)
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#162031]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100 font-['Space_Grotesk']">
                        We value your privacy
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                      By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can customize your preferences
                      or reject non-essential cookies.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                    <button
                      onClick={handleOpenPreferences}
                      className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
                    >
                      Preferences
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-sm font-semibold text-[#162031] bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/25"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
        initialPreferences={preferences}
      />
    </>
  )
}
