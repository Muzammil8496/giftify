import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Gift, Sparkles, Star, Filter, ArrowRight } from 'lucide-react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import API from '../api/client'
import { useCart } from '../context/CartContext'

const giftCategories = {
  all: { name: 'All Gifts', icon: '🎁', description: 'Find the perfect gift for every occasion' },
  birthday: { name: 'Birthday Gifts', icon: '🎂', description: 'Celebrate with amazing birthday gifts' },
  anniversary: { name: 'Anniversary Gifts', icon: '💝', description: 'Romantic gifts for your loved one' },
  wedding: { name: 'Wedding Gifts', icon: '💍', description: 'Perfect wedding presents' },
  graduation: { name: 'Graduation Gifts', icon: '🎓', description: 'Celebrate achievements' },
  christmas: { name: 'Christmas Gifts', icon: '🎄', description: 'Holiday special gifts' },
  'for-her': { name: 'Gifts for Her', icon: '👩', description: 'Thoughtful gifts for women' },
  'for-him': { name: 'Gifts for Him', icon: '👨', description: 'Awesome gifts for men' },
  'for-kids': { name: 'Gifts for Kids', icon: '🧒', description: 'Fun gifts for children' },
  personalized: { name: 'Personalized Gifts', icon: '🎨', description: 'Unique custom gifts' },
  luxury: { name: 'Luxury Gifts', icon: '👑', description: 'Premium gift collection' },
  'eco-friendly': { name: 'Eco-Friendly Gifts', icon: '🌱', description: 'Sustainable gift options' },
}

const AllGifts = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('cat') || 'all'
  const { addToCart } = useCart()

  const [bundles, setBundles] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await API.get('/custom-gifts').catch(() => null)
        const data = res?.data?.bundles || res?.data?.giftBundles || []
        setBundles(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filteredGifts = useMemo(() => {
    const current = category === 'all'
      ? bundles
      : bundles.filter((gift) => {
          const giftCat = (gift.category || gift.tag || '').toLowerCase()
          return giftCat === category.toLowerCase() || gift.tags?.includes(category.toLowerCase())
        })

    const sorted = [...current]
    if (sortBy === 'lowToHigh') sorted.sort((a, b) => Number(a.price) - Number(b.price))
    else if (sortBy === 'highToLow') sorted.sort((a, b) => Number(b.price) - Number(a.price))
    else if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    else sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))

    return sorted
  }, [bundles, category, sortBy])

  const handleAdd = async (gift) => {
    await addToCart(
      {
        id: gift.id,
        name: gift.name,
        price: Number(gift.price),
        oldPrice: gift.oldPrice,
        category: gift.category || 'Gift Bundle',
        image: gift.image,
        isGift: true,
        includes: gift.includes || [],
      },
      1
    )
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <Sparkles size={16} />
              Gift Collections
            </div>
            <h1 className="mt-4 text-4xl font-bold">
              {giftCategories[category]?.name || 'All Gifts'}
            </h1>
            <p className="mt-3 max-w-2xl text-pink-100 text-lg">
              {giftCategories[category]?.description || 'Find the perfect gift for your loved ones'}
            </p>
            {category !== 'all' && (
              <p className="mt-3 text-pink-100">
                Found {filteredGifts.length} amazing gifts
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={16} />
              Filter & Sort
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {Object.entries(giftCategories).map(([key, cat]) => (
                  <Link
                    key={key}
                    to={key === 'all' ? '/gifts' : `/gifts?cat=${key}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      category === key
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-pink-400 hover:text-pink-600'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="mb-8 rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold">🎉 Special Gift Season!</h3>
                <p className="text-yellow-100">
                  Get up to 40% off on selected gifts. Free shipping on orders over $50
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-orange-600 transition hover:shadow-lg"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {giftCategories[category]?.name || 'All Gifts'}
            </h2>
            <span className="text-sm text-gray-500">{filteredGifts.length} items</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-80 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
                >
                  <Link to={`/product/${gift.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {gift.isTrending && (
                        <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-2 py-1 text-xs font-semibold text-white">
                          Trending
                        </span>
                      )}
                      <span className="absolute right-3 top-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
                        Gift
                      </span>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${gift.id}`}>
                      <h3 className="line-clamp-2 min-h-[48px] font-semibold text-gray-800 transition group-hover:text-pink-600">
                        {gift.name}
                      </h3>
                    </Link>

                    <p className="mt-1 text-sm text-gray-500 capitalize">
                      {gift.category || 'Gift'}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-pink-600">
                        ${Number(gift.price).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{gift.rating || 4.8}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleAdd(gift)}
                        className="flex-1 rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${gift.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-pink-400 hover:text-pink-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white py-16 text-center shadow-sm">
              <Gift size={48} className="mx-auto text-gray-300" />
              <p className="mt-4 text-lg text-gray-500">No gifts found in this category</p>
              <Link to="/gifts" className="mt-4 inline-block font-semibold text-pink-600 hover:underline">
                Browse all gifts
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AllGifts