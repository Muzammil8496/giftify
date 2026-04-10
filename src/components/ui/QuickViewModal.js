import React from 'react'
import { X, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  if (!product) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <img src={product.image} alt={product.name} className="aspect-square w-full rounded-2xl object-cover" />
          <div>
            <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
              {product.category}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">{product.name}</h2>
            <p className="mt-4 text-gray-600">
              {product.description || 'A beautiful product from the Giftify collection.'}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-black text-gray-950">${Number(product.price).toFixed(2)}</span>
              {product.oldPrice ? (
                <span className="text-lg text-gray-400 line-through">${Number(product.oldPrice).toFixed(2)}</span>
              ) : null}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => addToCart(product, 1)} className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-3 font-semibold text-white">
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 font-semibold text-gray-800">
                <Heart size={16} className={isInWishlist(product.id) ? 'fill-current text-pink-500' : ''} /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal