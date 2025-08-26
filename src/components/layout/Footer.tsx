import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, 
         Heart, ArrowUp, Shield, Truck, Clock, Gift, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = {
    'Customer Care': [
      'Contact Us',
      'Shipping Info',
      'Returns & Exchanges',
      'Size Guide',
      'FAQ'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Press',
      'Sustainability',
      'Affiliates'
    ],
    'Legal': [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'Accessibility',
      'Security'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-300' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-300' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-300' }
  ];

  const features = [
    { icon: Shield, text: 'Secure Payment', desc: '100% secured payment methods' },
    { icon: Truck, text: 'Fast Delivery', desc: 'Free shipping on orders over $50' },
    { icon: Clock, text: '24/7 Support', desc: 'Dedicated customer support' },
    { icon: Gift, text: 'Gift Cards', desc: 'Perfect presents for loved ones' },
    { icon: CreditCard, text: 'Easy Returns', desc: '30-day money back guarantee' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Feature highlights */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100"
              >
                <div className="p-3 mb-3 rounded-full bg-red-600 text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm mb-1 text-gray-900">{feature.text}</h4>
                <p className="text-xs text-red-600">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div> */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-red-600 font-bold text-lg">P</span>
                </motion.div>
                <span className="text-2xl font-bold text-white">Phoenix</span>
              </div>

              {/* Description */}
              <p className="text-red-100 leading-relaxed max-w-md">
                Discover premium products that define modern elegance and exceptional quality. 
                Your destination for curated collections and innovative designs.
              </p>

              {/* Newsletter Subscription */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Stay in the loop</h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-red-400/30 text-white placeholder:text-red-200"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-white text-red-600 hover:bg-red-50"
                  >
                    Subscribe
                  </Button>
                </form>
                {subscribed && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-300"
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm ${social.color} transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-red-100 hover:text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={itemVariants} className="space-y-5">
                <h3 className="font-semibold text-lg text-white">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="text-red-100 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-1 h-1 bg-white rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h3 className="font-semibold text-lg text-white">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-red-100">
                  <Mail className="w-5 h-5 mt-0.5 text-white" />
                  <span>hello@phoenix.com</span>
                </div>
                <div className="flex items-start space-x-3 text-red-100">
                  <Phone className="w-5 h-5 mt-0.5 text-white" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start space-x-3 text-red-100">
                  <MapPin className="w-5 h-5 mt-0.5 text-white" />
                  <span>123 Design Street, Creative City, NY 10001</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-8 border-t border-red-500/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-red-100">
              <span>© 2024 Phoenix. Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-4 h-4 fill-white text-white" />
              </motion.div>
              <span>for modern commerce</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-red-100">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-white" />
                Secure Shopping
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center">
                <Truck className="w-4 h-4 mr-1 text-white" />
                Fast Shipping
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-white" />
                24/7 Support
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-3 bg-white text-red-600 rounded-full shadow-lg z-50 hover:bg-red-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;