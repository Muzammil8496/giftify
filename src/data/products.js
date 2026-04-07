export const products = [
  { id: 1, name: 'PlayStation VR Mega Pack', price: 299, oldPrice: 499, discount: 40, category: 'Gaming', flashDeal: true, isNew: true, rating: 4.8 },
  { id: 2, name: 'Wireless Noise Cancelling Headphones', price: 199, oldPrice: 299, discount: 33, category: 'Audio', flashDeal: true, rating: 4.7 },
  { id: 3, name: 'Smart Watch Ultra 2', price: 249, oldPrice: 399, discount: 37, category: 'Wearables', flashDeal: true, isNew: true, rating: 4.9 },
  { id: 4, name: 'Gaming Mechanical Keyboard RGB', price: 89, oldPrice: 149, discount: 40, category: 'Gaming', flashDeal: true, rating: 4.6 },
  { id: 5, name: '4K Action Camera', price: 179, oldPrice: 279, discount: 35, category: 'Camera', isNew: true, rating: 4.5 },
  { id: 6, name: 'Wireless Gaming Mouse', price: 59, category: 'Gaming', rating: 4.8 },
  { id: 7, name: 'Laptop Backpack', price: 49, oldPrice: 79, discount: 38, category: 'Accessories', rating: 4.4 },
  { id: 8, name: 'USB-C Hub 7-in-1', price: 39, category: 'Accessories', rating: 4.6 },
  { id: 9, name: 'Smart Home Speaker', price: 129, oldPrice: 199, discount: 35, category: 'Audio', isNew: true, rating: 4.7 },
  { id: 10, name: 'Fitness Tracker Band', price: 79, oldPrice: 129, discount: 38, category: 'Wearables', rating: 4.5 },
  { id: 11, name: 'Wireless Earbuds Pro', price: 149, oldPrice: 229, discount: 35, category: 'Audio', flashDeal: true, rating: 4.8 },
  { id: 12, name: 'Gaming Chair', price: 299, oldPrice: 499, discount: 40, category: 'Gaming', rating: 4.9 },
]

export const getNewArrivals = () => products.filter(p => p.isNew)
export const getBestSellers = () => products.filter(p => p.rating >= 4.7)
export const getRecommended = () => products.filter(p => p.flashDeal)