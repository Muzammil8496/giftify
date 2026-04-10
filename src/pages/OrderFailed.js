import React from 'react'
import { Link } from 'react-router-dom'

const OrderFailed = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
      <h1 className="text-3xl font-bold text-red-600">Order Failed</h1>
      <p className="mt-3 text-gray-600">Please try again or choose another payment method.</p>
      <Link to="/checkout" className="mt-6 inline-flex rounded-full bg-gray-950 px-6 py-3 font-semibold text-white">
        Back to Checkout
      </Link>
    </div>
  </div>
)

export default OrderFailed