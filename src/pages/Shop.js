import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import API from '../api/client'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 500])

  const q = searchParams.get('q') || ''
  const cat = searchParams.get('cat') || ''
  const filter = searchParams.get('filter') || ''
  const min = searchParams.get('min') || priceRange[0]
  const max = searchParams.get('max') || priceRange[1]

  useEffect(() => {
    const load = async () => {
      const [p, c] = await Promise.all([
        API.get('/products', { params: { q, cat, filter, min, max } }).catch(() => ({ data: { products: [] } })),
        API.get('/categories').catch(() => ({ data: { categories: [] } })),
      ])
      setProducts(p.data.products || [])
      setCategories(c.data.categories || [])
    }

    load()
  }, [q, cat, filter, min, max])

  const filtered = useMemo(() => {
    const arr = [...products]
    if (sortBy === 'lowToHigh') arr.sort((a, b) => Number(a.price) - Number(b.price))
    else if (sortBy === 'highToLow') arr.sort((a, b) => Number(b.price) - Number(a.price))
    else if (sortBy === 'newest') arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    else arr.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    return arr
  }, [products, sortBy])

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-gray-950 via-[#1a0a20] to-gray-950 py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-gray-300 text-lg">{filtered.length} items available</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap gap-2">
            <Link to="/shop" className="rounded-full bg-white px-4 py-2 text-sm font-semibold border border-gray-200">All</Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?cat=${c.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold border border-gray-200 hover:border-[#ff5f8f]">
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none">
              <option value="popular">Most Popular</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            <div className="flex items-center gap-3 text-sm">
              <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-24 rounded-xl border border-gray-200 px-3 py-2" />
              <span>-</span>
              <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-24 rounded-xl border border-gray-200 px-3 py-2" />
              <Link
                to={`/shop?min=${priceRange[0]}&max=${priceRange[1]}${cat ? `&cat=${cat}` : ''}${filter ? `&filter=${filter}` : ''}`}
                className="rounded-xl bg-gray-950 px-4 py-2 font-semibold text-white"
              >
                Apply
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Shop