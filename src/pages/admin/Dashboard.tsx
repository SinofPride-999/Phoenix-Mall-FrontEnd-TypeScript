import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  Settings, 
  ShoppingCart,
  Sliders,
  Tag,
  BarChart3,
  Home,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Menu
} from 'lucide-react';
import AdminHeader from '@/components/layout/AdminHeader';
import { Button } from '@/components/ui/button';

// Simple line chart component
const RevenueChart = () => {
  const data = [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 120];
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full h-64 mt-4">
      <div className="flex items-end justify-between h-48">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-1">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Monthly Revenue</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data for the dashboard
  const statsData = {
    totalOrders: 3,
    totalAmount: 481.34,
    deliveredOrders: 0,
    deliveredAmount: 0.00,
    cancelledOrders: 3,
    cancelledAmount: 481.34,
    pendingAmount: 481.34
  };

  const revenueData = {
    earnings: 37802,
    earningsChange: -0.56,
    other: 28305,
    otherChange: -0.56
  };

  const recentOrders = [
    {
      id: 1,
      orderNo: 'ORD-001',
      customer: 'John Doe',
      phone: '+1234567890',
      subtotal: 150.00,
      tax: 15.00,
      total: 165.00,
      status: 'Pending',
      orderDate: '2023-12-15',
      totalItems: 3,
      delivered: false
    },
    {
      id: 2,
      orderNo: 'ORD-002',
      customer: 'Jane Smith',
      phone: '+0987654321',
      subtotal: 250.00,
      tax: 25.00,
      total: 275.00,
      status: 'Delivered',
      orderDate: '2023-12-14',
      totalItems: 5,
      delivered: true
    },
    {
      id: 3,
      orderNo: 'ORD-003',
      customer: 'Mike Johnson',
      phone: '+1122334455',
      subtotal: 75.50,
      tax: 7.55,
      total: 83.05,
      status: 'Cancelled',
      orderDate: '2023-12-13',
      totalItems: 2,
      delivered: false
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'brand', name: 'Brand', icon: Tag },
    { id: 'category', name: 'Category', icon: Sliders },
    { id: 'order', name: 'Order', icon: ShoppingCart },
    { id: 'slider', name: 'Slider', icon: Sliders },
    { id: 'coupons', name: 'Coupons', icon: Tag },
    { id: 'user', name: 'User', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex pt-16">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Main Home</h3>
              <ul className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                  <p className="text-xl font-bold text-gray-800">{statsData.totalOrders}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">Total Amount</p>
                <p className="text-md font-semibold text-gray-800">${statsData.totalAmount.toFixed(2)}</p>
              </div>
            </motion.div>

            {/* Delivered Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Delivered Orders</h3>
                  <p className="text-xl font-bold text-gray-800">{statsData.deliveredOrders}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">Delivered Amount</p>
                <p className="text-md font-semibold text-gray-800">${statsData.deliveredAmount.toFixed(2)}</p>
              </div>
            </motion.div>

            {/* Cancelled Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Cancelled Orders</h3>
                  <p className="text-xl font-bold text-gray-800">{statsData.cancelledOrders}</p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">Pending Amount</p>
                <p className="text-md font-semibold text-gray-800">${statsData.pendingAmount.toFixed(2)}</p>
              </div>
            </motion.div>

            {/* Canceled Orders Amount */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Canceled Amount</h3>
                  <p className="text-xl font-bold text-gray-800">${statsData.cancelledAmount.toFixed(2)}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Tag className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600">Total canceled value</p>
                <p className="text-md font-semibold text-gray-800">${statsData.cancelledAmount.toFixed(2)}</p>
              </div>
            </motion.div>
          </div>

          {/* Revenue Section with Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Earnings Revenue with Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Earnings revenue</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xl font-bold text-gray-800">${revenueData.earnings.toLocaleString()}</p>
                  <p className={`text-sm flex items-center ${revenueData.earningsChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {revenueData.earningsChange < 0 ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(revenueData.earningsChange)}%
                  </p>
                </div>
              </div>
              <RevenueChart />
            </motion.div>

            {/* Other Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Revenue</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-800">${revenueData.other.toLocaleString()}</p>
                  <p className={`text-sm flex items-center ${revenueData.otherChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {revenueData.otherChange < 0 ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(revenueData.otherChange)}%
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OrderNo</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.phone}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.orderDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;