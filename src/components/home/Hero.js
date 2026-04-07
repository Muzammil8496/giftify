import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
      <div className="container-custom py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Limited Time Offer</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 leading-tight">
              PlayStation VR Mega
              <span className="text-blue-600"> Pack Bundle 3</span>
            </h1>
            <p className="text-gray-600 mt-6 text-lg">
              There are many variations passages of available, but the majority have suffered alteration some form, by injected humour.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold mt-8 hover:bg-blue-700 transition-all hover:gap-3"
            >
              Shop now <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/id/0/500/400"
              alt="PS VR Bundle"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-center font-bold">
              <span>-30% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero