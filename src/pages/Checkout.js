import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import API from '../api/client'

const Checkout = () => {
  const { cart, cartSubtotal, shippingFee, grandTotal, clearCart, coupon, couponDiscount, applyCoupon, removeCoupon } = useCart()
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [placing, setPlacing] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')?.[0] || '',
    lastName: user?.name?.split(' ')?.slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: 'Lahore',
    country: 'Pakistan',
    zip: '',
    paymentMethod: 'cod',
    giftMessage: '',
    recipientName: '',
    wrappingStyle: 'standard',
  })

  if (!cart.length) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Your cart is empty</div>
        <Footer />
      </>
    )
  }

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onApplyCoupon = async () => {
    try {
      await applyCoupon(couponCode)
    } catch {
      // handled by backend error response
    }
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    setPlacing(true)
    try {
      const payload = {
        customerName: `${form.firstName} ${form.lastName}`.trim(),
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: `${form.address}, ${form.city}, ${form.country} ${form.zip}`,
        giftMessage: form.giftMessage,
        wrappingStyle: form.wrappingStyle,
        paymentMethod: form.paymentMethod,
      }
      const { data } = await API.post('/orders', payload)
      await clearCart()
      navigate('/order-success', { state: { order: data.order } })
    } catch {
      navigate('/order-failed')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-950">Checkout</h1>

          <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Shipping Information</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ['firstName', 'First Name'],
                    ['lastName', 'Last Name'],
                    ['email', 'Email', 'email'],
                    ['phone', 'Phone'],
                    ['address', 'Address', 'text', true],
                    ['city', 'City'],
                    ['zip', 'ZIP Code'],
                  ].map(([key, label, type, full]) => (
                    <div key={key} className={full ? 'sm:col-span-2' : ''}>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-600">{label}</label>
                      <input
                        required
                        type={type || 'text'}
                        value={form[key]}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ff5f8f]"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ff5f8f]"
                    >
                      <option>Pakistan</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>UAE</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Gift Options</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">Recipient Name</label>
                    <input value={form.recipientName} onChange={(e) => update('recipientName', e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">Wrapping Style</label>
                    <select
                      value={form.wrappingStyle}
                      onChange={(e) => update('wrappingStyle', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                    >
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">Gift Message</label>
                    <textarea
                      value={form.giftMessage}
                      onChange={(e) => update('giftMessage', e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Payment Method</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['cod', 'card', 'jazzcash', 'easypaisa'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => update('paymentMethod', m)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        form.paymentMethod === m ? 'bg-gray-950 text-white' : 'border border-gray-300 text-gray-700'
                      }`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-950">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                {coupon ? (
                  <div className="flex justify-between">
                    <span>Coupon ({coupon.code})</span>
                    <span>- ${couponDiscount.toFixed(2)}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                />
                <button type="button" onClick={onApplyCoupon} className="rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white">
                  Apply
                </button>
              </div>

              {coupon ? (
                <button type="button" onClick={removeCoupon} className="mt-2 text-sm font-semibold text-red-500">
                  Remove coupon
                </button>
              ) : null}

              <div className="mt-5 border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <button
                disabled={placing}
                type="submit"
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] py-3 font-semibold text-white disabled:opacity-60"
              >
                {placing ? 'Placing Order...' : isLoggedIn ? 'Place Order' : 'Continue as Guest'}
              </button>
            </aside>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout