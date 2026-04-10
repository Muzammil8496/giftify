import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import API from '../api/client'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

const safeJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth()
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const syncGuestStorage = (nextCart, nextWishlist) => {
    localStorage.setItem('giftify_guest_cart', JSON.stringify(nextCart || []))
    localStorage.setItem('giftify_guest_wishlist', JSON.stringify(nextWishlist || []))
  }

  const loadGuestState = () => {
    setCart(safeJSON('giftify_guest_cart', []))
    setWishlist(safeJSON('giftify_guest_wishlist', []))
  }

  const loadServerState = async () => {
    setLoading(true)
    try {
      const [cartRes, wishRes] = await Promise.all([
        API.get('/cart').catch(() => null),
        API.get('/wishlist').catch(() => null),
      ])

      const cartItems = cartRes?.data?.items || []
      const wishItems = wishRes?.data?.items || []

      const mappedCart = cartItems.map((item) => ({
        id: item.productId,
        cartItemId: item.id,
        name: item.Product?.name,
        price: Number(item.Product?.price || 0),
        oldPrice: item.Product?.oldPrice,
        category: item.Product?.Category?.name || item.Product?.category || '',
        image: item.Product?.image,
        quantity: item.quantity,
        product: item.Product,
      }))

      const mappedWishlist = wishItems.map((item) => ({
        id: item.productId,
        wishlistItemId: item.id,
        name: item.Product?.name,
        price: Number(item.Product?.price || 0),
        category: item.Product?.Category?.name || item.Product?.category || '',
        image: item.Product?.image,
        product: item.Product,
      }))

      setCart(mappedCart)
      setWishlist(mappedWishlist)
    } catch {
      loadGuestState()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) loadServerState()
    else loadGuestState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) syncGuestStorage(cart, wishlist)
  }, [cart, wishlist, isLoggedIn])

  const addToCart = async (product, quantity = 1) => {
    if (isLoggedIn) {
      const { data } = await API.post('/cart/items', {
        productId: product.id,
        quantity,
      })
      await loadServerState()
      return data
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = async (id) => {
    if (isLoggedIn) {
      const item = cart.find((i) => i.id === id)
      if (item?.cartItemId) await API.delete(`/cart/items/${item.cartItemId}`)
      await loadServerState()
      return
    }
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id)

    if (isLoggedIn) {
      const item = cart.find((i) => i.id === id)
      if (item?.cartItemId) await API.put(`/cart/items/${item.cartItemId}`, { quantity })
      await loadServerState()
      return
    }

    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = async () => {
    if (isLoggedIn) {
      await API.delete('/cart/clear').catch(() => null)
      await loadServerState()
      return
    }
    setCart([])
  }

  const toggleWishlist = async (product) => {
    if (isLoggedIn) {
      await API.post('/wishlist/toggle', { productId: product.id })
      await loadServerState()
      return
    }

    setWishlist((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.filter((i) => i.id !== product.id)
      return [...prev, product]
    })
  }

  const isInWishlist = (id) => wishlist.some((i) => i.id === id)

  const applyCoupon = async (code) => {
    setCouponError('')
    const trimmed = code.trim()
    if (!trimmed) {
      setCoupon(null)
      return null
    }
    const { data } = await API.get(`/coupons/${encodeURIComponent(trimmed)}`)
    setCoupon(data.coupon)
    return data.coupon
  }

  const removeCoupon = () => {
    setCoupon(null)
    setCouponError('')
  }

  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)
  const shippingFee = cartSubtotal >= 50 ? 0 : 9.99
  const couponDiscount = useMemo(() => {
    if (!coupon) return 0
    if (coupon.type === 'percentage') return (cartSubtotal * Number(coupon.value)) / 100
    return Number(coupon.value)
  }, [coupon, cartSubtotal])
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - couponDiscount)

  const value = {
    cart,
    wishlist,
    loading,
    cartCount,
    cartSubtotal,
    shippingFee,
    coupon,
    couponError,
    couponDiscount,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    applyCoupon,
    removeCoupon,
    setCouponError,
    reload: isLoggedIn ? loadServerState : loadGuestState,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}