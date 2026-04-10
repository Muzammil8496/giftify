import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Gift, Sparkles, Heart, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const footerLinks = {
  shop: [
    { labelKey: 'allGifts', to: '/gifts' },
    { label: 'Birthday Gifts', to: '/gifts?occasion=birthday' },
    { label: 'Trending Now', to: '/shop?filter=trending' },
    { labelKey: 'bestSellers', to: '/shop?filter=bestseller' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Deals & Offers', to: '/deals' },
    { label: 'Custom Gifts', to: '/custom-gift' },
  ],
  help: [
    { label: 'FAQ', to: '/faq' },
    { labelKey: 'shipping', to: '/shipping' },
    { labelKey: 'returns', to: '/returns' },
    { labelKey: 'privacy', to: '/privacy' },
  ],
}

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    className: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M13.5 22v-8h2.7l.4-3H13.5V8.3c0-.9.2-1.5 1.6-1.5h1.7V4.1c-.8-.1-1.8-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9V11H7v3h2.3v8h4.2Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    className: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    className: 'hover:bg-[#000000] hover:border-[#000000]',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L5 22H2l7.9-9L1 2h7l4.8 6.2L18.9 2Zm-1.2 18h1.8L7.1 4H5.2l12.5 16Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    className: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5A3 3 0 0 0 2.4 7.2 31.4 31.4 0 0 0 2 12a31.4 31.4 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 22 12a31.4 31.4 0 0 0-.4-4.8ZM10 15.3V8.7L15.8 12 10 15.3Z" />
      </svg>
    ),
  },
]

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="relative mt-16 overflow-hidden bg-[#111111] text-gray-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,92,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(108,92,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,95,143,0.10),transparent_26%)]" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 py-14">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white shadow-lg">
                  <Gift size={20} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">giftify.</span>
              </Link>
              <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                Premium gifting made simple. Discover thoughtful gifts, beautiful packaging, and perfect picks for every occasion across Pakistan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition hover:text-white ${item.className}`}
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Shop
              </h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.shop.map((item) => (
                  <li key={item.labelKey || item.label}>
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                    >
                      <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                      {item.labelKey ? t(item.labelKey) : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Company
              </h4>
              <ul className="mt-5 space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                    >
                      <ArrowRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Contact
              </h4>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-[#ff8b5c]" />
                  <span className="leading-6 text-gray-400">(+084) 859-481-3614</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 text-[#ff5f8f]" />
                  <span className="leading-6 text-gray-400">support@giftify.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-[#6c5cff]" />
                  <span className="leading-6 text-gray-400">
                    123 Business Street, Lahore, Pakistan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white shadow-lg">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t('stayInMood')}</h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-400">
                  {t('newsletterDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder={t('enterEmail')}
                className="h-12 flex-1 rounded-full border border-white/10 bg-[#151515] px-5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff8b5c]/40"
              />
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] px-6 text-sm font-semibold text-white shadow-lg hover:scale-[1.02] transition">
                {t('subscribe')}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row md:text-left">
            <p className="inline-flex items-center gap-2">
              <Heart size={14} className="text-[#ff5f8f]" />
              © 2025 giftify. {t('allRights')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link to="/privacy" className="transition hover:text-white">
                {t('privacy')}
              </Link>
              <Link to="/returns" className="transition hover:text-white">
                {t('returns')}
              </Link>
              <Link to="/shipping" className="transition hover:text-white">
                {t('shipping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer