import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, User, Menu, X, LogIn, UserPlus,
  MessageSquare, Bell, Heart, Megaphone, PlusCircle,
  LogOut, Settings, BarChart2, MessageCircle, Store,
  Home, ShoppingCart, Grid, Info, Mail
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Shop', path: '/shop', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'Categories', path: '/categories', icon: <Grid className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === '/';

  const profileMenuItems = [
    { name: 'My Shop', icon: <Store className="w-4 h-4" />, action: () => navigate('/my-shop') },
    { name: 'Performance', icon: <BarChart2 className="w-4 h-4" />, action: () => navigate('/performance') },
    { name: 'Settings', icon: <Settings className="w-4 h-4" />, action: () => navigate('/settings') },
    { name: 'Feedback', icon: <MessageCircle className="w-4 h-4" />, action: () => navigate('/feedback') },
    { name: 'Logout', icon: <LogOut className="w-4 h-4" />, action: () => console.log('Logging out...') }
  ];

  // Icon variants for animation
  const iconVariants = {
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  // Badge animation
  const badgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-medium backdrop-blur-lg bg-background/80'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between lg:gap-8">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                {/* <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white font-bold text-lg">P</span>
                </motion.div> */}
              </div>
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Phoenix
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.a
                    href={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                    variants={{
                      hover: { y: -2 },
                      tap: { y: 0 }
                    }}
                  >
                    <motion.span
                      variants={{
                        hover: { scale: 1.1 },
                        tap: { scale: 0.95 }
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                  </motion.a>

                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Auth Buttons (only on Home) */}
              {isHome && (
                <div className="hidden md:flex items-center space-x-2">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/login')}
                      className="flex items-center space-x-1.5 rounded-full px-4"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Button
                      size="sm"
                      onClick={() => navigate('/signup')}
                      className="flex items-center space-x-1.5 rounded-full px-4 bg-gradient-to-r from-primary to-purple-600"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Icons Row */}
              <div className="flex items-center space-x-3">
                {!isHome && (
                  <>
                    {/* Messaging */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative p-2 rounded-full transition-all duration-200 cursor-pointer group hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hidden md:block"
                      onClick={() => navigate('/messages')}
                    >
                      <MessageSquare className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                      <motion.span
                        variants={badgeVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
                      >
                        2
                      </motion.span>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative p-2 rounded-full hover:bg-accent cursor-pointer group hidden md:block"
                      onClick={() => navigate('/notifications')}
                    >
                      <Bell className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                      <motion.span
                        variants={badgeVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
                      >
                        5
                      </motion.span>
                    </motion.div>

                    {/* Wish List */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="p-2 rounded-full hover:bg-accent cursor-pointer group hidden md:block"
                      onClick={() => navigate('/wish-list')}
                    >
                      <Heart className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                    </motion.div>

                    {/* Ads */}
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="p-2 rounded-full hover:bg-accent cursor-pointer group hidden md:block"
                      onClick={() => navigate('/ads')}
                    >
                      <Megaphone className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                    </motion.div>

                    {/* Sell */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                      <Button
                        size="sm"
                        onClick={() => navigate('/sell')}
                        className="flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-primary to-purple-600"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Sell</span>
                      </Button>
                    </motion.div>
                  </>
                )}

                {/* Cart (always) */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative p-2 rounded-full hover:bg-accent cursor-pointer group"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingBag className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                  <motion.span
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    3
                  </motion.span>
                </motion.div>

                {/* User Dropdown (always) */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileMenuOpen(true)}
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 rounded-full hover:bg-accent cursor-pointer group"
                  >
                    <User className="w-5 h-5 text-foreground/80 group-hover:text-white transition-colors" />
                  </motion.div>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl p-2 z-50 overflow-hidden"
                        style={{ originY: 0, originX: 1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />

                        <div className="relative space-y-1">
                          <div className="px-3 py-2 border-b border-border/50">
                            <p className="font-medium text-sm">John Doe</p>
                            <p className="text-xs text-muted-foreground">john@example.com</p>
                          </div>

                          {profileMenuItems.map((item, index) => (
                            <motion.div
                              key={item.name}
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent cursor-pointer rounded-md text-sm group"
                              onClick={item.action}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                  delay: index * 0.05,
                                  type: "spring",
                                  stiffness: 500
                                }
                              }}
                              whileHover={{ x: 4 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="text-foreground/80 group-hover:text-white transition-colors"
                              >
                                {item.icon}
                              </motion.div>
                              <span className="group-hover:text-white transition-colors">{item.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 w-80 h-full bg-background border-l border-border/50 shadow-2xl z-50 lg:hidden overflow-y-auto"
                  style={{ originX: 1 }}
                >
                  <div className="flex flex-col h-full p-6 space-y-8">
                    {/* Header with close button */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-bold font-heading">Phoenix</span>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-full hover:bg-accent"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* 🔥 Navigation Items stacked */}
                    <div className="flex flex-col space-y-3">
                      {navigationItems.map((item) => (
                        <motion.button
                          key={item.name}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium ${
                            isActive(item.path)
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-accent text-foreground/80'
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* existing Action Icons for Mobile (Messages, Notifications, etc.) */}
                    <div className="grid grid-cols-4 gap-2 py-4 border-t border-border/50">
                      {/* ...your existing icon blocks here ... */}
                    </div>

                    {/* Sell button and auth buttons remain below */}
                  </div>
                </motion.div>

              </>
            )}
          </AnimatePresence>

          {/* Mobile Search */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isScrolled ? 1 : 0,
              height: isScrolled ? 'auto' : 0
            }}
            className="md:hidden mt-3 overflow-hidden"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-full bg-background/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
