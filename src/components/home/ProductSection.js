import React from 'react'
import ProductCard from '../ui/ProductCard'

const ProductSection = ({ title, products, viewAllLink = '/shop' }) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">{title}</h2>
          <a href={viewAllLink} className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection