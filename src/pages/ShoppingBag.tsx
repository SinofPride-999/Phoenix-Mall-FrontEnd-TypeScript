import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { X } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

const ShoppingBag = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'MacBook Pro M4', image: 'https://hips.hearstapps.com/hmg-prod/images/apple-m4-macbook-pro-lead-672b861685fd0.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*', color: 'Black', size: 'L', price: 3999, quantity: 3 },
    { id: 2, name: 'Nike Kyrie 7', image: 'https://cdn-images.farfetch-contents.com/18/41/34/84/18413484_39657533_600.jpg', color: 'White', size: 'L', price: 399, quantity: 1 },
    { id: 3, name: 'Samsung Fridge', image: 'https://images.samsung.com/is/image/samsung/assets/us/explore/family-hub-refrigerator/overview/10232024/DA-FHMLP-FT02-ControlYourHome-MO.png?$720_N_PNG$', color: 'Gray', size: 'L', price: 1789, quantity: 1 },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // can dynamically change based on selection
  const vat = 19;
  const total = subtotal + shipping + vat;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 pt-10">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-border pb-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-medium">${item.price}</p>

                  {/* Quantity */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      –
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="font-bold">${item.price * item.quantity}</p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border border-border rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-6">Cart Totals</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              <div>
                <span className="text-muted-foreground block mb-2">Shipping</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="shipping" /> Free shipping
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="shipping" /> Flat rate: $49
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="shipping" /> Local pickup: $8
                  </label>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Shipping to AL.</p>
                <button className="mt-1 text-xs text-primary underline">
                  Change address
                </button>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span className="font-medium">${vat}</span>
              </div>

              <div className="flex justify-between font-bold text-lg pt-4 border-t border-border">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ShoppingBag;
