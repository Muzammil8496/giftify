import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, Package, Check } from 'lucide-react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import API from '../api/client'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const load = async () => {
      const [p, r] = await Promise.all([
        API.get(`/products/${id}`).catch(() => ({ data: { product: null } })),
        API.get(`/products/${id}/related`).catch(() => ({ data: { products: [] } })),
      ])
      setProduct(p.data.product)
      setRelated(r.data.products || [])
      window.scrollTo(0, 0)
    }
    load()
  }, [id])

  if (!product) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">Product not found</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 text-sm text-gray-500">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid gap-12 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:grid-cols-2">
            <div className="relative">
              <img src={product.image} alt={product.name} className="aspect-square w-full rounded-2xl object-cover" />
              {product.discount ? (
                <div className="absolute left-4 top-4 rounded-full bg-[#ff5f8f] px-3 py-1.5 text-sm font-bold text-white">
                  -{product.discount}%
                </div>
              ) : null}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${isInWishlist(product.id) ? 'bg-[#ff5f8f] text-white' : 'bg-white text-gray-700'}`}
              >
                <Heart size={20} />
              </button>
            </div>

            <div>
              <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                {product.category?.name || product.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-gray-950">{product.name}</h1>
              <p className="mt-4 text-gray-600">
                {product.description || 'Premium gift product from the Giftify collection.'}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <span className="text-4xl font-black text-gray-950">${Number(product.price).toFixed(2)}</span>
                {product.oldPrice ? (
                  <span className="text-xl text-gray-400 line-through">${Number(product.oldPrice).toFixed(2)}</span>
                ) : null}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => setQty((v) => Math.max(1, v - 1))} className="rounded-full border p-3">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty((v) => v + 1)} className="rounded-full border p-3">
                  <Plus size={16} />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => addToCart(product, qty)} className="rounded-full bg-gray-950 px-6 py-3 font-semibold text-white">
                  Add to Cart
                </button>
                <Link to="/custom-gift" className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800">
                  Custom Gift
                </Link>
              </div>

              <div className="mt-8 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Package size={16} className="text-[#ff8b5c]" />Related details
                </div>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-500" />Secure checkout available</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-500" />Guest checkout supported</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-500" />Fast delivery options</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-950">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetail