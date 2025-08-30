import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, ShoppingCart, Grid, List } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  location: string;
  condition: string;
  isLiked: boolean;
  discount?: number;
  seller: string;
  inStock: boolean;
}

interface ProductGridProps {
  products: Product[];
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode, onViewModeChange }) => {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [cartItems, setCartItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const initialLiked = new Set(products.filter((p) => p.isLiked).map((p) => p.id));
    setLikedProducts(initialLiked);
  }, [products]);

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const addToCart = (id: number) => {
    setCartItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "new": return "bg-red-500 text-white";
      case "bestseller": return "bg-blue-500 text-white";
      case "sale": return "bg-green-500 text-white";
      case "hot": return "bg-orange-500 text-white";
      case "trending": return "bg-purple-500 text-white";
      case "rare": return "bg-yellow-500 text-black";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    return condition === "Brand New"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getGridCols = () => {
    switch (viewMode) {
      case '1': return 'grid-cols-1';
      case '2': return 'grid-cols-2 lg:grid-cols-3';
      case '3': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      case '4': return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
      default: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className="flex-1">
      {/* Desktop Top Bar */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing {products.length} products
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            {['1', '2', '3', '4'].map((view) => (
              <button
                key={view}
                onClick={() => onViewModeChange(view)}
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
      <div className={`grid gap-3 sm:gap-4 ${getGridCols()}`}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`group relative bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 ${
              viewMode === '1' ? 'flex gap-4 p-3' : 'overflow-hidden'
            }`}
          >
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
                onClick={() => toggleLike(product.id)}
                className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all ${
                  likedProducts.has(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
                } ${viewMode === '1' ? 'scale-75' : ''}`}
              >
                <Heart className={`w-3 h-3 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Add Button - Desktop */}
              <button
                onClick={() => addToCart(product.id)}
                className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hidden sm:block ${
                  viewMode === '1' ? 'hidden' : ''
                }`}
              >
                Quick Add
              </button>

              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 ${getBadgeColor(product.badge)} text-xs font-medium rounded ${
                  viewMode === '1' ? 'text-xs px-1.5 py-0.5' : ''
                }`}>
                  {product.badge}
                </span>
              )}

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-gray-900 text-white px-3 py-1.5 rounded-full font-semibold text-xs">
                    Out of Stock
                  </span>
                </div>
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
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{product.location}</span>
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
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className={`sm:hidden p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ${
                    viewMode === '1' ? 'p-1' : ''
                  }`}
                >
                  <ShoppingCart className={`${viewMode === '1' ? 'w-3 h-3' : 'w-4 h-4'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button - Mobile */}
      <div className="lg:hidden mt-6 text-center">
        <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-800 transition-colors">
          Load More Products
        </button>
      </div>

      {/* Pagination - Desktop */}
      <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
        <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900">
          Previous
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {page}
          </button>
        ))}
        <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
