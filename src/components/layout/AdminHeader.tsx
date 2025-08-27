import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Bell,
  MessageSquare,
  User,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminHeader: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuItems = [
    { name: 'Settings', icon: <Settings className="w-4 h-4" />, action: () => console.log('Settings clicked') },
    { name: 'Logout', icon: <LogOut className="w-4 h-4" />, action: () => console.log('Logging out...') }
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Right side - Icons and profile */}
          <div className="flex items-center space-x-3 ml-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="w-5 h-5" />
            </Button>

            {/* Profile dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <User className="w-5 h-5" />
              </Button>

              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  {profileMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;