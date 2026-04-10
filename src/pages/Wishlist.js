import React from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart()

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold">Wishlist</h1>
          {!wishlist.length ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">No items saved yet.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <img src={p.image} alt={p.name} className="h-56 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.category}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => addToCart(p, 1)} className="rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white">
                        Add to Cart
                      </button>
                      <button onClick={() => toggleWishlist(p)} className="rounded-xl border px-4 py-2 text-sm font-semibold">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Wishlist