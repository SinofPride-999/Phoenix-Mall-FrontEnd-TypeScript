import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroBanner: React.FC = () => {
  const banners = [
    {
      url: 'https://hayden-hill.com/cdn/shop/articles/AdobeStock',
      title: "Summer Collection",
      subtitle: "Discover our new arrivals",
      cta: "Shop Now"
    },
    {
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
      title: "Elegant Accessories", 
      subtitle: "Elevate your style",
      cta: "Explore"
    },
    {
      url: 'https://images.unsplash.com/photo-1600180758895-6e1f4f28b7f5',
      title: "Exclusive Offers",
      subtitle: "Limited time only", 
      cta: "See More"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg my-3 sm:my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={banners[currentIndex].url}
                alt={banners[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 text-white">
                  <motion.h2 
                    key={`title-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                  >
                    {banners[currentIndex].title}
                  </motion.h2>
                  
                  <motion.p 
                    key={`subtitle-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4"
                  >
                    {banners[currentIndex].subtitle}
                  </motion.p>
                  
                  <motion.button
                    key={`cta-${currentIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md"
                  >
                    {banners[currentIndex].cta}
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-4 sm:w-6'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;