import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || `https://picsum.photos/id/${Number(product.id) * 10}/600/600`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
            -{product.discount}%
          </span>
        ) : null}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/35 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={() => onQuickView?.(product)} className="rounded-full bg-white p-2 transition hover:bg-gray-950 hover:text-white">
            <Eye size={18} />
          </button>
          <button onClick={() => toggleWishlist(product)} className="rounded-full bg-white p-2 transition hover:bg-pink-600 hover:text-white">
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button onClick={() => addToCart(product, 1)} className="rounded-full bg-white p-2 transition hover:bg-blue-600 hover:text-white">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="min-h-[56px] line-clamp-2 font-semibold text-gray-800 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">${Number(product.price).toFixed(2)}</span>
          {product.oldPrice ? (
            <span className="text-sm text-gray-400 line-through">${Number(product.oldPrice).toFixed(2)}</span>
          ) : null}
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-4 w-full rounded-xl bg-gray-100 py-2 font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard