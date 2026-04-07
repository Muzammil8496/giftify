import React from 'react'
import { Link } from 'react-router-dom'
import { Store, Star } from 'lucide-react'

const TopVendors = () => {
  const vendors = [
    { id: 1, name: 'TechZone', logo: 'TZ', products: 156, rating: 4.8 },
    { id: 2, name: 'GadgetHub', logo: 'GH', products: 98, rating: 4.6 },
    { id: 3, name: 'ElectroStore', logo: 'ES', products: 203, rating: 4.9 },
    { id: 4, name: 'MegaMart', logo: 'MM', products: 312, rating: 4.7 },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Top Vendors</h2>
          <span className="text-gray-500 text-sm">Total stores showing: {vendors.length}</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {vendors.map(vendor => (
            <Link key={vendor.id} to="/vendor" className="group">
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {vendor.logo}
                </div>
                <h3 className="font-semibold text-lg mt-4">{vendor.name}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{vendor.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{vendor.products} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopVendors