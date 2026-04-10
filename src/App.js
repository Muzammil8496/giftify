import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AllGifts from './pages/AllGifts'
import AllProducts from './pages/AllProducts'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import CustomGift from './pages/CustomGift'
import OrderSuccess from './pages/OrderSuccess'
import OrderFailed from './pages/OrderFailed'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/gifts" element={<AllGifts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/custom-gift" element={<CustomGift />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/order-failed" element={<OrderFailed />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App