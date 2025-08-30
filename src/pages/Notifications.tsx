import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  X,
  Settings,
  Filter,
  ShoppingBag,
  TrendingUp,
  Star,
  MessageSquare,
  Heart,
  UserPlus,
  AlertCircle,
  CreditCard,
  Truck,
  Package,
  Calendar,
  Clock
} from 'lucide-react';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';

// Notification types
type NotificationType =
  | 'order'
  | 'promotion'
  | 'message'
  | 'like'
  | 'follow'
  | 'alert'
  | 'payment'
  | 'shipping'
  | 'restock'
  | 'event';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  image?: string;
  link?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Generate sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'order',
        title: 'Order Confirmed',
        description: 'Your order #12345 has been confirmed and is being processed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        isRead: false,
        image: 'https://images.unsplash.com/photo-1606811977443-5b93cf48c6a9?w=100&h=100&fit=crop'
      },
      {
        id: '2',
        type: 'promotion',
        title: 'Special Offer Just For You',
        description: 'Get 20% off on your next purchase with code SUMMER20.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop'
      },
      {
        id: '3',
        type: 'message',
        title: 'New Message from Sarah',
        description: 'Sarah: "Hi! I\'m interested in the camera you\'re selling"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        isRead: false,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: '4',
        type: 'like',
        title: 'Your Item Got Liked',
        description: 'Mike liked your product "Vintage Camera".',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: '5',
        type: 'shipping',
        title: 'Order Shipped',
        description: 'Your order #12345 has been shipped. Track your package.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&h=100&fit=crop'
      },
      {
        id: '6',
        type: 'follow',
        title: 'New Follower',
        description: 'Emily Davis started following you.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: '7',
        type: 'payment',
        title: 'Payment Received',
        description: 'Your payment of $129.99 for order #12345 was successful.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop'
      },
      {
        id: '8',
        type: 'restock',
        title: 'Back in Stock',
        description: 'The product "Wireless Headphones" you wanted is back in stock.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      },
      {
        id: '9',
        type: 'event',
        title: 'Upcoming Sale Event',
        description: 'Flash sale starting this Friday! Up to 50% off on electronics.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop'
      },
      {
        id: '10',
        type: 'alert',
        title: 'Security Alert',
        description: 'New login from a new device. Was this you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
        isRead: true,
        image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=100&h=100&fit=crop'
      }
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.isRead).length);
  }, []);

  // Filter notifications based on selected filter
  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => prev - 1);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (!notifications.find(n => n.id === id)?.isRead) {
      setUnreadCount(prev => prev - 1);
    }
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      case 'promotion': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'shipping': return <Truck className="w-5 h-5 text-indigo-500" />;
      case 'restock': return <Package className="w-5 h-5 text-orange-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-pink-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Format timestamp to relative time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  };

  // Filter options
  const filterOptions: { value: NotificationType | 'all', label: string, icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Bell className="w-4 h-4" /> },
    { value: 'order', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { value: 'promotion', label: 'Promotions', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'message', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'like', label: 'Likes', icon: <Heart className="w-4 h-4" /> },
    { value: 'follow', label: 'Follows', icon: <UserPlus className="w-4 h-4" /> },
    { value: 'alert', label: 'Alerts', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-8 h-8 text-blue-600" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </div>
              <h1 className="text-3xl font-bold font-heading">Notifications</h1>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  unreadCount === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                Mark all as read
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>

          <p className="text-gray-600 mt-2">
            Stay updated with your account activities
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 overflow-x-auto"
        >
          <div className="flex space-x-2 pb-2">
            {filterOptions.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setFilter(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === option.value
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    delay: index * 0.03
                  }}
                  className={`border-b border-gray-100 last:border-b-0 ${
                    !notification.isRead ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="p-4 flex items-start">
                    {/* Notification Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm border border-gray-200 mr-4"
                    >
                      {getNotificationIcon(notification.type)}
                    </motion.div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>

                        {/* Notification Image */}
                        {notification.image && (
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={notification.image}
                            alt="Notification"
                            className="w-12 h-12 rounded-lg object-cover ml-4"
                          />
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-green-500 hover:bg-green-100 rounded-full transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                        title="Delete notification"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                      className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    />
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-4 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No notifications</h3>
                <p className="text-gray-500 max-w-md">
                  {filter === 'all'
                    ? "You're all caught up! No new notifications at the moment."
                    : `No ${filter} notifications to show.`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setShowSettings(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-xl shadow-large p-6 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Notification Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Order Updates', defaultChecked: true },
                    { label: 'Promotions', defaultChecked: true },
                    { label: 'Messages', defaultChecked: true },
                    { label: 'Likes & Follows', defaultChecked: true },
                    { label: 'Security Alerts', defaultChecked: true },
                    { label: 'Product Restocks', defaultChecked: false },
                    { label: 'Event Reminders', defaultChecked: false },
                  ].map((setting, index) => (
                    <motion.div
                      key={setting.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{setting.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={setting.defaultChecked}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Notifications;
