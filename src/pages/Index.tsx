// pages/Index.tsx
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

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

        {/* Quick Categories Navigation */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Shop by <span className="text-gradient">Category</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our diverse range of categories to find exactly what you're looking for
              </p>
            </motion.div> */}

            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-card text-foreground shadow-soft hover:shadow-large'
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs opacity-70">{category.count} products</p>
                  </motion.button>
                );
              })}
            </div> */}
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

            <ProductGrid />
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