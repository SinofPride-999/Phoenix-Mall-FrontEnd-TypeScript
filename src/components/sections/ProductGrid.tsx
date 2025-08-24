import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock product data with various heights for masonry effect
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
    colors: ["#000000", "#8B5A3C", "#4A5568"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 2,
    name: "Luxury Leather Handbag",
    price: 189,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    category: "Fashion",
    badge: "Bestseller",
    colors: ["#8B4513", "#000000", "#D2691E"],
    isLiked: true,
    height: "tall"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 45,
    originalPrice: 60,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    badge: "Sale",
    colors: ["#FFFFFF", "#000000", "#4A5568", "#E53E3E"],
    isLiked: false,
    height: "short"
  },
  {
    id: 4,
    name: "Wireless Noise-Canceling Headphones",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=550&fit=crop",
    category: "Electronics",
    badge: "Featured",
    colors: ["#000000", "#FFFFFF", "#4A5568"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 5,
    name: "Artisan Coffee Mug Set",
    price: 68,
    originalPrice: null,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=700&fit=crop",
    category: "Home",
    badge: "Limited",
    colors: ["#8B4513", "#D2691E", "#4A5568"],
    isLiked: true,
    height: "tall"
  },
  {
    id: 6,
    name: "Modern Desk Lamp",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop",
    category: "Home",
    badge: "New",
    colors: ["#000000", "#FFFFFF", "#4A5568"],
    isLiked: false,
    height: "short"
  },
  {
    id: 7,
    name: "Premium Yoga Mat",
    price: 85,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=580&fit=crop",
    category: "Fitness",
    badge: "Eco-Friendly",
    colors: ["#48BB78", "#4A5568", "#E53E3E"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 8,
    name: "Handcrafted Ceramic Vase",
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=650&fit=crop",
    category: "Home",
    badge: "Artisan",
    colors: ["#D2691E", "#8B4513", "#4A5568"],
    isLiked: true,
    height: "tall"
  }
];

const ProductGrid: React.FC = () => {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);

  // Initialize liked products
  useEffect(() => {
    const initialLiked = new Set(products.filter(p => p.isLiked).map(p => p.id));
    setLikedProducts(initialLiked);
  }, []);

  // Stagger product appearance
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleProducts(prev => {
        if (prev.length < products.length) {
          return [...prev, prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'New': return 'default';
      case 'Sale': return 'destructive';
      case 'Bestseller': return 'secondary';
      case 'Featured': return 'outline';
      case 'Limited': return 'secondary';
      case 'Eco-Friendly': return 'secondary';
      case 'Artisan': return 'outline';
      default: return 'default';
    }
  };

  const getItemHeight = (height: string) => {
    switch (height) {
      case 'short': return 'h-72';
      case 'medium': return 'h-80';
      case 'tall': return 'h-96';
      default: return 'h-80';
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Trending <span className="text-gradient">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products that define modern style and exceptional quality.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          <AnimatePresence>
            {products.map((product, index) => (
              visibleProducts.includes(index) && (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="masonry-item"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`product-card ${getItemHeight(product.height)} group cursor-pointer`}>
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-2xl h-3/4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 20
                        }}
                        className="absolute inset-0 flex items-center justify-center space-x-3"
                      >
                        <Button
                          size="sm"
                          className="rounded-full bg-background/90 text-foreground hover:bg-background shadow-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Quick view functionality
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          className="rounded-full hero-button shadow-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart functionality
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </motion.div>

                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant={getBadgeVariant(product.badge)} className="text-xs font-medium">
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Like Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-soft hover:bg-background transition-colors"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-colors ${
                            likedProducts.has(product.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        />
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">{product.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-muted-foreground">{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      {/* Colors */}
                      <div className="flex items-center space-x-2">
                        {product.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border-2 border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-foreground">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                        {product.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button className="hero-button-outline px-12 py-3">
            Load More Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;