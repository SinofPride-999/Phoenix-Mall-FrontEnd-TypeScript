import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Star, ShoppingCart, Eye, Filter, Grid, List } from "lucide-react";

// Extended product data with more variety
const products = [
  {
    id: 1,
    name: "Minimalist Smart Watch",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    category: "Electronics",
    badge: "New",
    description: "Sleek smartwatch with health tracking, notifications, and 7-day battery life.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "TechHub Ghana",
    inStock: true,
  },
  {
    id: 2,
    name: "Luxury Leather Handbag",
    price: 189,
    originalPrice: 250,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    category: "Fashion",
    badge: "Bestseller",
    description: "Premium handcrafted leather handbag with elegant finish and multiple compartments.",
    location: "Kumasi, Ghana",
    condition: "Used",
    isLiked: true,
    discount: 24,
    seller: "Fashion Forward",
    inStock: true,
  },
  {
    id: 3,
    name: "Professional Camera Lens",
    price: 450,
    originalPrice: 599,
    rating: 4.7,
    reviews: 67,
    image: "https://www.shutterstock.com/image-vector/camera-photo-lens-front-view-600nw-1901097127.jpg",
    category: "Electronics",
    badge: "Sale",
    description: "High-quality 50mm prime lens perfect for portraits and professional photography.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "Photo Pro Store",
    inStock: true,
  },
  {
    id: 4,
    name: "Vintage Acoustic Guitar",
    price: 320,
    rating: 4.6,
    reviews: 45,
    image: "https://vintageguitarsus.com/cdn/shop/products/VE880WK.jpg?v=1621707076",
    category: "Music",
    badge: "Rare",
    description: "Beautiful vintage acoustic guitar with rich, warm tone. Perfect for professionals.",
    location: "Cape Coast, Ghana",
    condition: "Used",
    isLiked: false,
    seller: "Music Masters",
    inStock: true,
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 129,
    originalPrice: 180,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
    category: "Fashion",
    badge: "Trending",
    description: "Stylish designer sunglasses with UV protection and premium build quality.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 28,
    seller: "Style Central",
    inStock: false,
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    price: 185,
    originalPrice: 229,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Electronics",
    badge: "Hot",
    description: "RGB backlit mechanical keyboard with tactile switches, perfect for gaming.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 19,
    seller: "Gaming World",
    inStock: true,
  },
  {
    id: 7,
    name: "Wireless Bluetooth Earbuds",
    price: 99,
    originalPrice: 150,
    rating: 4.6,
    reviews: 210,
    image: "https://m.media-amazon.com/images/I/71exNLc-CnL._AC_SL1500_.jpg",
    category: "Electronics",
    badge: "Hot Deal",
    description: "Compact wireless earbuds with noise cancellation and long battery life.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 34,
    seller: "AudioTech GH",
    inStock: true,
  },
  {
    id: 8,
    name: "Modern Office Chair",
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviews: 75,
    image: "https://www.scandesign.com/cdn/shop/products/1115-FLOW-CHAIR-tall11_1200x.jpg?v=1617043882",
    category: "Furniture",
    badge: "Comfort",
    description: "Ergonomic office chair with adjustable height and lumbar support.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 17,
    seller: "FurniWorld",
    inStock: true,
  },
  {
    id: 9,
    name: "Premium Running Shoes",
    price: 140,
    originalPrice: 180,
    rating: 4.8,
    reviews: 132,
    image: "https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/53/53-best-running-shoes-15275001-main.jpg",
    category: "Fashion",
    badge: "Athletic",
    description: "Lightweight, comfortable running shoes designed for performance.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 22,
    seller: "SportsHub",
    inStock: true,
  },
  {
    id: 10,
    name: "Smart LED TV 55-inch",
    price: 780,
    originalPrice: 950,
    rating: 4.7,
    reviews: 64,
    image: "https://www.jiomart.com/images/product/original/492579418/onida-139-7-cm-55-inch-ultra-hd-4k-led-smart-tv-55uiv-s-digital-o492579418-p591004127-3-202206212136.jpeg?im=Resize=(420,420)",
    category: "Electronics",
    badge: "4K UHD",
    description: "55-inch Smart LED TV with 4K UHD resolution and streaming apps.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "ElectroMart",
    inStock: true,
  },
  {
    id: 11,
    name: "Wooden Coffee Table",
    price: 210,
    originalPrice: 260,
    rating: 4.5,
    reviews: 42,
    image: "https://44wood.com/shop/wp-content/uploads/2022/04/CT1-option1-1000x750.jpg",
    category: "Furniture",
    badge: "Classic",
    description: "Elegant wooden coffee table with a modern minimalist design.",
    location: "Takoradi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 19,
    seller: "HomeStyle GH",
    inStock: true,
  },
  {
    id: 12,
    name: "Portable Air Conditioner",
    price: 370,
    originalPrice: 450,
    rating: 4.6,
    reviews: 98,
    image: "https://www.onehourairftworth.com/wp-content/uploads/2019/07/The-Pro-and-Cons-of-a-Portable-Air-Conditioner-_-Air-Conditioning-Service-in-Dallas-TX-1024x683.jpg",
    category: "Home Appliances",
    badge: "Cool",
    description: "Portable air conditioner suitable for small rooms and offices.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "CoolAir GH",
    inStock: true,
  },
  {
    id: 13,
    name: "Wireless Gaming Mouse",
    price: 75,
    originalPrice: 100,
    rating: 4.7,
    reviews: 145,
    image: "https://myhypergear.com/cdn/shop/products/15571_HYG_Chromium_Wireless_Gaming_Mouse_001.jpg?v=1644352402",
    category: "Electronics",
    badge: "Gamer",
    description: "High precision wireless gaming mouse with RGB lighting.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "Gaming World",
    inStock: true,
  },
  {
    id: 14,
    name: "Men's Casual Jacket",
    price: 120,
    originalPrice: 160,
    rating: 4.5,
    reviews: 84,
    image: "https://m.media-amazon.com/images/I/71kVa7CMErL._UY1000_.jpg",
    category: "Fashion",
    badge: "Trending",
    description: "Stylish men's casual jacket perfect for all occasions.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 25,
    seller: "UrbanWear GH",
    inStock: true,
  },
  {
    id: 15,
    name: "Smartphone Gimbal",
    price: 160,
    originalPrice: 210,
    rating: 4.6,
    reviews: 62,
    image: "https://i5.walmartimages.com/seo/hohem-iSteady-M6-3-Smartphone-Gimbal-Stabilizer-Anti-shake-Vlog-Gimbal-360-Rotation-OLED-Large-Screen-Mini-Tripod-Storage-Case-400g-Payload-Compatibl_7f26f5cf-7d9b-498f-804b-735c29fda0e4.ca4a9aa8fce161ac8c41a0ca660a3d66.jpeg",
    category: "Electronics",
    badge: "Pro",
    description: "3-axis smartphone gimbal stabilizer for smooth video recording.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 23,
    seller: "Photo Pro Store",
    inStock: true,
  },
  {
    id: 16,
    name: "Yoga Mat",
    price: 45,
    originalPrice: 60,
    rating: 4.4,
    reviews: 132,
    image: "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/64/1494003/1.jpg?4083",
    category: "Fitness",
    badge: "Wellness",
    description: "Durable non-slip yoga mat for fitness and relaxation routines.",
    location: "Cape Coast, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "FitLife GH",
    inStock: true,
  },
  {
    id: 17,
    name: "Smart Refrigerator",
    price: 980,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 53,
    image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:281,cw:938,ch:938,q:80,w:938/XJt8jxNnRWMm9uiYB3JZzf.jpg",
    category: "Home Appliances",
    badge: "Premium",
    description: "Energy-efficient refrigerator with smart controls and large storage capacity.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 18,
    seller: "ElectroMart",
    inStock: true,
  },
  {
    id: 18,
    name: "Classic Leather Wallet",
    price: 60,
    originalPrice: 85,
    rating: 4.6,
    reviews: 77,
    image: "https://u-mercari-images.mercdn.net/photos/m84195860717_4.jpg",
    category: "Fashion",
    badge: "Classic",
    description: "Handcrafted leather wallet with multiple compartments and slim design.",
    location: "Takoradi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 29,
    seller: "Style Central",
    inStock: true,
  },
  {
    id: 19,
    name: "Noise Cancelling Headphones",
    price: 220,
    originalPrice: 300,
    rating: 4.9,
    reviews: 188,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/09/noise-cancelling-headphone-2048px-0876.jpg",
    category: "Electronics",
    badge: "Bestseller",
    description: "Over-ear noise cancelling headphones with premium sound and comfort.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 27,
    seller: "AudioTech GH",
    inStock: true,
  },
  {
    id: 20,
    name: "Electric Scooter",
    price: 530,
    originalPrice: 650,
    rating: 4.7,
    reviews: 95,
    image: "https://cdn11.bigcommerce.com/s-r5k51kqrix/images/stencil/728x728/products/1267/7216/smartkick-n1-1200w-dual-motor-off-road-electric-scooter__18361.1724957643.jpg?c=1",
    category: "Transport",
    badge: "Eco",
    description: "Foldable electric scooter with 25km range and eco-friendly design.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "GreenRide GH",
    inStock: true,
  },
];

const ProductGrid: React.FC = () => {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [cartItems, setCartItems] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Electronics", "Fashion", "Music"];

  useEffect(() => {
    const initialLiked = new Set(products.filter((p) => p.isLiked).map((p) => p.id));
    setLikedProducts(initialLiked);
  }, []);

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
      case "new": return "bg-primary/10 text-primary border-primary/20";
      case "bestseller": return "bg-primary/10 text-primary border-primary/20";
      case "sale": return "bg-primary/10 text-primary border-primary/20";
      case "hot": return "bg-primary/10 text-primary border-primary/20";
      case "trending": return "bg-primary/10 text-primary border-primary/20";
      case "rare": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getConditionColor = (condition: string) => {
    return condition === "Brand New" 
      ? "bg-primary/10 text-primary border-primary/20" 
      : "bg-muted text-muted-foreground border-border";
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-muted"
        }`}
      />
    ));
  };

  return (
    <section className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Discover Amazing Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Curated collection of premium items from trusted sellers across Ghana
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ y: -5 }}
                className={`group ${
                  viewMode === "list" ? "flex bg-card rounded-2xl overflow-hidden" : ""
                }`}
              >
                <div className={`bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-border ${
                  viewMode === "list" ? "flex w-full" : ""
                }`}>
                  {/* Image Container */}
                  <div className={`relative ${
                    viewMode === "list" ? "w-48 flex-shrink-0" : ""
                  }`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-background text-foreground px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Quick View
                      </motion.button>
                    </div>

                    {/* Heart button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(product.id)}
                      className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedProducts.has(product.id)
                            ? "text-primary fill-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      />
                    </motion.button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.badge && (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(product.badge)}`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Stock status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      {/* Category & Condition */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getConditionColor(product.condition)}`}>
                          {product.condition}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                      )}

                      {/* Location & Seller */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{product.location}</span>
                        </div>
                        <span className="font-medium">by {product.seller}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-foreground">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          product.inStock
                            ? cartItems.has(product.id)
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {!product.inStock 
                          ? "Out of Stock"
                          : cartItems.has(product.id) 
                            ? "Added to Cart" 
                            : "Add to Cart"
                        }
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-primary/90"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;