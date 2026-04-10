import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Search, Sparkles, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const highlights = [
  { icon: Sparkles, title: 'Smart suggestions', desc: 'Find gifts that fit their style.' },
  { icon: ShieldCheck, title: 'Curated quality', desc: 'Handpicked items for every budget.' },
  { icon: Truck, title: 'Fast delivery', desc: 'Send thoughtful gifts on time.' },
];

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1549465220-1a8c4b0a0c4b?w=600&h=600&fit=crop',
    alt: 'Luxury gift box',
  },
  {
    src: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=600&fit=crop',
    alt: 'Elegant watch gift',
  },
  {
    src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop',
    alt: 'Perfume gift set',
  },
  {
    src: 'https://images.unsplash.com/photo-1534766555764-ce878a4e3a2b?w=600&h=600&fit=crop',
    alt: 'Jewelry gift',
  },
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f5] via-white to-[#fff0ed]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-pink-200/30 to-orange-200/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200/30 to-blue-200/30 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-100/20 to-amber-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-700 shadow-sm backdrop-blur-sm">
              <Gift size={14} className="text-orange-500" />
              PERFECT GIFTING MADE SIMPLE
            </div>

            {/* Heading */}
            <div className="animate-fade-in-up animation-delay-200">
              <h1 className="text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                No more guessing,
                <span className="block bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] bg-clip-text text-transparent">
                  only perfect gifts,
                  <br />
                  every time.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="animate-fade-in-up animation-delay-400 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Discover beautiful gifting ideas for perfume, watches, shoes, accessories, and more. Build the perfect shortlist in seconds.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-in-up animation-delay-600 flex w-full max-w-xl items-center gap-3 rounded-full border border-gray-200 bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-violet-100">
                <Search size={18} className="text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Curious about gift ideas?"
                className="h-11 flex-1 bg-transparent px-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
              <Link
                to="/shop"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#6b5cff] to-[#5b7cfa] text-white transition-all hover:scale-105 hover:shadow-lg"
                aria-label="Search gifts"
              >
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-800 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-950/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Shop gifts
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/gifts"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
              >
                Browse ideas
              </Link>
            </div>

            {/* Highlights */}
            <div className="animate-fade-in-up animation-delay-1000 grid gap-4 pt-4 sm:grid-cols-3">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    style={{ animationDelay: `${1000 + idx * 100}ms` }}
                  >
                    <Icon className="text-[#ff5f8f] transition-transform group-hover:scale-110" size={18} />
                    <h3 className="mt-3 text-sm font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative mx-auto w-full max-w-lg animate-fade-in-up animation-delay-300">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <div
                className={`relative transition-all duration-500 ease-in-out ${
                  isTransitioning ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
                }`}
              >
                <img
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  className="h-auto w-full rounded-[2rem] object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-black/10 via-transparent to-black/5" />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:shadow-xl focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:shadow-xl focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isTransitioning) return;
                      setIsTransitioning(true);
                      setCurrentImageIndex(idx);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'w-6 bg-white shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-pink-300/30 to-orange-300/30 blur-2xl" />
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-bl from-purple-300/20 to-blue-300/20 blur-2xl" />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
};

export default Hero;