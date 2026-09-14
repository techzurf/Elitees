import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  const originalTotal = cart.reduce((sum, item) => sum + ((item.product.originalPrice || item.product.price) * item.quantity), 0);
  const discount = originalTotal - cartTotal;
  const shipping = cartTotal > 999 || cartTotal === 0 ? 0 : 50;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-900">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover great products and offers!</p>
        <Link to="/products" className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-md transition-colors shadow-sm">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 flex items-center gap-2">
          Your Cart <span className="text-lg font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{cartCount} items</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-bold text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <div key={item.product.id} className="p-4 md:p-6 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center relative">
                    
                    {/* Mobile Remove Button - Top Right */}
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Product Info */}
                    <div className="flex gap-4 md:col-span-6">
                      <Link to={`/product/${item.product.id}`} className="w-20 h-20 md:w-24 md:h-24 rounded-md border border-gray-100 p-2 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </Link>
                      <div className="flex flex-col justify-center">
                        <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 text-sm md:text-base hover:text-blue-900 pr-6 md:pr-0 line-clamp-2">
                          {item.product.name}
                        </Link>
                        <span className="text-xs text-gray-500 mt-1">{item.product.category}</span>
                        {/* Mobile Price */}
                        <div className="md:hidden mt-2 font-bold text-gray-900">
                          ₹{item.product.price}
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-xs text-gray-500 line-through ml-2 font-normal">₹{item.product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden md:flex flex-col items-center justify-center col-span-2">
                      <span className="font-bold text-gray-900">₹{item.product.price}</span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-xs text-gray-500 line-through mt-0.5">₹{item.product.originalPrice}</span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4 md:mt-0 md:col-span-2 md:justify-center">
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Desktop Remove */}
                    <div className="hidden md:flex items-center justify-end gap-4 col-span-2">
                      <span className="font-bold text-blue-900">₹{item.product.price * item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Mobile Total */}
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Item Total:</span>
                      <span className="font-bold text-blue-900">₹{item.product.price * item.quantity}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">₹{shipping}</span>
                  )}
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-md mb-6 flex gap-2">
                  <div className="font-bold mt-0.5">ℹ</div>
                  <p>Add items worth <strong>₹{999 - cartTotal}</strong> more to get free shipping.</p>
                </div>
              )}

              <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-900">₹{total}</span>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3.5 rounded-md flex justify-center items-center gap-2 transition-colors shadow-sm"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-green-600" />
                <span>100% Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
