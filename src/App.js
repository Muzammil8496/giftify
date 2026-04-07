// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import AllGifts from './pages/AllGifts'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<AllProducts />} />
          <Route path="/gifts" element={<AllGifts />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App