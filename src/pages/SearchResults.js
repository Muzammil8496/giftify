// // src/pages/SearchResults.jsx
// import React, { useEffect, useState } from 'react'
// import { useSearchParams, Link } from 'react-router-dom'

// const SearchResults = () => {
//   const [searchParams] = useSearchParams()
//   const query = searchParams.get('q')
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (query) {
//       setLoading(true)
      
//       // Temporary products data (aap apni actual products se replace karein)
//       const allProducts = [
//         { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
//         { id: 2, name: 'Mobile Phone', category: 'Electronics', price: 599 },
//         { id: 3, name: 'Shirt', category: 'Clothing', price: 29 },
//         { id: 4, name: 'Jeans', category: 'Clothing', price: 49 },
//         { id: 5, name: 'Headphones', category: 'Electronics', price: 89 },
//       ]
      
//       const filtered = allProducts.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       )
      
//       setProducts(filtered)
//       setLoading(false)
//     }
//   }, [query])

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">
//         Search Results for: "{query}"
//       </h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length > 0 ? (
//         <>
//           <p className="text-gray-600 mb-6">Found {products.length} products</p>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map(product => (
//               <Link key={product.id} to={`/product/${product.id}`} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
//                 <div className="font-semibold text-lg">{product.name}</div>
//                 <div className="text-gray-600 text-sm">{product.category}</div>
//                 <div className="text-blue-600 font-bold mt-2">${product.price}</div>
//               </Link>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found for "{query}"</p>
//           <Link to="/shop" className="text-blue-600 hover:underline mt-4 inline-block">
//             Browse all products →
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SearchResults