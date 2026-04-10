import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderSuccess = () => {
  const { state } = useLocation()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-green-600">Order Placed!</h1>
        <p className="mt-3 text-gray-600">Your order has been placed successfully.</p>
        {state?.order ? <p className="mt-4 text-sm text-gray-500">Order ID: {state.order.id}</p> : null}
        <Link to="/" className="mt-6 inline-flex rounded-full bg-gray-950 px-6 py-3 font-semibold text-white">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess