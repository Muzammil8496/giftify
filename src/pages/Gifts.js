import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { giftBundles, products } from '../data/products';
import { ArrowRight, Star, Package, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const occasions = ['All', 'Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Kids'];
const recipients = ['All', 'Her', 'Him', 'Kids', 'Couple'];
const styles = ['All', 'Luxury', 'Pakistani', 'Budget', 'Premium'];

const Gifts = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || 'All');
  const [forRecipient, setForRecipient] = useState(searchParams.get('for') ? searchParams.get('for').charAt(0).toUpperCase() + searchParams.get('for').slice(1) : 'All');
  const [styleFilter, setStyleFilter] = useState(searchParams.get('style') || 'All');
  const [filtered, setFiltered] = useState(giftBundles);

  useEffect(() => {
    let result = [...giftBundles];
    if (occasion !== 'All') result = result.filter(g => g.occasion === occasion || g.tags?.includes(occasion.toLowerCase()));
    if (forRecipient !== 'All') result = result.filter(g => g.tags?.includes(forRecipient.toLowerCase()));
    if (styleFilter !== 'All') result = result.filter(g => g.tags?.includes(styleFilter.toLowerCase()));
    setFiltered(result);
  }, [occasion, forRecipient, styleFilter]);

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="min-h-screen bg-[#fff7f5]">
        <div className="bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold mb-4"><Gift size={16} />Gift Bundles & Ideas</div>
            <h1 className="text-4xl font-bold mb-3">Find the Perfect Gift 🎁</h1>
            <p className="text-white/80 text-lg max-w-xl">Curated gift bundles for every occasion, recipient, and budget. Each bundle is thoughtfully put together.</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">By Occasion</label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map(o => <button key={o} onClick={() => setOccasion(o)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${occasion === o ? 'bg-gradient-to-r from-[#ff8b5c] to-[#ff5f8f] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o}</button>)}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">For</label>
                <div className="flex flex-wrap gap-2">
                  {recipients.map(r => <button key={r} onClick={() => setForRecipient(r)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${forRecipient === r ? 'bg-gradient-to-r from-[#ff5f8f] to-[#6c5cff] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r}</button>)}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Style</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map(s => <button key={s} onClick={() => setStyleFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${styleFilter === s ? 'bg-gradient-to-r from-[#6c5cff] to-[#5b7cfa] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>)}
                </div>
              </div>
            </div>
          </div>

          {/* Gift Bundles */}
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Gift Bundles ({filtered.length})</h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filtered.map(bundle => (
                <div key={bundle.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="relative h-52 overflow-hidden">
                    <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop'; }} />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ff8b5c] to-[#ff5f8f] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      🎁 {bundle.occasion}
                    </div>
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-bold text-green-600 shadow">
                      Save ${bundle.originalPrice - bundle.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg">{bundle.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={13} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{bundle.rating}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {bundle.includes?.map(item => (
                        <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-950">${bundle.price}</span>
                        <span className="text-sm text-gray-400 line-through ml-2">${bundle.originalPrice}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/product/${bundle.id}`} className="border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold hover:border-[#ff5f8f] hover:text-[#ff5f8f] transition">View</Link>
                        <button onClick={() => addToCart(bundle)} className="bg-gradient-to-r from-[#ff8b5c] to-[#ff5f8f] text-white px-3 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-transform">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mb-8">
              <div className="text-5xl mb-4">🎁</div>
              <p className="text-gray-500">No bundles found for this filter</p>
              <button onClick={() => { setOccasion('All'); setForRecipient('All'); setStyleFilter('All'); }} className="mt-4 text-[#ff5f8f] font-semibold hover:underline">Clear filters</button>
            </div>
          )}

          {/* Also explore individual products */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-950">Or Buy Individual Items</h2>
              <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff5f8f] hover:text-[#ff8b5c] transition">View all <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gifts;