import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/profile')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Register</h1>
        {error ? <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}
        <div className="mt-6 space-y-4">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none" />
          <button className="w-full rounded-xl bg-gray-950 py-3 font-semibold text-white">Create Account</button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register