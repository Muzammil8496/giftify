import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Gift,
  ShoppingBag,
  Star,
  Tag,
} from 'lucide-react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Hero, FlashDeals, ProductSection, TrendingSearch } from '../components/home/HomeComponents'
import API from '../api/client'

const serviceCards = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Safe checkout for every order.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Quick shipping across locations.',
  },
  {
    icon: Heart,
    title: 'Loved by Customers',
    desc: 'Premium gifting made simple.',
  },
  {
    icon: Sparkles,
    title: 'Custom Gifts',
    desc: 'Build your own gift bundle.',
  },
]

const categoryLinks = [
  { label: 'Perfume', to: '/shop?cat=perfume', icon: '🌸' },
  { label: 'Watches', to: '/shop?cat=watches', icon: '⌚' },
  { label: 'Shoes', to: '/shop?cat=shoes', icon: '👟' },
  { label: 'Dresses', to: '/shop?cat=dresses', icon: '👗' },
  { label: 'Jewelry', to: '/shop?cat=jewelry', icon: '💎' },
  { label: 'Gift Bundles', to: '/gifts', icon: '🎁' },
]

const fallbackProducts = [
  {
    id: 'fb1',
    name: 'Premium Perfume Gift Set',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop',
    category: 'Perfume',
    flashDeal: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
  },
  {
    id: 'fb2',
    name: 'Luxury Watch Collection',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop',
    category: 'Watches',
    isBestSeller: true,
    rating: 4.9,
  },
  {
    id: 'fb3',
    name: 'Elegant Gift Shoes',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
    category: 'Shoes',
    isNew: true,
    rating: 4.7,
  },
  {
    id: 'fb4',
    name: 'Designer Gift Bundle',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop',
    category: 'Gift Bundle',
    flashDeal: true,
    rating: 4.9,
  },
]

const Home = () => {
  const [flashDeals, setFlashDeals] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [giftBundles, setGiftBundles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [p1, p2, p3] = await Promise.all([
          API.get('/products', { params: { filter: 'trending' } }).catch(() => ({ data: { products: [] } })),
          API.get('/products', { params: { filter: 'new' } }).catch(() => ({ data: { products: [] } })),
          API.get('/products', { params: { filter: 'bestseller' } }).catch(() => ({ data: { products: [] } })),
        ])

        const giftsResponse = await API.get('/custom-gifts').catch(() => ({ data: { bundles: [] } }))

        const trending = p1.data.products || []
        const fresh = p2.data.products || []
        const best = p3.data.products || []
        const bundles = giftsResponse.data.bundles || giftsResponse.data.giftBundles || []

        setFlashDeals(trending.length ? trending : fallbackProducts.filter((p) => p.flashDeal))
        setNewArrivals(fresh.length ? fresh : fallbackProducts.filter((p) => p.isNew))
        setBestSellers(best.length ? best : fallbackProducts.filter((p) => p.isBestSeller))
        setGiftBundles(Array.isArray(bundles) && bundles.length ? bundles : fallbackProducts.slice(0, 4))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const stats = useMemo(
    () => [
      { value: '10K+', label: 'Happy Customers' },
      { value: '500+', label: 'Gift Items' },
      { value: '24/7', label: 'Support' },
      { value: 'Fast', label: 'Delivery' },
    ],
    []
  )

  return (
    <>
      <TopBar />
      <Navbar />

      <Hero />

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <TrendingSearch />

      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-black text-gray-950">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Shop by Category</h2>
              <p className="mt-1 text-sm text-gray-500">Quick access to popular product groups</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff5f8f] transition hover:text-[#ff8b5c]"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categoryLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-[#ff5f8f]">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                <Tag size={14} />
                Special Offers
              </div>
              <h2 className="mt-4 text-3xl font-bold">Create your perfect gift bundle today</h2>
              <p className="mt-2 max-w-2xl text-white/80">
                Choose products, wrap them beautifully, add a message, and send them as one premium gift.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/custom-gift"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-950 shadow-lg transition hover:scale-[1.02]"
              >
                <Gift size={16} />
                Build Gift
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <ShoppingBag size={16} />
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <FlashDeals products={flashDeals} />
          <ProductSection
            title="New Arrivals"
            products={newArrivals}
            viewAllLink="/shop?filter=new"
            subtitle="Fresh arrivals, just for you"
          />
          <ProductSection
            title="Gift Bundles"
            products={giftBundles}
            viewAllLink="/gifts"
            subtitle="Curated for every occasion"
          />
          <ProductSection
            title="Best Sellers"
            products={bestSellers}
            viewAllLink="/shop?filter=bestseller"
            subtitle="Most loved by our customers"
          />
        </>
      )}

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-950">Why customers choose Giftify</h2>
                <p className="mt-2 text-gray-500">
                  Premium products, curated gift bundles, guest checkout, and account benefits for returning customers.
                </p>
              </div>
              <div className="flex items-center justify-start lg:justify-end">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Login / Register
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home