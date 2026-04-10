import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Gift, ArrowRight, Sparkles } from 'lucide-react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import API from '../api/client'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()

  const [products, setProducts] = useState([])
  const [bundles, setBundles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!query) {
        setProducts([])
        setBundles([])
        return
      }

      setLoading(true)
      try {
        const [pRes, bRes] = await Promise.all([
          API.get('/products', { params: { q: query } }).catch(() => ({ data: { products: [] } })),
          API.get('/custom-gifts').catch(() => ({ data: { bundles: [] } })),
        ])

        const p = pRes.data.products || []
        const b = (bRes.data.bundles || []).filter((item) => {
          const text = `${item.name || ''} ${item.description || ''} ${item.category || ''}`.toLowerCase()
          return text.includes(query.toLowerCase())
        })

        setProducts(p)
        setBundles(b)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [query])

  const totalResults = useMemo(() => products.length + bundles.length, [products.length, bundles.length])

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-gray-950 via-[#1a0a20] to-gray-950 py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <Search size={16} />
              Search Results
            </div>
            <h1 className="mt-4 text-4xl font-bold">
              Results for “{query || '...'}”
            </h1>
            <p className="mt-3 text-gray-300">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {!query ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Sparkles size={48} className="mx-auto text-pink-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Search for gifts and products</h2>
              <p className="mt-2 text-gray-500">Use the search bar to find perfumes, watches, shoes, bundles, and more.</p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white"
              >
                Browse Shop <ArrowRight size={16} />
              </Link>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-80 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : totalResults > 0 ? (
            <div className="space-y-10">
              {products.length > 0 && (
                <section>
                  <div className="mb-5 flex items-center gap-2">
                    <Gift size={20} className="text-[#ff5f8f]" />
                    <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {bundles.length > 0 && (
                <section>
                  <div className="mb-5 flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Gift Bundles</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {bundles.map((gift) => (
                      <div key={gift.id} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">
                        <Link to={`/product/${gift.id}`}>
                          <img
                            src={gift.image}
                            alt={gift.name}
                            className="h-56 w-full object-cover"
                          />
                        </Link>
                        <div className="p-4">
                          <Link to={`/product/${gift.id}`}>
                            <h3 className="line-clamp-2 font-semibold text-gray-900 hover:text-purple-600">
                              {gift.name}
                            </h3>
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">{gift.description}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-purple-600">
                              ${Number(gift.price).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {gift.category || 'Gift'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Search size={48} className="mx-auto text-gray-300" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">No results found</h2>
              <p className="mt-2 text-gray-500">
                Try a different keyword or browse our categories.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white"
              >
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SearchResults