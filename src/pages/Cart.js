import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, Gift } from 'lucide-react'

const Cart = () => {
  const { cart, cartCount, cartSubtotal, shippingFee, grandTotal, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  if (!cart.length) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <ShoppingBag size={48} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 font-semibold text-white">
              <Gift size={16} />Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-950">Your Cart ({cartCount})</h1>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.category}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-lg font-bold text-gray-950">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-950">Order Summary</h2>
              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="mt-6 w-full rounded-xl bg-gray-950 py-3 font-semibold text-white">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart