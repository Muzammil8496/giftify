import React, { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'

const TrendingSearch = () => {
  const [activeTab, setActiveTab] = useState('trending')
  
  const trendingItems = [
    'Hot Trending', 'Electronic', 'Furniture', 'Garment', 
    'Health & Beauty', 'Handbag', 'Mom & Baby', 'Book & Office'
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} className="text-blue-600" />
            <h2 className="text-2xl font-bold">Search Trending</h2>
          </div>
          <div className="flex gap-4 border-b">
            <button
              className={`pb-2 px-2 ${activeTab === 'trending' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('trending')}
            >
              Hot Trending
            </button>
            <button
              className={`pb-2 px-2 ${activeTab === 'popular' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('popular')}
            >
              Most Popular
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {trendingItems.map((item, index) => (
            <button
              key={index}
              className="px-5 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 text-sm font-medium"
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* <div className="mt-8 relative max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> */}
      </div>
    </section>
  )
}

export default TrendingSearch