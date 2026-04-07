import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { CartContext } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={product.image || `https://picsum.photos/id/${product.id * 10}/300/300`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <Eye size={18} />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button onClick={() => addToCart(product)} className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard