// src/pages/AllGifts.js
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'

const AllGifts = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('cat')
  const { cartCount } = useCart()
  const [filteredGifts, setFilteredGifts] = useState([])

  // Gift categories data
  const giftCategories = {
    'all': { name: 'All Gifts', icon: '🎁', description: 'Find the perfect gift for every occasion' },
    'birthday': { name: 'Birthday Gifts', icon: '🎂', description: 'Celebrate with amazing birthday gifts' },
    'anniversary': { name: 'Anniversary Gifts', icon: '💝', description: 'Romantic gifts for your loved one' },
    'wedding': { name: 'Wedding Gifts', icon: '💍', description: 'Perfect wedding presents' },
    'graduation': { name: 'Graduation Gifts', icon: '🎓', description: 'Celebrate achievements' },
    'christmas': { name: 'Christmas Gifts', icon: '🎄', description: 'Holiday special gifts' },
    'for-her': { name: 'Gifts for Her', icon: '👩', description: 'Thoughtful gifts for women' },
    'for-him': { name: 'Gifts for Him', icon: '👨', description: 'Awesome gifts for men' },
    'for-kids': { name: 'Gifts for Kids', icon: '🧒', description: 'Fun gifts for children' },
    'personalized': { name: 'Personalized Gifts', icon: '🎨', description: 'Unique custom gifts' },
    'luxury': { name: 'Luxury Gifts', icon: '👑', description: 'Premium gift collection' },
    'eco-friendly': { name: 'Eco-Friendly Gifts', icon: '🌱', description: 'Sustainable gift options' }
  }

  // Sample gifts data
  const allGifts = [
    { id: 1, name: 'Personalized Photo Frame', category: 'personalized', price: 29.99, rating: 4.8, image: '/api/placeholder/300/300', isTrending: true },
    { id: 2, name: 'Luxury Watch', category: 'luxury', price: 299.99, rating: 4.9, image: '/api/placeholder/300/300', isTrending: true },
    { id: 3, name: 'Birthday Gift Basket', category: 'birthday', price: 49.99, rating: 4.7, image: '/api/placeholder/300/300' },
    { id: 4, name: 'Anniversary Couple Ring', category: 'anniversary', price: 199.99, rating: 4.9, image: '/api/placeholder/300/300' },
    { id: 5, name: 'Wedding Hamper', category: 'wedding', price: 149.99, rating: 4.8, image: '/api/placeholder/300/300' },
    { id: 6, name: 'Graduation Plaque', category: 'graduation', price: 59.99, rating: 4.6, image: '/api/placeholder/300/300' },
    { id: 7, name: 'Christmas Decoration Set', category: 'christmas', price: 39.99, rating: 4.7, image: '/api/placeholder/300/300' },
    { id: 8, name: 'Perfume Gift Set - For Her', category: 'for-her', price: 89.99, rating: 4.8, image: '/api/placeholder/300/300' },
    { id: 9, name: 'Wallet Gift Set - For Him', category: 'for-him', price: 69.99, rating: 4.7, image: '/api/placeholder/300/300' },
    { id: 10, name: 'Kids Toy Set', category: 'for-kids', price: 34.99, rating: 4.6, image: '/api/placeholder/300/300' },
    { id: 11, name: 'Eco-Friendly Gift Box', category: 'eco-friendly', price: 44.99, rating: 4.8, image: '/api/placeholder/300/300' },
    { id: 12, name: 'Custom Name Necklace', category: 'personalized', price: 79.99, rating: 4.9, image: '/api/placeholder/300/300' }
  ]

  useEffect(() => {
    if (category && category !== 'all') {
      const filtered = allGifts.filter(gift => 
        gift.category === category
      )
      setFilteredGifts(filtered)
    } else {
      setFilteredGifts(allGifts)
    }
  }, [category])

  return (
    <>
      <TopBar />
      <Navbar cartCount={cartCount} />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">
              🎁 {giftCategories[category]?.name || 'All Gifts'}
            </h1>
            <p className="text-pink-100 text-lg">
              {giftCategories[category]?.description || 'Find the perfect gift for your loved ones'}
            </p>
            {category && category !== 'all' && (
              <p className="text-pink-100 mt-2">
                Found {filteredGifts.length} amazing gifts
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Gift Categories Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {Object.entries(giftCategories).map(([key, cat]) => (
                <Link
                  key={key}
                  to={key === 'all' ? '/gifts' : `/gifts?cat=${key}`}
                  className={`p-3 rounded-lg text-center transition-all group ${
                    category === key 
                      ? 'bg-pink-600 text-white shadow-md' 
                      : 'bg-white hover:bg-pink-50 border border-gray-200'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${category === key ? 'text-white' : ''}`}>
                    {cat.icon}
                  </div>
                  <div className={`text-sm font-medium ${category === key ? 'text-white' : 'text-gray-700'}`}>
                    {cat.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="mb-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold">🎉 Special Gift Season!</h3>
                <p className="text-yellow-100">Get up to 40% off on selected gifts. Free shipping on orders over $50</p>
              </div>
              <Link to="/gifts" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                Shop Now →
              </Link>
            </div>
          </div>

          {/* Gifts Display */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {giftCategories[category]?.name || 'All Gifts'}
              </h2>
              <span className="text-gray-500 text-sm">{filteredGifts.length} items</span>
            </div>
            
            {filteredGifts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGifts.map(gift => (
                  <Link 
                    key={gift.id} 
                    to={`/product/${gift.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={gift.image} 
                        alt={gift.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {gift.isTrending && (
                        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          🔥 Trending
                        </span>
                      )}
                      <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        🎁 Gift
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {gift.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 capitalize">{gift.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-pink-600 font-bold text-lg">${gift.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600">{gift.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">🎁</div>
                <p className="text-gray-500 text-lg">No gifts found in this category</p>
                <Link to="/gifts" className="text-pink-600 hover:underline mt-4 inline-block">
                  Browse all gifts →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default AllGifts