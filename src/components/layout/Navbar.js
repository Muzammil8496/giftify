import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const shopDropdownRef = useRef(null)
  const giftDropdownRef = useRef(null)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasDropdown: true },
    { name: 'Gift Ideas', path: '/gifts', hasDropdown: true },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (giftDropdownRef.current && !giftDropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault()
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const toggleDropdown = (itemName) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(itemName)
    }
  }

  // For Shop - goes to /shop
  const handleShopNavigation = (path) => {
    setActiveDropdown(null)
    navigate(path)
  }

  // For Gift Ideas - goes to /gifts
  const handleGiftNavigation = (path) => {
    setActiveDropdown(null)
    navigate(path)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="text-2xl lg:text-3xl font-bold text-gray-800 flex-shrink-0">
            mekog.
          </Link>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  ref={
                    item.name === 'Shop' ? shopDropdownRef : 
                    item.name === 'Gift Ideas' ? giftDropdownRef : null
                  }
                >
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1 whitespace-nowrap focus:outline-none"
                    >
                      {item.name}
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* SHOP DROPDOWN - All Products goes to /shop */}
                  {item.name === 'Shop' && activeDropdown === item.name && (
                    <div className="fixed left-0 right-0 mt-0 bg-white shadow-xl border-t border-b border-gray-100 z-50">
                      <div className="container mx-auto px-4 py-5">
                        <div className="grid grid-cols-5 gap-6">
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🛋️ SOFAS</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleShopNavigation('/shop?cat=sofa-sets')} className="text-sm text-gray-600 hover:text-blue-600">Sofa Sets</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=sectional-sofas')} className="text-sm text-gray-600 hover:text-blue-600">Sectional Sofas</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=chesterfields')} className="text-sm text-gray-600 hover:text-blue-600">Chesterfields</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">💺 CHAIRS</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleShopNavigation('/shop?cat=sofa-chairs')} className="text-sm text-gray-600 hover:text-blue-600">Sofa Chairs</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=accent-chairs')} className="text-sm text-gray-600 hover:text-blue-600">Accent Chairs</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=rocking-chairs')} className="text-sm text-gray-600 hover:text-blue-600">Rocking Chairs</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🪑 TABLES</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleShopNavigation('/shop?cat=center-tables')} className="text-sm text-gray-600 hover:text-blue-600">Center Tables</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=coffee-tables')} className="text-sm text-gray-600 hover:text-blue-600">Coffee Tables</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=study-tables')} className="text-sm text-gray-600 hover:text-blue-600">Study Tables</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🗄️ STORAGE</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleShopNavigation('/shop?cat=tv-units')} className="text-sm text-gray-600 hover:text-blue-600">TV Units</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=bookshelves')} className="text-sm text-gray-600 hover:text-blue-600">Bookshelves</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🪑 MORE</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleShopNavigation('/shop?cat=ottomans')} className="text-sm text-gray-600 hover:text-blue-600">Ottomans</button></li>
                              <li><button onClick={() => handleShopNavigation('/shop?cat=benches')} className="text-sm text-gray-600 hover:text-blue-600">Benches</button></li>
                            </ul>
                          </div>
                        </div>

                        {/* SHOP - All Products Button */}
                        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                          <Link
                            to="/shop"
                            onClick={() => setActiveDropdown(null)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                          >
                            🛍️ View All Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* GIFT IDEAS DROPDOWN - All Gifts goes to /gifts */}
                  {item.name === 'Gift Ideas' && activeDropdown === item.name && (
                    <div className="fixed left-0 right-0 mt-0 bg-white shadow-xl border-t border-b border-gray-100 z-50">
                      <div className="container mx-auto px-4 py-5">
                        <div className="grid grid-cols-5 gap-6">
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🎂 By Occasion</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=birthday')} className="text-sm text-gray-600 hover:text-pink-600">Birthday Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=anniversary')} className="text-sm text-gray-600 hover:text-pink-600">Anniversary Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=wedding')} className="text-sm text-gray-600 hover:text-pink-600">Wedding Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=graduation')} className="text-sm text-gray-600 hover:text-pink-600">Graduation Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=christmas')} className="text-sm text-gray-600 hover:text-pink-600">Christmas Gifts</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">👥 By Recipient</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=for-her')} className="text-sm text-gray-600 hover:text-pink-600">Gifts for Her</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=for-him')} className="text-sm text-gray-600 hover:text-pink-600">Gifts for Him</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=for-kids')} className="text-sm text-gray-600 hover:text-pink-600">Gifts for Kids</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">💰 By Price</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=under-25')} className="text-sm text-gray-600 hover:text-pink-600">Under $25</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=25-50')} className="text-sm text-gray-600 hover:text-pink-600">$25 - $50</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=50-100')} className="text-sm text-gray-600 hover:text-pink-600">$50 - $100</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=above-100')} className="text-sm text-gray-600 hover:text-pink-600">$100+</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">🔥 Trending</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=personalized')} className="text-sm text-gray-600 hover:text-pink-600">Personalized Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=luxury')} className="text-sm text-gray-600 hover:text-pink-600">Luxury Gifts</button></li>
                              <li><button onClick={() => handleGiftNavigation('/gifts?cat=eco-friendly')} className="text-sm text-gray-600 hover:text-pink-600">Eco-Friendly Gifts</button></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">⚡ Quick Links</h3>
                            <ul className="space-y-1.5">
                              <li><button onClick={() => handleGiftNavigation('/gift-cards')} className="text-sm text-gray-600 hover:text-pink-600">Gift Cards</button></li>
                              <li><button onClick={() => handleGiftNavigation('/wishlist')} className="text-sm text-gray-600 hover:text-pink-600">Wishlist</button></li>
                            </ul>
                          </div>
                        </div>

                        {/* GIFT IDEAS - All Gifts Button */}
                        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                          <Link
                            to="/gifts"
                            onClick={() => setActiveDropdown(null)}
                            className="text-pink-600 hover:text-pink-800 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                          >
                            🎁 View All Gifts
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative" ref={searchRef}>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:bg-gray-100 rounded-full">
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute top-1/2 right-full mr-2 transform -translate-y-1/2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search products..."
                    className="w-64 px-4 py-2 border border-blue-500 rounded-lg focus:outline-none text-sm bg-white shadow-lg"
                    autoFocus
                  />
                </div>
              )}
            </div>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button onClick={() => toggleDropdown(item.name)} className="w-full flex items-center justify-between py-3">
                      {item.name} <ChevronDown size={16} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 py-2">
                        {item.name === 'Shop' ? (
                          <Link to="/shop" className="block py-2 text-blue-600">🛍️ All Products</Link>
                        ) : (
                          <Link to="/gifts" className="block py-2 text-pink-600">🎁 All Gifts</Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} className="block py-3" onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar