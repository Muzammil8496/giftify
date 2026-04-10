import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, User, Menu, X, ChevronDown,
  Gift, Heart, ArrowRight, LogOut, Settings,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// ─── Logout Confirmation Modal ───────────────────────────────────────────────

const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 mx-auto">
        <LogOut size={22} className="text-red-500" />
      </div>
      <h3 className="mt-4 text-center text-lg font-bold text-gray-900">Logout?</h3>
      <p className="mt-1 text-center text-sm text-gray-500">
        Are you sure you want to logout from your account?
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          Yes, Logout
        </button>
      </div>
    </div>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
      if (e.key === 'Escape') { setActiveDropdown(null); setIsMenuOpen(false); }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || showLogoutModal) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, showLogoutModal]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery('');
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    setActiveDropdown(null);
    navigate('/');
  };

  // User initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

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
                    <ArrowRight size={12} className="-ml-0.5 opacity-0 transition-all group-hover:ml-0.5 group-hover:opacity-100" />
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

  // ─── User Dropdown ───────────────────────────────────────────────────────────
  const renderUserDropdown = () => (
    <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-gray-100 bg-white shadow-2xl py-2">
      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Account'}</p>
        <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
      </div>
      {/* Links */}
      <Link
        to="/profile"
        onClick={() => setActiveDropdown(null)}
        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Settings size={14} className="text-gray-400" />
        My Profile
      </Link>
      <button
        onClick={() => { setActiveDropdown(null); setShowLogoutModal(true); }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut size={14} />
        Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

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
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeDropdown === item.name &&
                      (item.name === 'Shop' ? renderDropdown(shopDropdown) : renderDropdown(giftDropdown))}
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

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
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

            {/* Auth — desktop */}
            <div className="hidden items-center sm:flex">
              {isLoggedIn ? (
                // ── Profile button with dropdown ──────────────────────────────
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1.5 transition-all hover:border-gray-300 hover:bg-gray-50"
                  >
                    {/* Avatar circle */}
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white text-xs font-bold">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="avatar" className="h-full w-full rounded-lg object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <span className="max-w-[80px] truncate text-sm font-medium text-gray-700">
                      {user?.name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-gray-400 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {activeDropdown === 'user' && renderUserDropdown()}
                </div>
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
                  {/* Mobile user info */}
                  <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white text-sm font-bold shrink-0">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="avatar" className="h-full w-full rounded-xl object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'Account'}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">{user?.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Settings size={14} className="text-gray-400" />
                    My Profile
                  </Link>

                  <button
                    onClick={() => { setIsMenuOpen(false); setShowLogoutModal(true); }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={14} />
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
    </>
  );
};

export default Navbar;
