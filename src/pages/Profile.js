import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useAuth } from '../context/AuthContext'
import API from '../api/client'

const Profile = () => {
  const { user, logout, setUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const { data } = await API.put('/auth/profile', form)
      setUser(data.user)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-xl font-bold">Account Details</h2>
              <div className="mt-4 space-y-4">
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                <button onClick={save} disabled={saving} className="rounded-xl bg-gray-950 px-5 py-3 font-semibold text-white">
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </section>
            <aside className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Quick Links</h2>
              <div className="mt-4 space-y-3 text-sm">
                <Link to="/orders" className="block text-blue-600">My Orders</Link>
                <Link to="/wishlist" className="block text-blue-600">Wishlist</Link>
                <button onClick={logout} className="block text-left text-red-500">Logout</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile