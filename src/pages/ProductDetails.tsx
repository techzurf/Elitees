import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, Check, MessageCircle } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { useStore } from '../context/StoreContext';
import { storeConfig } from '../config/store';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Use first product as fallback if ID not found for preview purposes
  const product = products.find(p => p.id === id) || products[0];
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [added, setAdded] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleOrderWhatsApp = () => {
    const total = product.price * quantity;
    let message = `Hello, I would like to order:\n\n`;
    message += `*${product.name}*\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Price: ${storeConfig.currency}${total}\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-blue-900">Home</Link> <span className="mx-2">/</span> 
          <Link to="/products" className="hover:text-blue-900">Products</Link> <span className="mx-2">/</span>
          <Link to={`/categories`} className="hover:text-blue-900">{product.category}</Link> <span className="mx-2">/</span>
          <span className="text-blue-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Gallery - Left */}
            <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-4">
                <img src={activeImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 text-sm font-bold text-white rounded shadow-sm bg-red-600">
                    {product.badge}
                  </div>
                )}
                
                <button 
                  onClick={handleToggleWishlist}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              
              <div className="flex gap-4 overflow-x-auto py-2">
                {/* Simulated multiple images */}
                {product.images?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-md border-2 overflow-hidden flex-shrink-0 p-1 bg-gray-50 ${activeImage === img ? 'border-blue-900' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                )) || (
                  <button 
                    onClick={() => setActiveImage(product.image)}
                    className={`w-20 h-20 rounded-md border-2 overflow-hidden flex-shrink-0 p-1 bg-gray-50 border-blue-900`}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                )}
              </div>
            </div>

            {/* Product Info - Right */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" className="text-gray-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 ml-2">{product.rating} Rating</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500 hover:text-blue-900 cursor-pointer">{product.reviews} Reviews</span>
                <div className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></div>
                <button className="text-sm text-gray-500 hover:text-blue-900 flex items-center gap-1 hidden md:flex">
                  <Share2 size={14} /> Share
                </button>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through mb-1">₹{product.originalPrice}</span>
                      <span className="text-sm font-bold text-green-600 mb-1.5 ml-2">Save ₹{product.originalPrice - product.price}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* T-Shirt Options: Size & Color */}
              <div className="mb-6">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button key={size} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-sm font-medium hover:border-blue-900 hover:text-blue-900 transition-colors focus:ring-1 focus:ring-blue-900">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full bg-black border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                    <button className="w-8 h-8 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                    <button className="w-8 h-8 rounded-full bg-blue-900 border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"></button>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md h-12 w-32 bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={handleAddToCart}
                      className={`flex-1 h-12 rounded-md font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-colors shadow-sm ${
                        added ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-blue-900'
                      }`}
                    >
                      {added ? (
                        <><Check size={20} /> Added to Cart</>
                      ) : (
                        <><ShoppingCart size={20} /> Add to Cart</>
                      )}
                    </button>
                    <button 
                      onClick={handleOrderWhatsApp}
                      className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white h-12 rounded-md font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <MessageCircle size={20} /> Order on WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-600"><Truck size={20} /></div>
                  <span className="text-xs font-medium text-gray-700">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-600"><RotateCcw size={20} /></div>
                  <span className="text-xs font-medium text-gray-700">7 Days Return</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-600"><ShieldCheck size={20} /></div>
                  <span className="text-xs font-medium text-gray-700">Genuine Product</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="flex border-b border-gray-100">
            <button className="px-6 py-4 font-bold text-blue-900 border-b-2 border-blue-900">Description</button>
            <button className="px-6 py-4 font-medium text-gray-500 hover:text-blue-900 transition-colors">Specifications</button>
            <button className="px-6 py-4 font-medium text-gray-500 hover:text-blue-900 transition-colors">Reviews (124)</button>
          </div>
          <div className="p-6 md:p-8 text-gray-600 leading-relaxed">
            <p className="mb-4">
              {product.description} Experience the finest quality with our carefully crafted T-shirts. 
              Perfect for everyday wear, providing the ultimate comfort and a premium fit.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>100% Premium Cotton</li>
              <li>Pre-shrunk for a perfect fit</li>
              <li>High-quality durable stitching</li>
              <li>Comfortable and breathable fabric</li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
