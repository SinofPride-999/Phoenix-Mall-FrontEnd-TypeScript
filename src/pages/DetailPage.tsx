import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Star, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  ZoomOut,
  MessageCircle,
  Phone,
  Copy,
  Shield,
  Truck,
  Clock,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/sections/ProductGrid';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  badge?: string;
  description: string;
  detailedDescription: string;
  specifications: { [key: string]: string };
  location: string;
  condition: string;
  isLiked: boolean;
  discount?: number;
  seller: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    phone: string;
    joinedDate: string;
    itemsSold: number;
  };
  inStock: boolean;
  colors: string[];
  sizes: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: string;
  material: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app, this would come from an API
  const product: Product = {
    id: 1,
    name: "Lightweight Puffer Jacket With a Hood",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 1245,
    images: [
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/578644s.jpg?im=Resize,width=750",
      "https://images.asos-media.com/products/polo-ralph-lauren-terra-chevron-icon-logo-lightweight-hooded-puffer-jacket-in-black/206857129-1-black?$n_640w$&wid=513&fit=constrain",
      "https://i5.walmartimages.com/seo/Entyinea-Womens-Plus-Size-Puffer-Jacket-Stretch-Lightweight-Puffer-Jacket-with-Removeable-Hood-Black-XL_99f72445-7d69-4de3-afa9-d684b958ae1a.8d7c1b357328ffe4e7a77fff46f5d859.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/g/23/288ff1ae-36f4-4efc-9293-2d7a2e333f9c.jpg"
    ],
    category: "Clothing",
    badge: "Bestseller",
    description: "Plusplus red voluptat orci. Force eget ten mauri vehicula elementum gravida nec dui.",
    detailedDescription: "Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ad aliquet magna posuere eget. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    specifications: {
      "Material": "100% Polyester",
      "Lining": "100% Polyester",
      "Closure": "Zipper",
      "Pockets": "2 Side Pockets, 1 Chest Pocket",
      "Care": "Machine Wash Cold",
      "Season": "All Season",
      "Fit": "Regular Fit"
    },
    location: "Accra, Ghana",
    condition: "Brand New",
    isLiked: false,
    discount: 25,
    seller: {
      name: "FashionHub Ghana",
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      phone: "+233 24 123 4567",
      joinedDate: "2022-03-15",
      itemsSold: 1245
    },
    inStock: true,
    colors: ["Black", "Navy Blue", "Forest Green", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Outdoor Gear",
    sku: "JKT-2024-PUFF-001",
    weight: "0.8 kg",
    dimensions: "40 × 30 × 5 cm",
    material: "Polyester with Down Fill"
  };

  const relatedProducts: Product[] = [
    {
      id: 2,
      name: "Winter Parka Jacket",
      price: 399,
      originalPrice: 499,
      rating: 4.7,
      reviews: 892,
      images: ["https://arctic-bay.ca/cdn/shop/collections/DSC_1866_1200x1200.jpg?v=1710628377"],
      category: "Clothing",
      badge: "New",
      description: "Warm winter parka with faux fur hood",
      detailedDescription: "",
      specifications: {},
      location: "Kumasi, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 20,
      seller: {
        name: "Winter Gear",
        rating: 4.8,
        reviews: 345,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    },
    {
      id: 3,
      name: "Lightweight Windbreaker",
      price: 199,
      originalPrice: 249,
      rating: 4.5,
      reviews: 456,
      images: ["https://www.nautica.com/dw/image/v2/BDCV_PRD/on/demandware.static/-/Sites-nautica-master-catalog/default/dwcfdd4c0a/images/0731516000016_JR0302_768_A.jpg?sw=1000&sh=1000&sm=fit"],
      category: "Clothing",
      badge: "Sale",
      description: "Water-resistant windbreaker jacket",
      detailedDescription: "",
      specifications: {},
      location: "Accra, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 20,
      seller: {
        name: "Outdoor Pro",
        rating: 4.6,
        reviews: 234,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    },
    {
      id: 4,
      name: "Denim Jacket Classic",
      price: 279,
      originalPrice: 349,
      rating: 4.8,
      reviews: 678,
      images: ["https://www.bootlegger.com/dw/image/v2/BKBQ_PRD/on/demandware.static/-/Sites-bootlegger-master/default/dw412414d9/images/bootlegger/women/general_apparel/8500NIMES_440_1.jpg?sw=428&sh=570&sm=fit&q=88"],
      category: "Clothing",
      badge: "Popular",
      description: "Classic denim jacket for everyday wear",
      detailedDescription: "",
      specifications: {},
      location: "Takoradi, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 20,
      seller: {
        name: "Denim Co.",
        rating: 4.9,
        reviews: 567,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    },
    {
      id: 5,
      name: "Premium Leather Boots",
      price: 499,
      originalPrice: 599,
      rating: 4.9,
      reviews: 743,
      images: ["https://images-cdn.ubuy.co.in/674e88aa63593977c033fd33-jousen-men-39-s-dress-boots-leather.jpg"],
      category: "Footwear",
      badge: "Bestseller",
      description: "Durable leather boots perfect for winter wear",
      detailedDescription: "",
      specifications: {},
      location: "Kumasi, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 17,
      seller: {
        name: "Urban Footwear",
        rating: 4.8,
        reviews: 412,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    },
    {
      id: 6,
      name: "Casual Hoodie Pullover",
      price: 149,
      originalPrice: 189,
      rating: 4.6,
      reviews: 532,
      images: ["https://images.cloudfable.net/550x550/2022/09/07/Mens-Unisex-Pullover-Hoodie-Sweatshirt-Cartoon-Graphic-Prints-Print-Sports--Outdoor-Daily-Sports-3D-Print-Basic-Casual-Hoodies-Sweatshirts--Green-zz505kps.jpg"],
      category: "Clothing",
      badge: "Hot",
      description: "Comfortable cotton hoodie for everyday wear",
      detailedDescription: "",
      specifications: {},
      location: "Accra, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 21,
      seller: {
        name: "Cozy Wear",
        rating: 4.7,
        reviews: 287,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    },
    {
      id: 7,
      name: "Classic Sneakers",
      price: 229,
      originalPrice: 299,
      rating: 4.7,
      reviews: 615,
      images: ["https://baccabucci.com/cdn/shop/products/MG_6024-min_85a8fdba-e6aa-436c-8b36-f89e78c4fd95.jpg?v=1679387547"],
      category: "Footwear",
      badge: "Trending",
      description: "Stylish and comfortable sneakers for daily use",
      detailedDescription: "",
      specifications: {},
      location: "Tema, Ghana",
      condition: "Brand New",
      isLiked: false,
      discount: 23,
      seller: {
        name: "Sneaker Hub",
        rating: 4.8,
        reviews: 378,
        image: "",
        phone: "",
        joinedDate: "",
        itemsSold: 0
      },
      inStock: true,
      colors: [],
      sizes: [],
      brand: "",
      sku: "",
      weight: "",
      dimensions: "",
      material: ""
    }

  ];

  useEffect(() => {
    setIsLiked(product.isLiked);
    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomEnabled) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleImageLeave = () => {
    setShowZoom(false);
  };

  const toggleZoom = () => {
    setZoomEnabled(!zoomEnabled);
    setShowZoom(false);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(product.seller.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 pt-16">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">HOME</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-gray-900">THE SHOP</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Main Image */}
              <div 
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 cursor-zoom-in"
                onMouseMove={handleImageHover}
                onMouseLeave={handleImageLeave}
              >
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Zoom overlay */}
                {showZoom && zoomEnabled && (
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${product.images[selectedImageIndex]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                      transform: 'scale(1.5)'
                    }}
                  />
                )}

                {/* Zoom toggle button */}
                <button
                  onClick={toggleZoom}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  {zoomEnabled ? (
                    <ZoomOut className="w-5 h-5" />
                  ) : (
                    <ZoomIn className="w-5 h-5" />
                  )}
                </button>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-gray-900 ring-2 ring-gray-300'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.detailedDescription}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg border transition-colors ${
                  isLiked
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-gray-900 ml-2">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900 ml-2">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Brand:</span>
                  <span className="text-gray-900 ml-2">{product.brand}</span>
                </div>
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <span className="text-gray-900 ml-2">{product.condition}</span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900 ml-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.seller.image}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{product.seller.name}</h4>
                  <div className="flex items-center gap-1">
                    {renderStars(product.seller.rating)}
                    <span className="text-sm text-gray-600">
                      ({product.seller.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Items sold:</span>
                  <span className="text-gray-900 ml-2">{product.seller.itemsSold.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-gray-900 ml-2">
                    {new Date(product.seller.joinedDate).getFullYear()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat with Seller
                </button>
                <button
                  onClick={copyPhoneNumber}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Call Seller'}
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Tips from Phoenix
              </h3>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>• Avoid paying in advance, even for delivery</li>
                <li>• Meet with the seller at a safe public place</li>
                <li>• Inspect the item and ensure it's exactly what you want</li>
                <li>• Make sure that the packed item is the one you've inspected</li>
                <li>• Only pay if you're satisfied</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-gray-900 text-sm font-medium text-gray-900">
                DESCRIPTION
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700">
                ADDITIONAL INFORMATION
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700">
                REVIEWS ({product.reviews.toLocaleString()})
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sed do eiusmod tempor incididunt ut labore
              </h2>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why choose this product?</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Created by cotton fabric with soft and smooth texture</li>
                <li>Simple, Configurable (e.g., size, color, etc.), bundled</li>
                <li>High-quality materials with excellent durability</li>
                <li>Perfect for all seasons and various occasions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Number List</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Create Store-specific attributes on the fly</li>
                <li>Simple, Configurable (e.g., size, color, etc.), bundled</li>
                <li>Downloadable/Digital Products, Virtual Products</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <ProductGrid 
            products={relatedProducts} 
            viewMode="3" 
            onViewModeChange={() => {}} 
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailPage;