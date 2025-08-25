import React from 'react';
import { easeOut, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest tech & gadgets for your everyday needs and entertainment",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=600&fit=crop",
    productCount: 145,
    color: "from-blue-500/20 to-purple-500/20",
    height: "h-64" // Added height property for masonry variation
  },
  {
    id: 2,
    name: "Fashion",
    description: "Trendy clothing & accessories to express your unique style",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop",
    productCount: 289,
    color: "from-pink-500/20 to-rose-500/20",
    height: "h-80"
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Modern furniture & decor to transform your living spaces",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    productCount: 167,
    color: "from-green-500/20 to-emerald-500/20",
    height: "h-72"
  },
  {
    id: 4,
    name: "Beauty",
    description: "Skincare & cosmetics to enhance your natural beauty and confidence",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop",
    productCount: 98,
    color: "from-amber-500/20 to-orange-500/20",
    height: "h-60"
  },
  {
    id: 5,
    name: "Sports & Fitness",
    description: "Active lifestyle essentials to keep you moving and healthy",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
    productCount: 134,
    color: "from-cyan-500/20 to-blue-500/20",
    height: "h-96"
  },
  {
    id: 6,
    name: "Books & Media",
    description: "Knowledge & entertainment for your mind and soul",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop",
    productCount: 76,
    color: "from-violet-500/20 to-purple-500/20",
    height: "h-68"
  }
];

const CategoriesSection: React.FC = () => {
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
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
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
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of carefully curated categories, each offering premium products tailored to your lifestyle.
          </p>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              className="group cursor-pointer break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-large transition-all duration-500">
                {/* Background Image */}
                <div className={`relative ${category.height} overflow-hidden`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-50 transition-opacity duration-300`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                      {category.productCount} items
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-2 text-primary font-medium group-hover:text-primary-glow transition-colors duration-300"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-button-outline px-8 py-3 group"
          >
            View All Categories
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;