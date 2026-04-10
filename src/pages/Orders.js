import React, { useEffect, useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import API from '../api/client'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    API.get('/orders/me')
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setOrders([]))
  }, [])

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Order #{o.id}</h3>
                    <p className="text-sm text-gray-500">{o.status}</p>
                  </div>
                  <span className="font-bold">${Number(o.total).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Orders