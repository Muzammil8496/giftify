import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import CountdownTimer from '../ui/CountdownTimer'

const FlashDeals = ({ products = [] }) => {
  const flashProducts = products.filter((p) => p.flashDeal)
  if (!flashProducts.length) return null

  const targetDate = new Date()
  targetDate.setHours(targetDate.getHours() + 12)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#1a0a20] to-gray-950 py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,95,143,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(108,92,255,0.15),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8b5c] to-[#ff5f8f]">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Flash Deals</h2>
              <p className="text-sm text-gray-400">Hurry, limited stock!</p>
            </div>
          </div>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop?filter=trending"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View All Deals <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FlashDeals