// src/pages/AllProducts.js
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const AllProducts = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const category = searchParams.get('cat')
  const { cartCount } = useCart()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')

  const categories = {
    'all': { name: 'All Products', icon: '🛍️', description: 'Browse our complete collection' },
    'new-arrivals': { name: 'New Arrivals', icon: '✨', description: 'Check out our latest arrivals!' },
    'best-sellers': { name: 'Best Sellers', icon: '🔥', description: 'Our most popular products' },
    'trending': { name: 'Trending Now', icon: '📈', description: "What's hot right now" },
    'electronics': { name: 'Electronics', icon: '💻', description: 'Latest gadgets and electronics' },
    'clothing': { name: 'Clothing', icon: '👕', description: 'Fashion for everyone' },
    'footwear': { name: 'Footwear', icon: '👟', description: 'Shoes for every occasion' },
    'accessories': { name: 'Accessories', icon: '💍', description: 'Complete your look' },
    'home-living': { name: 'Home & Living', icon: '🏠', description: 'Make your home beautiful' },
    'sports': { name: 'Sports', icon: '⚽', description: 'Sports equipment and gear' },
    'books': { name: 'Books', icon: '📚', description: 'Books for every interest' },
    'toys': { name: 'Toys & Games', icon: '🎮', description: 'Fun for all ages' }
  }

  useEffect(() => {
    setSelectedCategory(category || 'all')
    
    if (category && category !== 'all') {
      // Filter products based on category
      const filtered = products.filter(product => {
        const productCategory = product.category?.toLowerCase() || ''
        const searchCategory = category.toLowerCase()
        return productCategory.includes(searchCategory) || 
               productCategory === searchCategory ||
               (searchCategory === 'new-arrivals' && product.isNew) ||
               (searchCategory === 'best-sellers' && product.isBestSeller)
      })
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [category, location])

  return (
    <>
      <TopBar />
      <Navbar cartCount={cartCount} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">
              {categories[selectedCategory]?.name || 'All Products'}
            </h1>
            <p className="text-blue-100 text-lg">
              {categories[selectedCategory]?.description || 'Browse our complete collection of products'}
            </p>
            {selectedCategory !== 'all' && (
              <p className="text-blue-100 mt-2">
                Found {filteredProducts.length} products in this category
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Categories Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {Object.entries(categories).map(([key, cat]) => (
                <Link
                  key={key}
                  to={key === 'all' ? '/shop' : `/shop?cat=${key}`}
                  className={`p-3 rounded-lg text-center transition-all group ${
                    selectedCategory === key 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${selectedCategory === key ? 'text-white' : ''}`}>
                    {cat.icon}
                  </div>
                  <div className={`text-sm font-medium ${selectedCategory === key ? 'text-white' : 'text-gray-700'}`}>
                    {cat.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Products Display */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {categories[selectedCategory]?.name || 'Products'}
              </h2>
              <span className="text-gray-500 text-sm">{filteredProducts.length} items</span>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={product.image || '/api/placeholder/300/300'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-blue-600 font-bold text-lg">${product.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600">{product.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 text-lg">No products found in this category</p>
                <Link to="/shop" className="text-blue-600 hover:underline mt-4 inline-block">
                  Browse all products →
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

export default AllProducts