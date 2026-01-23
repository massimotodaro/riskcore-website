'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CookiePreferences } from './CookieConsent'

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
  initialPreferences: CookiePreferences
}

interface CookieCategory {
  id: keyof CookiePreferences
  name: string
  description: string
  required: boolean
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Strictly Necessary',
    description: 'Essential for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility. You cannot disable these cookies.',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics & Performance',
    description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
    required: false,
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Enable enhanced functionality and personalization, such as remembering your preferences and settings for future visits.',
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    description: 'Used to track visitors across websites to display relevant advertisements. These cookies help us measure the effectiveness of our marketing campaigns.',
    required: false,
  },
]

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  onSave,
  initialPreferences,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(initialPreferences)

  useEffect(() => {
    setPreferences(initialPreferences)
  }, [initialPreferences])

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === 'necessary') return // Cannot toggle necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSave = () => {
    onSave(preferences)
  }

  const handleAcceptAll = () => {
    onSave({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    })
  }

  const handleRejectAll = () => {
    onSave({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-4 right-4 top-[50%] -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50"
            style={{ maxHeight: 'calc(100vh - 40px)' }}
          >
            <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 40px)' }}>
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#162031]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-100 font-['Space_Grotesk']">
                      Cookie Preferences
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Manage your cookie preferences below. You can enable or disable different types of cookies.
                </p>
              </div>

              {/* Cookie Categories */}
              <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
                {cookieCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-[#0f172a]/50 border border-white/5 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-medium text-slate-100">
                            {category.name}
                          </h3>
                          {category.required && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle(category.id)}
                        disabled={category.required}
                        className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 ${
                          preferences[category.id]
                            ? 'bg-gradient-to-r from-green-400 to-green-500'
                            : 'bg-slate-600'
                        } ${category.required ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                            preferences[category.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-[#162031] bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/25"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
