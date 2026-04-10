import React, { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const t = (key) => translations[language]?.[key] || translations.en?.[key] || key
  const isRTL = language === 'ur'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : 'inherit' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}