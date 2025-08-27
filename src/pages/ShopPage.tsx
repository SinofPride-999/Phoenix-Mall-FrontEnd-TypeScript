import React, { useState } from 'react';
import { 
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import ProductGrid from '@/components/sections/ProductGrid';

// Product data
const products = [
  {
    id: 1,
    name: "Minimalist Smart Watch",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    category: "Electronics",
    badge: "New",
    description: "Sleek smartwatch with health tracking, notifications, and 7-day battery life.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "TechHub Ghana",
    inStock: true,
  },
  {
    id: 2,
    name: "Luxury Leather Handbag",
    price: 189,
    originalPrice: 250,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    category: "Fashion",
    badge: "Bestseller",
    description: "Premium handcrafted leather handbag with elegant finish and multiple compartments.",
    location: "Kumasi, Ghana",
    condition: "Used",
    isLiked: true,
    discount: 24,
    seller: "Fashion Forward",
    inStock: true,
  },
  {
    id: 3,
    name: "Professional Camera Lens",
    price: 450,
    originalPrice: 599,
    rating: 4.7,
    reviews: 67,
    image: "https://www.shutterstock.com/image-vector/camera-photo-lens-front-view-600nw-1901097127.jpg",
    category: "Electronics",
    badge: "Sale",
    description: "High-quality 50mm prime lens perfect for portraits and professional photography.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: "Photo Pro Store",
    inStock: true,
  },
  {
    id: 4,
    name: "Vintage Acoustic Guitar",
    price: 320,
    rating: 4.6,
    reviews: 45,
    image: "https://vintageguitarsus.com/cdn/shop/products/VE880WK.jpg?v=1621707076",
    category: "Music",
    badge: "Rare",
    description: "Beautiful vintage acoustic guitar with rich, warm tone. Perfect for professionals.",
    location: "Cape Coast, Ghana",
    condition: "Used",
    isLiked: false,
    seller: "Music Masters",
    inStock: true,
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 129,
    originalPrice: 180,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
    category: "Fashion",
    badge: "Trending",
    description: "Stylish designer sunglasses with UV protection and premium build quality.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 28,
    seller: "Style Central",
    inStock: false,
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    price: 185,
    originalPrice: 229,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Electronics",
    badge: "Hot",
    description: "RGB backlit mechanical keyboard with tactile switches, perfect for gaming.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 19,
    seller: "Gaming World",
    inStock: true,
  },
  {
    id: 7,
    name: "Wireless Bluetooth Earbuds",
    price: 99,
    originalPrice: 150,
    rating: 4.6,
    reviews: 210,
    image: "https://m.media-amazon.com/images/I/71exNLc-CnL._AC_SL1500_.jpg",
    category: "Electronics",
    badge: "Hot Deal",
    description: "Compact wireless earbuds with noise cancellation and long battery life.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 34,
    seller: "AudioTech GH",
    inStock: true,
  },
  {
    id: 8,
    name: "Modern Office Chair",
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviews: 75,
    image: "https://www.scandesign.com/cdn/shop/products/1115-FLOW-CHAIR-tall11_1200x.jpg?v=1617043882",
    category: "Furniture",
    badge: "Comfort",
    description: "Ergonomic office chair with adjustable height and lumbar support.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 17,
    seller: "FurniWorld",
    inStock: true,
  },
  {
    id: 9,
    name: "Premium Running Shoes",
    price: 140,
    originalPrice: 180,
    rating: 4.8,
    reviews: 132,
    image: "https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/53/53-best-running-shoes-15275001-main.jpg",
    category: "Fashion",
    badge: "Athletic",
    description: "Lightweight, comfortable running shoes designed for performance.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 22,
    seller: "SportsHub",
    inStock: true,
  },
  {
    id: 10,
    name: "Smart LED TV 55-inch",
    price: 780,
    originalPrice: 950,
    rating: 4.7,
    reviews: 64,
    image: "https://www.jiomart.com/images/product/original/492579418/onida-139-7-cm-55-inch-ultra-hd-4k-led-smart-tv-55uiv-s-digital-o492579418-p591004127-3-202206212136.jpeg?im=Resize=(420,420)",
    category: "Electronics",
    badge: "4K UHD",
    description: "55-inch Smart LED TV with 4K UHD resolution and streaming apps.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "ElectroMart",
    inStock: true,
  },
  {
    id: 11,
    name: "Stainless Steel Cookware Set",
    price: 220,
    originalPrice: 280,
    rating: 4.7,
    reviews: 58,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ci9dwxrfEfMycEma-aKSvS9kirgkFASnKw&s",
    category: "Home & Kitchen",
    badge: "Top Pick",
    description: "Durable stainless steel pots and pans set with non-stick coating.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 21,
    seller: "HomeEase",
    inStock: true,
  },
  {
    id: 12,
    name: "Compact Coffee Maker",
    price: 145,
    originalPrice: 180,
    rating: 4.6,
    reviews: 91,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsPtpey0Wkwx2usAuxxHcbZIqpxRPbbGWsQ&s",
    category: "Appliances",
    badge: "Hot",
    description: "Quick brew coffee maker with programmable settings.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 19,
    seller: "KitchenPro",
    inStock: true,
  },
  {
    id: 13,
    name: "Fitness Resistance Bands",
    price: 40,
    originalPrice: 60,
    rating: 4.5,
    reviews: 130,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozNtesAxtSZZXhbSEPDcGsK119jCbZz4pJw&s",
    category: "Sports",
    badge: "Bestseller",
    description: "Set of 5 resistance bands for strength training and workouts.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 33,
    seller: "FitLife GH",
    inStock: true,
  },
  {
    id: 14,
    name: "Luxury Silk Bedsheet Set",
    price: 175,
    originalPrice: 210,
    rating: 4.8,
    reviews: 76,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SqtFdo0YB9mHOFacN8IrSy5sJh0CEvKBGA&s",
    category: "Home & Living",
    badge: "Luxury",
    description: "Soft silk bedsheet set with pillow covers for a luxurious sleep.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 17,
    seller: "CozyHome",
    inStock: true,
  },
  {
    id: 15,
    name: "Noise-Cancelling Headphones",
    price: 210,
    originalPrice: 280,
    rating: 4.9,
    reviews: 200,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/09/noise-cancelling-headphone-2048px-0876.jpg?auto=webp&quality=75&width=1024",
    category: "Electronics",
    badge: "Premium",
    description: "Over-ear wireless headphones with advanced noise cancellation.",
    location: "Cape Coast, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 25,
    seller: "AudioMax",
    inStock: true,
  },
  {
    id: 16,
    name: "Smart Fitness Tracker",
    price: 115,
    originalPrice: 150,
    rating: 4.6,
    reviews: 188,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHl1XIPyeFzCkuX_vrCZ8KEQHQ7wkTB0LOg&s",
    category: "Electronics",
    badge: "Hot Deal",
    description: "Waterproof fitness tracker with heart rate and sleep monitoring.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 23,
    seller: "Techie GH",
    inStock: true,
  },
  {
    id: 17,
    name: "Portable Projector",
    price: 299,
    originalPrice: 370,
    rating: 4.5,
    reviews: 65,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9LybFUs_bSjqSc2WhbbsFl-ByhywGHyPSg&s",
    category: "Electronics",
    badge: "Trending",
    description: "Compact HD projector with built-in speakers and WiFi.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 19,
    seller: "VisionTech",
    inStock: true,
  },
  {
    id: 18,
    name: "Designer Wristwatch",
    price: 350,
    originalPrice: 430,
    rating: 4.7,
    reviews: 98,
    image: "https://www.cartrollers.com/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-08-at-7.25.24-PM-600x800.jpeg",
    category: "Fashion",
    badge: "Luxury",
    description: "Elegant designer wristwatch with leather strap and chronograph.",
    location: "Takoradi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 19,
    seller: "Luxury Time",
    inStock: true,
  },
  {
    id: 19,
    name: "Wireless Charging Pad",
    price: 60,
    originalPrice: 85,
    rating: 4.6,
    reviews: 144,
    image: "https://ptron.in/cdn/shop/products/51sH32iCy4L._SL1100.jpg?v=1632806065",
    category: "Electronics",
    badge: "New",
    description: "Fast wireless charger compatible with iPhone and Android.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 29,
    seller: "ElectroMart",
    inStock: true,
  },
  {
    id: 20,
    name: "Premium Leather Wallet",
    price: 85,
    originalPrice: 120,
    rating: 4.8,
    reviews: 156,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14-IsC2acvXh3CHxqpoZyOqVldGfkMs-Q-g&s",
    category: "Fashion",
    badge: "Bestseller",
    description: "Classic men's leather wallet with RFID blocking.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 29,
    seller: "Style Central",
    inStock: true,
  },
  {
    id: 21,
    name: "Mini Air Purifier",
    price: 110,
    originalPrice: 145,
    rating: 4.6,
    reviews: 73,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvTrajriHqLj3wqxI8jLfWeJbOGIJYzFA1zQ&s",
    category: "Home Appliances",
    badge: "New Arrival",
    description: "Compact air purifier with HEPA filter for fresh air at home.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 24,
    seller: "CleanAir GH",
    inStock: true,
  },
  {
    id: 22,
    name: "Stylish Backpack",
    price: 130,
    originalPrice: 160,
    rating: 4.7,
    reviews: 119,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMR2gUh2fadsgCT2gYnGWben1nBiS-H832w&s",
    category: "Fashion",
    badge: "Trending",
    description: "Durable backpack with multiple compartments for everyday use.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 18,
    seller: "Urban Gear",
    inStock: true,
  },
  {
    id: 23,
    name: "4K Drone Camera",
    price: 590,
    originalPrice: 720,
    rating: 4.8,
    reviews: 84,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb35QtsAaL3k3nfVNk2tolZk7QifvoRBgd_w&s",
    category: "Electronics",
    badge: "Hot",
    description: "Professional drone with 4K camera and GPS stabilization.",
    location: "Cape Coast, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 18,
    seller: "DroneZone",
    inStock: true,
  },
  {
    id: 24,
    name: "Deluxe Yoga Mat",
    price: 70,
    originalPrice: 95,
    rating: 4.7,
    reviews: 132,
    image: "https://megango.com/media/catalog/product/cache/e328e8185e7eb650e829953bde1cea67/t/p/tpe-deluxe-yoga-mat-125cm-x-61cm-x-14mm.jpg",
    category: "Sports",
    badge: "Bestseller",
    description: "Thick non-slip yoga mat with carrying strap.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 26,
    seller: "FitLife GH",
    inStock: true,
  },
  {
    id: 25,
    name: "Modern Floor Lamp",
    price: 190,
    originalPrice: 240,
    rating: 4.6,
    reviews: 92,
    image: "https://media.istockphoto.com/id/1474563913/photo/modern-floor-lamp.jpg?s=612x612&w=0&k=20&c=IjRRD-yyIxfXLhy5TDg9MIDPi9y5yHvSGSRyFxL8P58=",
    category: "Home Decor",
    badge: "New",
    description: "Elegant floor lamp with adjustable lighting settings.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 21,
    seller: "BrightLiving",
    inStock: true,
  },
  {
    id: 26,
    name: "Portable Bluetooth Speaker",
    price: 125,
    originalPrice: 160,
    rating: 4.8,
    reviews: 176,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeubwweyazZoF76slKEzChR939yaW3s9U3nw&s",
    category: "Electronics",
    badge: "Hot Deal",
    description: "Waterproof speaker with powerful bass and 12-hour playtime.",
    location: "Takoradi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 22,
    seller: "AudioMax",
    inStock: true,
  },
  {
    id: 27,
    name: "Smart Home Security Camera",
    price: 165,
    originalPrice: 210,
    rating: 4.7,
    reviews: 98,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtgg3Pkj2JzZLF6yGx4BvqH-eUylZyL3HhA&s",
    category: "Home Security",
    badge: "Popular",
    description: "WiFi-enabled security camera with motion detection.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 21,
    seller: "SafeHome",
    inStock: true,
  },
  {
    id: 28,
    name: "Electric Kettle",
    price: 65,
    originalPrice: 90,
    rating: 4.5,
    reviews: 150,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZZ4gwPF5guSTtREVDP5xTmvvBJAVCOS3mg&s",
    category: "Appliances",
    badge: "Hot",
    description: "1.5L stainless steel electric kettle with auto shut-off.",
    location: "Kumasi, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 28,
    seller: "KitchenPro",
    inStock: true,
  },
  {
    id: 29,
    name: "Artisan Ceramic Vase",
    price: 95,
    originalPrice: 130,
    rating: 4.8,
    reviews: 54,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXafS_T7SGppIipGr3M9GYtBgJ3THvUm8rg&s",
    category: "Home Decor",
    badge: "New Arrival",
    description: "Handcrafted ceramic vase with unique glaze finish.",
    location: "Tamale, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 27,
    seller: "Artisan Hub",
    inStock: true,
  },
  {
    id: 30,
    name: "Adjustable Standing Desk",
    price: 450,
    originalPrice: 520,
    rating: 4.9,
    reviews: 82,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjw2rIS5FgZgu_BgtoNxKBRKU6GQs8h3BEw&s",
    category: "Furniture",
    badge: "Premium",
    description: "Height-adjustable desk with sturdy frame and modern design.",
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: true,
    discount: 13,
    seller: "FurniWorld",
    inStock: true,
  }
];

const ShopPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('2');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Electronics', 'Fashion', 'Furniture', 
    'Home Appliances', 'Fitness', 'Food', 'Transport'
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const brands = [
    { name: 'TechHub Ghana', count: 78 },
    { name: 'Fashion Forward', count: 89 },
    { name: 'Photo Pro Store', count: 67 },
    { name: 'Music Masters', count: 89 },
    { name: 'Style Central', count: 45 },
    { name: 'Gaming World', count: 32 },
    { name: 'AudioTech GH', count: 23 },
    { name: 'FurniWorld', count: 78 }
  ];

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>
      
      <div className="pt-16">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Mobile Search Bar */}
        <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-gray-200 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* MOBILE FILTER/SORT BUTTONS - ADDED THIS SECTION */}
        <div className="lg:hidden flex items-center justify-between p-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          
          <button
            onClick={() => setShowSort(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 py-4 lg:py-6">
          <div className="flex gap-4 lg:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`block w-full text-left text-sm py-1 hover:text-gray-900 transition-colors ${
                          selectedCategories.includes(category) ? 'text-gray-900 font-medium' : 'text-gray-500'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Colors
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColors.includes(color) ? 'border-gray-900 ring-2 ring-gray-300' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 text-sm border rounded transition-colors ${
                          selectedSizes.includes(size)
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <ProductGrid 
              products={products} 
              viewMode={viewMode} 
              onViewModeChange={setViewMode} 
            />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden flex flex-col"
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-6">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>

                    {/* Categories */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-3 transition-all duration-300 ease-in-out hover:text-gray-900 hover:underline hover:underline-offset-4"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                            />
                            <span className="text-sm text-gray-700 transition-colors duration-300">
                              {category}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 hover:border-gray-400 ${
                              selectedColors.includes(color)
                                ? 'border-gray-900 ring-2 ring-gray-300'
                                : 'border-gray-200'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-3 py-2 text-sm border rounded transform hover:scale-110 hover:border-gray-400 ${
                              selectedSizes.includes(size)
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                          />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                          ${priceRange[0]} - ${priceRange[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Actions - Fixed at bottom */}
                <div className="p-4 border-t border-gray-200 flex gap-3 flex-shrink-0">
                  <button 
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setPriceRange([0, 500]);
                    }}
                    className="flex-1 py-3 text-gray-600 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Sort Modal */}
        <AnimatePresence>
          {showSort && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowSort(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden rounded-t-xl"
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Sort By</h3>
                  <button 
                    onClick={() => setShowSort(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSort(false);
                      }}
                      className={`w-full text-left py-3 px-2 rounded-lg transition-colors ${
                        sortBy === option.value ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Bottom Spacing */}
        <div className="h-20 lg:hidden"></div>
        
        <Footer />
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default ShopPage;