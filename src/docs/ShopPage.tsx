import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  ShoppingCart,
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

// Compact HeroBanner Component
const HeroBanner = () => {
  const banners = [
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      cta: "Shop Now"
    },
    {
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
      title: "New Arrivals", 
      subtitle: "Fresh Styles",
      cta: "Explore"
    },
    {
      url: 'https://images.unsplash.com/photo-1600180758895-6e1f4f28b7f5?w=800&q=80',
      title: "Trending",
      subtitle: "What's Hot", 
      cta: "See More"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg my-3 sm:my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={banners[currentIndex].url}
                alt={banners[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 text-white">
                  <motion.h2 
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                  >
                    {banners[currentIndex].title}
                  </motion.h2>
                  
                  <motion.p 
                    key={`subtitle-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4"
                  >
                    {banners[currentIndex].subtitle}
                  </motion.p>
                  
                  <motion.button
                    key={`cta-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md"
                  >
                    {banners[currentIndex].cta}
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-4 sm:w-6'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, viewMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className={`group relative bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 ${
      viewMode === '1' ? 'flex gap-4 p-3' : 'overflow-hidden'
    }`}>
      {/* Product Image */}
      <div className={`relative ${
        viewMode === '1' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'
      } overflow-hidden ${viewMode !== '1' ? 'rounded-t-lg' : 'rounded-lg'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          } ${viewMode === '1' ? 'scale-75' : ''}`}
        >
          <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Button - Desktop */}
        <button className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hidden sm:block ${
          viewMode === '1' ? 'hidden' : ''
        }`}>
          Quick Add
        </button>
        
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded ${
            viewMode === '1' ? 'text-xs px-1.5 py-0.5' : ''
          }`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className={`${viewMode === '1' ? 'flex-1' : 'p-3'}`}>
        <div className="flex items-start justify-between mb-1">
          <h3 className={`font-medium text-gray-900 line-clamp-2 ${
            viewMode === '1' ? 'text-sm' : 'text-sm sm:text-base'
          }`}>
            {product.name}
          </h3>
        </div>
        
        <p className={`text-gray-500 mb-2 ${
          viewMode === '1' ? 'text-xs' : 'text-xs sm:text-sm'
        }`}>
          {product.category}
        </p>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-gray-900 ${
              viewMode === '1' ? 'text-sm' : 'text-base'
            }`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className={`text-gray-400 line-through ${
                viewMode === '1' ? 'text-xs' : 'text-sm'
              }`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Mobile Add Button */}
          <button className={`sm:hidden p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors ${
            viewMode === '1' ? 'p-1' : ''
          }`}>
            <ShoppingCart className={`${viewMode === '1' ? 'w-3 h-3' : 'w-4 h-4'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main ShopPage Component
const ShopPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('4');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Essential Cotton T-Shirt",
      category: "Tops",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      badge: "Sale"
    },
    {
      id: 2,
      name: "Denim Skinny Jeans",
      category: "Jeans", 
      price: 79.99,
      rating: 5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80"
    },
    {
      id: 3,
      name: "Leather Ankle Boots",
      category: "Shoes",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80",
      badge: "New"
    },
    {
      id: 4,
      name: "Cashmere Blend Scarf",
      category: "Accessories",
      price: 49.99,
      rating: 5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80"
    },
    {
      id: 5,
      name: "Wool Blend Coat",
      category: "Jackets & Coats",
      price: 199.99,
      rating: 4,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&q=80"
    },
    {
      id: 6,
      name: "Silk Blend Blouse",
      category: "Tops",
      price: 89.99,
      originalPrice: 109.99,
      rating: 5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
      badge: "Popular"
    }
  ];

  const categories = [
    'Women\'s', 'Dresses', 'Tops', 'Jackets & Coats',
    'Trousers', 'Jeans', 'Shoes', 'Sportswear', 'Accessories'
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const brands = [
    { name: 'Adidas', count: 78 },
    { name: 'Nike', count: 89 },
    { name: 'H&M', count: 67 },
    { name: 'Zara', count: 89 },
    { name: 'Uniqlo', count: 45 }
  ];

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const getGridCols = () => {
    switch (viewMode) {
      case '1': return 'grid-cols-1';
      case '2': return 'grid-cols-2 lg:grid-cols-3';
      case '3': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      case '4': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
      default: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Mobile Search Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 lg:py-6">
        <div className="flex gap-4 lg:gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategories(prev =>
                        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                      )}
                      className={`block w-full text-left text-sm py-1 hover:text-gray-900 transition-colors ${
                        selectedCategories.includes(category) ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  Colors
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColors(prev =>
                        prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                      )}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedColors.includes(color) ? 'border-gray-900 ring-2 ring-gray-300' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSizes(prev =>
                        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                      )}
                      className={`px-3 py-1 text-sm border rounded transition-colors ${
                        selectedSizes.includes(size)
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Mobile Filter/Sort Bar */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              
              <button
                onClick={() => setShowSort(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
            </div>

            {/* Desktop Top Bar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing {products.length} of 2,547 products
              </p>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">View:</span>
                  {['1', '2', '3', '4'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setViewMode(view)}
                      className={`p-2 rounded transition-colors ${
                        viewMode === view ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {view === '1' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-3 sm:gap-4 ${
              viewMode === '1' ? 'grid-cols-1' :
              viewMode === '2' ? 'grid-cols-2 lg:grid-cols-3' :
              viewMode === '3' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' :
              'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {/* Load More Button - Mobile */}
            <div className="lg:hidden mt-6 text-center">
              <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Load More Products
              </button>
            </div>

            {/* Pagination - Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
              <button 
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-50"
                disabled={currentPage === 5}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => setSelectedCategories(prev =>
                            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                          )}
                          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColors(prev =>
                          prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                        )}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color) ? 'border-gray-900 ring-2 ring-gray-300' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev =>
                          prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                        )}
                        className={`px-3 py-2 text-sm border rounded transition-colors ${
                          selectedSizes.includes(size)
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="p-4 border-t border-gray-200 flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setPriceRange([0, 500]);
                  }}
                  className="flex-1 py-3 text-gray-600 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sort Modal */}
      <AnimatePresence>
        {showSort && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowSort(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden rounded-t-xl"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Sort By</h3>
                <button 
                  onClick={() => setShowSort(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left py-3 px-2 rounded-lg transition-colors ${
                      sortBy === option.value ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Spacing */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default ShopPage