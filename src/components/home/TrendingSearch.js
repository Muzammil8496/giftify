import React from 'react'
import { TrendingUp } from 'lucide-react'

const TrendingSearch = ({ items = [] }) => {
  const trendingItems = items.length
    ? items
    : ['Perfume', 'Watches', 'Shoes', 'Jewelry', 'Dresses', 'Gift Boxes', 'Accessories', 'Pakistani Gifts']

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} className="text-blue-600" />
            <h2 className="text-2xl font-bold">Search Trending</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {trendingItems.map((item) => (
            <button
              key={item}
              className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingSearch