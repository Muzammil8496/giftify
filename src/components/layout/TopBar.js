import React from 'react'
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const TopBar = () => {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="hidden md:block border-b border-white/10 bg-gradient-to-r from-[#111111] via-[#171717] to-[#111111] text-gray-300">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-[13px] sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#ff8b5c]" />
            <span>{t('callUs')}: (+084) 859-481-3614</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#ff5f8f]" />
            <span>{t('email')}: support@giftify.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#6c5cff]" />
            <span>{t('fastDelivery')}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-gray-200">
            <Sparkles size={14} className="text-[#ff8b5c]" />
            {t('giftWrapping')}
          </div>

          <div className="flex items-center gap-3">
            <select className="cursor-pointer bg-transparent text-[13px] text-gray-300 outline-none">
              <option className="text-black">USD</option>
              <option className="text-black">PKR</option>
            </select>
            <span className="text-gray-600">|</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="cursor-pointer bg-transparent text-[13px] text-gray-300 outline-none"
            >
              <option value="en" className="text-black">
                English
              </option>
              <option value="ur" className="text-black">
                اردو
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar