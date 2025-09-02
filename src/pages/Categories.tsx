import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Laptop,
  Smartphone,
  Sofa,
  Home,
  Shirt,
  Gem,
  Building,
  Car,
  Wrench,
  Utensils,
  Baby,
  Sparkles,
  Briefcase,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  Star,
  MapPin,
  ShoppingCart,
  Heart
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/sections/ProductGrid';

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Laptops, Computers, Printers etc",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&crop=center",
    IconComponent: Laptop,
    color: "from-blue-500 to-cyan-500",
    productCount: 245
  },
  {
    id: 2,
    name: "Mobile Phones",
    description: "Mobile Phones, Tablets",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    IconComponent: Smartphone,
    color: "from-purple-500 to-indigo-500",
    productCount: 189
  },
  {
    id: 3,
    name: "Furniture",
    description: "Home & Office Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    IconComponent: Sofa,
    color: "from-amber-500 to-orange-500",
    productCount: 156
  },
  {
    id: 4,
    name: "Home Appliances",
    description: "Kitchen & Home Appliances",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    IconComponent: Home,
    color: "from-green-500 to-emerald-500",
    productCount: 203
  },
  {
    id: 5,
    name: "Fashion",
    description: "Clothing & Accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center",
    IconComponent: Shirt,
    color: "from-pink-500 to-rose-500",
    productCount: 312
  },
  {
    id: 6,
    name: "Jewelries",
    description: "Rings, Necklaces & More",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
    IconComponent: Gem,
    color: "from-violet-500 to-purple-500",
    productCount: 98
  },
  {
    id: 7,
    name: "Property",
    description: "Houses & Real Estate",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop&crop=center",
    IconComponent: Building,
    color: "from-slate-500 to-gray-500",
    productCount: 76
  },
  {
    id: 8,
    name: "Vehicles",
    description: "Cars, Motorcycles & More",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop&crop=center",
    IconComponent: Car,
    color: "from-red-500 to-pink-500",
    productCount: 134
  },
  {
    id: 9,
    name: "Services",
    description: "Professional Services",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=400&fit=crop&crop=center",
    IconComponent: Wrench,
    color: "from-teal-500 to-cyan-500",
    productCount: 167
  },
  {
    id: 10,
    name: "Food & Agriculture",
    description: "Fresh Food & Farm Products",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop&crop=center",
    IconComponent: Utensils,
    color: "from-lime-500 to-green-500",
    productCount: 221
  },
  {
    id: 11,
    name: "Babies & Kids",
    description: "Baby Items & Kids Products",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=center",
    IconComponent: Baby,
    color: "from-yellow-400 to-amber-400",
    productCount: 145
  },
  {
    id: 12,
    name: "Beauty & Personal Care",
    description: "Skincare & Cosmetics",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
    IconComponent: Sparkles,
    color: "from-fuchsia-500 to-pink-500",
    productCount: 178
  },
  {
    id: 13,
    name: "Jobs",
    description: "Career Opportunities",
    image: "https://www.fantinipelletteria.com/wp-content/uploads/2022/05/Leather-Briefcase.jpg",
    IconComponent: Briefcase,
    color: "from-indigo-500 to-blue-500",
    productCount: 89
  }
];

// Mock products data for the ProductGrid
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviews: 124,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"],
    category: "Electronics",
    badge: "Bestseller",
    description: "Noise-cancelling wireless headphones with premium sound quality",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 20,
    seller: {
      name: "TechHub Ghana",
      rating: 4.9,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      phone: "+233 24 123 4567",
      joinedDate: "2022-03-15",
      itemsSold: 1245
    },
    inStock: true,
    colors: ["Black", "Silver", "Blue"],
    sizes: [],
    brand: "AudioPro",
    sku: "AUD-2024-WH-001",
    weight: "0.4 kg",
    dimensions: "18 × 15 × 8 cm",
    material: "Plastic and metal"
  },
  {
    id: 2,
    name: "Smartphone X Pro",
    price: 899,
    originalPrice: 999,
    rating: 4.7,
    reviews: 89,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"],
    category: "Mobile Phones",
    badge: "New",
    description: "Latest smartphone with advanced camera and processing power",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 10,
    seller: {
      name: "MobileWorld",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      phone: "+233 24 123 4567",
      joinedDate: "2022-03-15",
      itemsSold: 1245
    },
    inStock: true,
    colors: ["Midnight Black", "Ocean Blue", "Pearl White"],
    sizes: [],
    brand: "TechBrand",
    sku: "MBL-2024-SP-002",
    weight: "0.2 kg",
    dimensions: "15 × 7 × 0.8 cm",
    material: "Glass and aluminum"
  },
  {
    id: 3,
    name: "Modern Leather Sofa",
    price: 1200,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 67,
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center"],
    category: "Furniture",
    badge: "Premium",
    description: "Elegant leather sofa for your living room",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 20,
    seller: {
      name: "Furniture Gallery",
      rating: 4.7,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      phone: "+233 24 123 4567",
      joinedDate: "2022-03-15",
      itemsSold: 1245
    },
    inStock: true,
    colors: ["Brown", "Black", "Beige"],
    sizes: ["3-Seater", "2-Seater", "L-Shaped"],
    brand: "ComfortLiving",
    sku: "FUR-2024-SF-003",
    weight: "85 kg",
    dimensions: "200 × 90 × 80 cm",
    material: "Genuine leather"
  },
  {
    id: 4,
    name: "Stainless Steel Refrigerator",
    price: 850,
    originalPrice: 999,
    rating: 4.6,
    reviews: 112,
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop&crop=center"],
    category: "Home Appliances",
    badge: "Sale",
    description: "Energy efficient refrigerator with frost-free technology",
    location: "Tema, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 15,
    seller: {
      name: "Home Appliance Center",
      rating: 4.8,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      phone: "+233 24 123 4567",
      joinedDate: "2022-03-15",
      itemsSold: 1245
    },
    inStock: true,
    colors: ["Stainless Steel", "Black", "White"],
    sizes: ["300L", "400L", "500L"],
    brand: "CoolTech",
    sku: "HAP-2024-RF-004",
    weight: "65 kg",
    dimensions: "180 × 70 × 70 cm",
    material: "Stainless steel"
  }
];

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName.toLowerCase());
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 pt-16">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-slate-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-gray-900 dark:hover:text-white">HOME</button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">CATEGORIES</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-4">
            <Flame className="w-4 h-4 mr-2" />
            Browse All Categories
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by <span className="text-red-600">Category</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our wide range of products organized into categories for easy browsing
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = category.IconComponent;
            const isImageLoaded = loadedImages.has(category.id);
            const isHovered = hoveredCategory === category.id;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.name)}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Circle Container */}
                <div className="relative mb-4">
                  {/* Main Circle */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative bg-gray-200 dark:bg-slate-700 shadow-lg group-hover:shadow-xl transition-all duration-300">

                    {/* Loading State */}
                    {!isImageLoaded && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 animate-pulse rounded-full`} />
                    )}

                    {/* Category Image */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onLoad={() => handleImageLoad(category.id)}
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 flex items-center justify-center rounded-full`}
                        >
                          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Category Name */}
                <motion.h3
                  className="text-center font-semibold text-sm text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300 mb-1"
                  style={{
                    backgroundImage: isHovered ? `linear-gradient(to right, ${category.color.split(' ')[1].replace('to-', '')}, ${category.color.split(' ')[2]})` : 'none'
                  }}
                >
                  {category.name}
                </motion.h3>

                {/* Product Count */}
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {category.productCount} products
                </p>

                {/* Category Description - Show on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-xs text-gray-500 dark:text-slate-400 text-center mt-1 max-w-[100px]"
                    >
                      {category.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Products Section */}
        <div id="products-section" className="pt-8 border-t border-gray-200 dark:border-slate-800">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedCategory === 'all' ? 'All Products' : `${selectedCategory} Products`}
              </h2>
              <p className="text-gray-600 dark:text-slate-400">
                Showing {mockProducts.length} products
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* View Toggle */}
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={mockProducts}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
