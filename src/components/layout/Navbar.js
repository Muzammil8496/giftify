import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Gift,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef(null);
  const navigate = useNavigate();

  const { cartCount, wishlist } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    const onEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery('');
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasDropdown: true },
    { name: 'Gift Ideas', path: '/gifts', hasDropdown: true },
    { name: 'Custom Gift', path: '/custom-gift' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const shopDropdown = [
    {
      title: 'Gift Categories',
      items: [
        { label: 'All Gifts', path: '/gifts' },
        { label: 'Birthday Gifts', path: '/gifts?cat=birthday' },
        { label: 'Anniversary Gifts', path: '/gifts?cat=anniversary' },
        { label: 'Wedding Gifts', path: '/gifts?cat=wedding' },
      ],
    },
    {
      title: 'Popular Picks',
      items: [
        { label: 'Perfume', path: '/shop?cat=perfume' },
        { label: 'Watches', path: '/shop?cat=watches' },
        { label: 'Shoes', path: '/shop?cat=shoes' },
        { label: 'Accessories', path: '/shop?cat=accessories' },
      ],
    },
    {
      title: 'By Budget',
      items: [
        { label: 'Under $25', path: '/gifts?cat=under-25' },
        { label: '$25 - $50', path: '/gifts?cat=25-50' },
        { label: '$50 - $100', path: '/gifts?cat=50-100' },
        { label: '$100+', path: '/gifts?cat=above-100' },
      ],
    },
    {
      title: 'Trending',
      items: [
        { label: 'Personalized Gifts', path: '/gifts?cat=personalized' },
        { label: 'Luxury Gifts', path: '/gifts?cat=luxury' },
        { label: 'Eco-Friendly Gifts', path: '/gifts?cat=eco-friendly' },
        { label: 'Best Sellers', path: '/shop?filter=bestseller' },
      ],
    },
  ];

  const giftDropdown = [
    {
      title: 'By Occasion',
      items: [
        { label: 'Birthday Gifts', path: '/gifts?cat=birthday' },
        { label: 'Anniversary Gifts', path: '/gifts?cat=anniversary' },
        { label: 'Wedding Gifts', path: '/gifts?cat=wedding' },
        { label: 'Graduation Gifts', path: '/gifts?cat=graduation' },
      ],
    },
    {
      title: 'For Recipient',
      items: [
        { label: 'Gifts for Her', path: '/gifts?cat=for-her' },
        { label: 'Gifts for Him', path: '/gifts?cat=for-him' },
        { label: 'Gifts for Kids', path: '/gifts?cat=for-kids' },
        { label: 'Family Gifts', path: '/gifts?cat=family' },
      ],
    },
    {
      title: 'Style Picks',
      items: [
        { label: 'Minimal', path: '/gifts?cat=minimal' },
        { label: 'Premium', path: '/gifts?cat=premium' },
        { label: 'Traditional', path: '/gifts?cat=traditional' },
        { label: 'Modern', path: '/gifts?cat=modern' },
      ],
    },
    {
      title: 'Quick Links',
      items: [
        { label: 'Wishlist', path: '/wishlist' },
        { label: 'Gift Ideas', path: '/gifts' },
        { label: 'All Products', path: '/shop' },
        { label: 'Custom Gift', path: '/custom-gift' },
      ],
    },
  ];

  const renderDropdown = (menus) => (
    <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2">
      <div className="grid gap-8 p-6 lg:grid-cols-4">
        {menus.map((group) => (
          <div key={group.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.title}
            </h4>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-900"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <ArrowRight
                      size={12}
                      className="-ml-0.5 opacity-0 transition-all group-hover:ml-0.5 group-hover:opacity-100"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-4 pt-3 pb-0">
      <nav
        ref={navRef}
        className="flex h-16 items-center justify-between gap-6 rounded-2xl bg-white px-7 shadow-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 via-orange-400 to-purple-500 text-white shadow-md transition-transform hover:scale-105">
            <Gift size={18} />
          </div>
          <span className="font-display text-[18px] font-bold tracking-tight text-gray-950">
            giftify.
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.name ? null : item.name)
                    }
                    className="inline-flex items-center gap-1 text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeDropdown === item.name &&
                    (item.name === 'Shop'
                      ? renderDropdown(shopDropdown)
                      : renderDropdown(giftDropdown))}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Search + Cart + Wishlist + Auth */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 lg:flex"
          >
            <Search size={14} className="text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gifts..."
              className="w-36 bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400"
              >
                <X size={9} />
              </button>
            )}
          </form>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-all hover:border-gray-400"
            aria-label="Wishlist"
          >
            <Heart size={17} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-orange-400 px-1 text-[10px] font-bold text-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-all hover:border-gray-400"
            aria-label="Cart"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-orange-400 px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth buttons - desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                >
                  <User size={14} />
                  <span className="max-w-[100px] truncate">{user?.name || 'Account'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
              >
                <User size={14} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-all hover:border-gray-400 lg:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-md lg:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2"
          >
            <Search size={14} className="text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gifts..."
              className="w-full bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400"
            />
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-gray-100" />
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Wishlist
              {wishlist.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-orange-400 px-1.5 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div className="my-2 h-px bg-gray-100" />
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;