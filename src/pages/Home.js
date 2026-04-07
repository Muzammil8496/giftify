import React from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/Hero'
import TrendingSearch from '../components/home/TrendingSearch'
import FlashDeals from '../components/home/FlashDeals'
import TopVendors from '../components/home/TopVendors'
import ProductSection from '../components/home/ProductSection'
import Footer from '../components/layout/Footer'
import { products, getNewArrivals, getBestSellers, getRecommended } from '../data/products'
import { useCart } from '../context/CartContext'
// import AllProducts from './pages/AllProducts'

const Home = () => {
  const { cartCount } = useCart()
  
  return (
    <>
      <TopBar />
      <Navbar cartCount={cartCount} />
      <Hero />
      <TrendingSearch />
      <FlashDeals products={products} />
      <TopVendors />
      <ProductSection title="New Arrivals" products={getNewArrivals()} />
      <ProductSection title="Best Seller" products={getBestSellers()} />
      <ProductSection title="Recommended To You" products={getRecommended()} />
      <Footer />
    </>
  )
}

export default Home