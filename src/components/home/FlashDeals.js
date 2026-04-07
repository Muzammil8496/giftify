import React from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../ui/CountdownTimer'
import ProductCard from '../ui/ProductCard'

const FlashDeals = ({ products }) => {
  const flashDealProducts = products?.filter(p => p.flashDeal) || []
  
  if (flashDealProducts.length === 0) {
    return null
  }

  const targetDate = new Date()
  targetDate.setHours(targetDate.getHours() + 24)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="section-title">Flash Deals</h2>
          <CountdownTimer targetDate={targetDate} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDealProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FlashDeals