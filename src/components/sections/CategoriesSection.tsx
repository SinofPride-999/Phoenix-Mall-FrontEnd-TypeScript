import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Heart, Star, Users, Zap, Palette, Home, Dumbbell, BookOpen, Smartphone } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest tech for your everyday needs and entertainment",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=600&fit=crop",
    productCount: 145,
    trendingCount: 23,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: Smartphone,
    badge: "Hot",
    growth: "+15%"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Trendy clothing & accessories to express your unique style",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop",
    productCount: 289,
    trendingCount: 45,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: Palette,
    badge: "Trending",
    growth: "+28%"
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Modern furniture & decor to transform your living spaces",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    productCount: 167,
    trendingCount: 18,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: Home,
    badge: "New",
    growth: "+12%"
  },
  {
    id: 4,
    name: "Beauty",
    description: "Skincare & cosmetics to enhance your natural beauty and confidence",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop",
    productCount: 98,
    trendingCount: 32,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: Sparkles,
    badge: "Popular",
    growth: "+35%"
  },
  {
    id: 5,
    name: "Sports & Fitness",
    description: "Active lifestyle essentials to keep you moving and healthy",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
    productCount: 134,
    trendingCount: 28,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: Dumbbell,
    badge: "Active",
    growth: "+22%"
  },
  {
    id: 6,
    name: "Books & Media",
    description: "Knowledge & entertainment for your mind and soul",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop",
    productCount: 76,
    trendingCount: 12,
    color: "from-primary to-primary/80",
    bgGradient: "from-primary/10 via-primary/5 to-primary/10",
    IconComponent: BookOpen,
    badge: "Classic",
    growth: "+8%"
  }
];

const CategoriesSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Memoize the badge color function to prevent unnecessary recalculations
  const getBadgeColor = useMemo(() => (badge: string) => {
    switch (badge.toLowerCase()) {
      case "hot": return "bg-primary text-primary-foreground";
      case "trending": return "bg-primary text-primary-foreground";
      case "new": return "bg-primary text-primary-foreground";
      case "popular": return "bg-primary text-primary-foreground";
      case "active": return "bg-primary text-primary-foreground";
      case "classic": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-foreground";
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <section className="relative py-16 px-4 bg-background overflow-hidden">
      {/* Simplified Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-primary/5 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Simplified Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full border border-border mb-6"
          >
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Premium Categories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            <span>Explore Our</span>
            <br />
            <span className="text-primary">
              Collections
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Discover premium products across diverse categories, each carefully curated to deliver exceptional quality and style.
          </motion.p>
        </motion.div>

        {/* Optimized Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = category.IconComponent;
            const isImageLoaded = loadedImages.has(category.id);
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="group cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-500 border border-border">
                  {/* Image Section with Loading Optimization */}
                  <div className="relative h-3/5 overflow-hidden">
                    {!isImageLoaded && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} animate-pulse`} />
                    )}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onLoad={() => handleImageLoad(category.id)}
                      loading="lazy"
                    />
                    
                    {/* Simplified Gradient Overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-20`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Top Section with Icon and Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <div className="bg-background/20 backdrop-blur-sm p-3 rounded-xl">
                        <IconComponent className="w-5 h-5 text-foreground" />
                      </div>
                      
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(category.badge)}`}>
                          {category.badge}
                        </span>
                        
                        <div className="bg-background/90 px-3 py-1 rounded-full text-xs font-semibold text-foreground">
                          {category.productCount} items
                        </div>
                      </div>
                    </div>

                    {/* Growth Indicator - Only show on hover */}
                    <AnimatePresence>
                      {hoveredCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-3 left-4"
                        >
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-bold">{category.growth}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Section */}
                  <div className="relative h-2/5 p-4 bg-card flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-semibold text-muted-foreground">4.8</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    {/* Stats and CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Users className="w-3 h-3" />
                          <span>2.5k+</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>{category.trendingCount}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                        <span>Explore</span>
                        <div className="bg-muted group-hover:bg-primary/10 p-1 rounded-full">
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Simplified CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {categories.slice(0, 3).map((cat, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full bg-primary border-2 border-background shadow-sm flex items-center justify-center`}
                  >
                    <cat.IconComponent className="w-4 h-4 text-primary-foreground" />
                  </div>
                ))}
              </div>
              <div className="text-foreground">
                <div className="font-semibold">50,000+</div>
                <div className="text-xs text-muted-foreground">Happy Customers</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <p className="text-muted-foreground mt-4 text-sm">
              Join millions of satisfied customers exploring premium products
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;