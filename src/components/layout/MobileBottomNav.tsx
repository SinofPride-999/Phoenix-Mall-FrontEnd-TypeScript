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
      path: '/cart',
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
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="glass border-t border-border/50 px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            
            return (
              <motion.button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={`bottom-tab ${active ? 'active' : ''}`}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: active ? 1.05 : 1,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative">
                  <Icon className="bottom-tab-icon" />
                  {tab.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px]"
                    >
                      {tab.badge}
                    </motion.span>
                  )}
                </div>
                <span className="mt-1">{tab.name}</span>
                
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
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