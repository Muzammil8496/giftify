import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import API from '../api/client'

const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('giftify_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('giftify_user', JSON.stringify(user))
    else localStorage.removeItem('giftify_user')
  }, [user])

  useEffect(() => {
    const loadMe = async () => {
      if (!token) return
      try {
        const { data } = await API.get('/auth/me')
        if (data?.user) setUser(data.user)
      } catch {
        setToken('')
        setUser(null)
      }
    }
    loadMe()
  }, [token])

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (payload) => {
    const { data } = await API.post('/auth/register', payload)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isLoggedIn: !!token,
      login,
      register,
      logout,
      setUser,
      setToken,
      setLoading,
    }),
    [user, token, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}