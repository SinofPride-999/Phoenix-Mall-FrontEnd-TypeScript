import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Share2,
  Search,
  Filter,
  X,
  Clock,
  Eye,
  ShoppingCart,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isInStock: boolean;
  addedDate: Date;
  viewed: boolean;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'viewed' | 'not-viewed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Sample wishlist data
  useEffect(() => {
    const sampleWishlist: WishlistItem[] = [
      {
        id: '1',
        name: 'Minimalist Smart Watch',
        price: 299,
        originalPrice: 399,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 124,
        category: 'Electronics',
        isInStock: true,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        viewed: true
      },
      {
        id: '2',
        name: 'Luxury Leather Handbag',
        price: 189,
        originalPrice: 250,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 89,
        category: 'Fashion',
        isInStock: true,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        viewed: false
      },
      {
        id: '3',
        name: 'Professional Camera Lens',
        price: 450,
        originalPrice: 599,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 67,
        category: 'Electronics',
        isInStock: true,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        viewed: true
      },
      {
        id: '4',
        name: 'Designer Sunglasses',
        price: 129,
        originalPrice: 180,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        rating: 4.5,
        reviews: 156,
        category: 'Fashion',
        isInStock: false,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
        viewed: false
      },
      {
        id: '5',
        name: 'Wireless Bluetooth Earbuds',
        price: 99,
        originalPrice: 150,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 210,
        category: 'Electronics',
        isInStock: true,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
        viewed: true
      },
      {
        id: '6',
        name: 'Modern Office Chair',
        price: 250,
        originalPrice: 300,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 75,
        category: 'Furniture',
        isInStock: true,
        addedDate: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
        viewed: false
      }
    ];

    setWishlistItems(sampleWishlist);
  }, []);

  // Filter items based on current filter
  const filteredItems = wishlistItems.filter(item => {
    const matchesFilter = filter === 'all' ||
      (filter === 'viewed' && item.viewed) ||
      (filter === 'not-viewed' && !item.viewed);

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Sort items based on current sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'date') {
      return b.addedDate.getTime() - a.addedDate.getTime();
    } else if (sortBy === 'price') {
      return b.price - a.price;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // Remove all selected items
  const removeSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.has(item.id)));
    setSelectedItems(new Set());
  };

  // Toggle item selection
  const toggleSelection = (id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Select all items
  const selectAll = () => {
    setSelectedItems(new Set(filteredItems.map(item => item.id)));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  // Calculate total savings
  const totalSavings = wishlistItems.reduce((total, item) => {
    return total + (item.originalPrice ? item.originalPrice - item.price : 0);
  }, 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-heading">My Wishlist</h1>
                <p className="text-gray-600">
                  {wishlistItems.length} items • Saved {formatCurrency(totalSavings)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {selectedItems.size > 0 ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={removeSelected}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium transition-colors hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove ({selectedItems.size})</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearSelection}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-200"
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={selectAll}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-200"
                  >
                    Select all
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-200"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 shadow-soft flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Heart className="w-6 h-6 text-blue-600" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-xl font-bold">{wishlistItems.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-xl font-bold">{formatCurrency(totalSavings)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Not Viewed</p>
              <p className="text-xl font-bold">{wishlistItems.filter(item => !item.viewed).length}</p>
            </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-soft mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'viewed', label: 'Viewed' },
                  { value: 'not-viewed', label: 'Not Viewed' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filter === option.value
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>
                  {sortBy === 'date' && 'Recently Added'}
                  {sortBy === 'price' && 'Price: High to Low'}
                  {sortBy === 'name' && 'Name: A to Z'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showSortOptions ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden"
                  >
                    {[
                      { value: 'date', label: 'Recently Added' },
                      { value: 'price', label: 'Price: High to Low' },
                      { value: 'name', label: 'Name: A to Z' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as any);
                          setShowSortOptions(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedItems.length > 0 ? (
              sortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    delay: index * 0.05
                  }}
                  className="bg-white rounded-xl shadow-soft overflow-hidden group relative"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="hidden"
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                          selectedItems.has(item.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300 group-hover:border-blue-400'
                        }`}
                      >
                        {selectedItems.has(item.id) && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </motion.div>
                    </label>
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-300"
                    />

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 space-y-2">
                      {!item.isInStock && (
                        <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                          Out of stock
                        </span>
                      )}
                      {item.originalPrice && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Save {formatCurrency(item.originalPrice - item.price)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-blue-500 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                        <span className="text-sm text-gray-400">({item.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{formatCurrency(item.price)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{formatDate(item.addedDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Status Indicator */}
                  {!item.viewed && (
                    <div className="absolute top-12 left-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        New
                      </span>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  {searchQuery
                    ? `No items found for "${searchQuery}"`
                    : 'Save your favorite items here to easily find them later.'}
                </p>
                <Button className="hero-button">
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recommendations Section */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-heading">You might also like</h2>
              <button className="text-blue-600 font-medium flex items-center">
                View all
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-3 shadow-soft"
                >
                  <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Wishlist;
