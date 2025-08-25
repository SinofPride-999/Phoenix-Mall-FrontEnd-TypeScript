import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    image: "https://m.media-amazon.com/images/I/412jCZ8Ag4L._AC_SL1500_.jpg",
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
    image: "https://artisanroast.co.uk/cdn/shop/files/artisan_roast_stoneware_mug.webp?v=1743593697",
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
    image: "https://www.pearedcreation.com/cdn/shop/products/il_fullxfull.3962725041_r5rx_173ed1b4-a2b3-494e-a670-39fc9d10bfaa_2000x.jpg?v=1684496549",
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
    image: "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/475098/1.jpg?2959",
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
    image: "https://www.potterybarn.com.au/site/PB/Product%20Images/joshua-ceramic-vase-202348-0031-joshua-handcrafted-ceramic-vases-z.jpg?resizeid=77&resizeh=450&resizew=450",
    category: "Home",
    badge: "Artisan",
    colors: ["#D2691E", "#8B4513", "#4A5568"],
    isLiked: true,
    height: "tall"
  },
  {
    id: 9,
    name: "Premium Leather Handbag Collection",
    price: 189,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    category: "fashion",
    badge: "Bestseller",
    colors: ["#8B4513", "#000000", "#D2691E"],
    isLiked: true,
    height: "tall",
    tags: ["handbag", "leather", "fashion"]
  },
  {
    id: 10,
    name: "Bluetooth Earbuds",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    reviews: 210,
    image: "https://kofshop.com/wp-content/uploads/2022/10/M10-TWS-Bluetooth-Earbuds-Earphones-1-KOFshop.com_-450x450.jpg",
    category: "Electronics",
    badge: "New",
    colors: ["#000000", "#FFFFFF", "#4A5568"],
    isLiked: false,
    height: "short"
  },
  {
    id: 11,
    name: "Running Sneakers",
    price: 139,
    originalPrice: 179,
    rating: 4.8,
    reviews: 320,
    image: "https://www.designboom.com/wp-content/dbsub/410783/2020-05-25/wearable-speaker-1-5ecbbcdc209cf.jpg",
    category: "Fashion",
    badge: "Bestseller",
    colors: ["#000000", "#FF0000", "#FFFFFF"],
    isLiked: true,
    height: "medium"
  },
  {
    id: 12,
    name: "Designer Sunglasses",
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    reviews: 145,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUakSkC-hFT94p9bQg5P_r7pFDMlE3HAcfjw&s",
    category: "Fashion",
    badge: "Sale",
    colors: ["#000000", "#8B5A3C"],
    isLiked: false,
    height: "short"
  },
  {
    id: 13,
    name: "Wooden Coffee Table",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 72,
    image: "https://truewoodfurniture.co.za/wp-content/uploads/2023/03/KALAHARI-WOODEN-COFFEE-TABLE.jpg",
    category: "Home",
    badge: "Featured",
    colors: ["#8B4513", "#D2691E", "#FFFFFF"],
    isLiked: false,
    height: "tall"
  },
  {
    id: 14,
    name: "Ceramic Dinnerware Set",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviews: 60,
    image: "https://m.media-amazon.com/images/I/718fa-REjrL._UF894,1000_QL80_.jpg",
    category: "Home",
    badge: "New",
    colors: ["#FFFFFF", "#D2691E", "#4A5568"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 15,
    name: "Fitness Tracker Watch",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 180,
    image: "https://m.media-amazon.com/images/I/7120xfZ5PGL._UF894,1000_QL80_.jpg",
    category: "Fitness",
    badge: "Bestseller",
    colors: ["#000000", "#4A5568"],
    isLiked: true,
    height: "short"
  },
  {
    id: 16,
    name: "Yoga Resistance Bands Set",
    price: 35,
    originalPrice: null,
    rating: 4.8,
    reviews: 240,
    image: "https://cdn.shopify.com/s/files/1/0664/4288/7412/files/Yoga-und-Kraft-mit-dem-Patband-by-FLEXVIT_jpg_1024x1024.webp?v=1678619848",
    category: "Fitness",
    badge: "Eco-Friendly",
    colors: ["#48BB78", "#E53E3E", "#4A5568"],
    isLiked: false,
    height: "short"
  },
  {
    id: 17,
    name: "Luxury Bath Towel Set",
    price: 65,
    originalPrice: 85,
    rating: 4.6,
    reviews: 98,
    image: "https://silentnightgh.com/wp-content/uploads/2018/08/Towel-12.jpg",
    category: "Home",
    badge: "Limited",
    colors: ["#FFFFFF", "#4A5568", "#8B4513"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 18,
    name: "Leather Wallet",
    price: 49,
    originalPrice: 69,
    rating: 4.9,
    reviews: 130,
    image: "https://buffalojackson.com/cdn/shop/files/denver_leather_trifold_wallet_autumn_brown_3_of_3_2000x.jpg?v=1750781571",
    category: "Fashion",
    badge: "Sale",
    colors: ["#8B4513", "#000000"],
    isLiked: true,
    height: "short"
  },
  {
    id: 19,
    name: "Smart LED Desk Lamp",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviews: 75,
    image: "https://m.media-amazon.com/images/I/61NYkPbWjpL.jpg",
    category: "Home",
    badge: "New",
    colors: ["#FFFFFF", "#000000"],
    isLiked: false,
    height: "medium"
  },
  {
    id: 20,
    name: "Gaming Keyboard RGB",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviews: 210,
    image: "https://www.lc-power.com/wp-content/uploads/elementor/thumbs/gallerie-bilder-tastatur-web-LC-KEY-MECH-2-RGB-C-W-qyoffk2nohswhc7h8gnw2wnfem28ib0hdwudi1nvk8.jpg",
    category: "Electronics",
    badge: "Featured",
    colors: ["#000000", "#4A5568", "#FF0000"],
    isLiked: false,
    height: "medium"
  }
];

const ProductGrid: React.FC = () => {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return inCategory && inPriceRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.id - a.id;
        default: return a.id - b.id;
      }
    });

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
        {/* Filter and Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className={`${viewMode === 'grid' ? 'masonry-grid' : 'space-y-6'}`}>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className={viewMode === 'grid' ? 'masonry-item' : ''}
              >
                <div className={`bg-card rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 ${getItemHeight(product.height)}`}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                      onClick={() => toggleLike(product.id)}
                    >
                      <Heart className={`w-5 h-5 ${likedProducts.has(product.id) ? 'text-red-500' : 'text-gray-400'}`} />
                    </button>
                    {product.badge && (
                      <Badge className="absolute top-2 left-2" variant={getBadgeVariant(product.badge)}>
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredProducts.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default ProductGrid;