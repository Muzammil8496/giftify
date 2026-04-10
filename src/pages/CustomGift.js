import React, { useEffect, useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import API from '../api/client'
import { useCart } from '../context/CartContext'

const CustomGift = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data.products || []))
      .catch(() => setProducts([]))
  }, [])

  const add = (p) =>
    setSelected((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, { ...p, quantity: 1 }]))

  const remove = (id) => setSelected((prev) => prev.filter((p) => p.id !== id))
  const total = selected.reduce((s, i) => s + Number(i.price), 0)

  const addBundle = async () => {
    const bundle = {
      id: `custom-${Date.now()}`,
      name: name || 'Custom Gift Bundle',
      price: total,
      category: 'Custom Gift',
      image: selected[0]?.image,
      isGift: true,
      includes: selected.map((i) => i.name),
      giftMessage: message,
    }
    await addToCart(bundle, 1)
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Custom Gift Builder</h1>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.slice(0, 12).map((p) => (
                  <div key={p.id} className="relative">
                    <ProductCard product={p} onQuickView={add} />
                    <button onClick={() => add(p)} className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Your Bundle</h2>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bundle name" className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Gift message" className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3" />
              <div className="mt-4 space-y-2 text-sm">
                {selected.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.name}</span>
                    <button onClick={() => remove(i.id)} className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t pt-4 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={addBundle} disabled={!selected.length} className="mt-6 w-full rounded-xl bg-gray-950 py-3 font-semibold text-white disabled:opacity-50">
                Add Bundle to Cart
              </button>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CustomGift