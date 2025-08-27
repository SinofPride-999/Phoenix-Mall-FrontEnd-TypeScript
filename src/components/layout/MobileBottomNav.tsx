import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { 
      name: 'Home', 
      icon: Home, 
      path: '/',
      badge: null
    },
    { 
      name: 'Shop', 
      icon: Search, 
      path: '/shop',
      badge: null
    },
    { 
      name: 'Cart', 
      icon: ShoppingBag, 
      path: '/shopping-bag',
      badge: 3
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/profile',
      badge: null
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      style={{
        // This ensures it stays above the footer
        position: 'fixed',
        bottom: '1rem',
      }}
    >
      {/* Glass effect container with rounded corners */}
      <div 
        className="glass rounded-2xl border border-white/20 backdrop-blur-xl p-3 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            
            return (
              <motion.button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-white/20 text-red-600' 
                    : 'text-black/70 hover:text-green hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: active ? 1.05 : 1,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px]"
                    >
                      {tab.badge}
                    </motion.span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{tab.name}</span>
                
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileBottomNav;