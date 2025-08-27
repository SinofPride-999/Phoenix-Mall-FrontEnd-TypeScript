import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import ProductGrid from '@/components/sections/ProductGrid';
import Footer from '@/components/layout/Footer';
import { 
  TrendingUp, 
  Shield, 
  Truck, 
  HeadphonesIcon,
  Star,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock product data to pass to ProductGrid
const mockProducts = [
  
  {
    id: 1,
    name: "Stylish Backpack",
    price: 130,
    originalPrice: 160,
    rating: 4.7,
    reviews: 119,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMR2gUh2fadsgCT2gYnGWben1nBiS-H832w&s",
    category: "Fashion",
    badge: "Trending",
    description: "Durable backpack with multiple compartments for everyday use.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 18,
    seller: "Urban Gear",
    inStock: true,
  },
  {
    id: 2,
    name: "4K Drone Camera",
    price: 590,
    originalPrice: 720,
    rating: 4.8,
    reviews: 84,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb35QtsAaL3k3nfVNk2tolZk7QifvoRBgd_w&s",
    category: "Electronics",
    badge: "Hot",
    description: "Professional drone with 4K camera and GPS stabilization.",
    location: "Cape Coast, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "DroneZone",
    inStock: true,
  },
  {
    id: 3,
    name: "Deluxe Yoga Mat",
    price: 70,
    originalPrice: 95,
    rating: 4.7,
    reviews: 132,
    image: "https://megango.com/media/catalog/product/cache/e328e8185e7eb650e829953bde1cea67/t/p/tpe-deluxe-yoga-mat-125cm-x-61cm-x-14mm.jpg",
    category: "Sports",
    badge: "Bestseller",
    description: "Thick non-slip yoga mat with carrying strap.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 26,
    seller: "FitLife GH",
    inStock: true,
  },
  {
    id: 4,
    name: "Modern Floor Lamp",
    price: 190,
    originalPrice: 240,
    rating: 4.6,
    reviews: 92,
    image: "https://media.istockphoto.com/id/1474563913/photo/modern-floor-lamp.jpg?s=612x612&w=0&k=20&c=IjRRD-yyIxfXLhy5TDg9MIDPi9y5yHvSGSRyFxL8P58=",
    category: "Home Decor",
    badge: "New",
    description: "Elegant floor lamp with adjustable lighting settings.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 21,
    seller: "BrightLiving",
    inStock: true,
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 125,
    originalPrice: 160,
    rating: 4.8,
    reviews: 176,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeubwweyazZoF76slKEzChR939yaW3s9U3nw&s",
    category: "Electronics",
    badge: "Hot Deal",
    description: "Waterproof speaker with powerful bass and 12-hour playtime.",
    location: "Takoradi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 22,
    seller: "AudioMax",
    inStock: true,
  },
  {
    id: 6,
    name: "Electric Kettle",
    price: 65,
    originalPrice: 90,
    rating: 4.5,
    reviews: 150,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZZ4gwPF5guSTtREVDP5xTmvvBJAVCOS3mg&s",
    category: "Appliances",
    badge: "Hot",
    description: "1.5L stainless steel electric kettle with auto shut-off.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 28,
    seller: "KitchenPro",
    inStock: true,
  },
  {
    id: 7,
    name: "Artisan Ceramic Vase",
    price: 95,
    originalPrice: 130,
    rating: 4.8,
    reviews: 54,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXafS_T7SGppIipGr3M9GYtBgJ3THvUm8rg&s",
    category: "Home Decor",
    badge: "New Arrival",
    description: "Handcrafted ceramic vase with unique glaze finish.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 27,
    seller: "Artisan Hub",
    inStock: true,
  },
  {
    id: 8,
    name: "Adjustable Standing Desk",
    price: 450,
    originalPrice: 520,
    rating: 4.9,
    reviews: 82,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjw2rIS5FgZgu_BgtoNxKBRKU6GQs8h3BEw&s",
    category: "Furniture",
    badge: "Premium",
    description: "Height-adjustable desk with sturdy frame and modern design.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 13,
    seller: "FurniWorld",
    inStock: true,
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('4'); // Default to 3-column view

  // Featured categories for quick navigation
  const featuredCategories = [
    { id: 'electronics', name: 'Electronics', icon: TrendingUp, count: 145 },
    { id: 'fashion', name: 'Fashion', icon: Sparkles, count: 289 },
    { id: 'home', name: 'Home & Living', icon: Award, count: 167 },
    { id: 'beauty', name: 'Beauty', icon: Star, count: 98 },
    { id: 'sports', name: 'Sports', icon: TrendingUp, count: 134 },
    { id: 'books', name: 'Books', icon: Clock, count: 76 },
  ];

  // Trust badges
  const trustBadges = [
    { icon: Shield, title: 'Secure Payments', description: '100% secure payment processing' },
    { icon: Truck, title: 'Free Shipping', description: 'Free delivery on orders over $50' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Round-the-clock customer service' },
    { icon: Award, title: 'Quality Guarantee', description: '30-day money-back guarantee' },
  ];

  // Featured brands
  const featuredBrands = [
    { name: 'Nike', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png', products: 89 },
    { name: 'Apple', logo: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png', products: 67 },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Samsung_Orig_Wordmark_BLACK_RGB.png', products: 54 },
    { name: 'Adidas', logo: 'https://cdn.freebiesupply.com/logos/large/2x/adidas-4-logo-png-transparent.png', products: 78 },
    { name: 'Sony', logo: 'https://cdn.freebiesupply.com/logos/large/2x/sony-2-logo-black-and-white.png', products: 45 },
    { name: 'Dyson', logo: 'https://wp.logos-download.com/wp-content/uploads/2016/11/Dyson_logo_logotype.png?dl=', products: 32 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Trust Badges Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Featured Products Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending Now
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Featured <span className="text-gradient">Products</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular and trending products loved by thousands of customers
              </p>
            </motion.div>

            {/* Updated ProductGrid with required props */}
            <ProductGrid 
              products={mockProducts} 
              viewMode={viewMode} 
              onViewModeChange={setViewMode} 
            />
          </div>
        </section>

        {/* Featured Brands Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Shop by <span className="text-gradient">Brand</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore products from world-renowned brands you know and trust
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group text-center cursor-pointer"
                >
                  <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-300 mb-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.products} products</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button className="hero-button-outline px-8 py-3 group">
                View All Brands
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Stay <span className="text-gradient">Updated</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Subscribe to our newsletter and be the first to know about new products, 
                  exclusive deals, and special promotions
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="hero-button whitespace-nowrap">
                    Subscribe
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive 
                  updates from our company.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;