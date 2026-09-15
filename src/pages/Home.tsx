import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import { HeroSlider } from '../components/ui/HeroSlider';
import { CategoryCard } from '../components/ui/CategoryCard';
import { ProductCard } from '../components/ui/ProductCard';
import { ReelCard } from '../components/ui/ReelCard';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { categories, products, reels } = useData();
  
  return (
    <div className="bg-white">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Service Features */}
      <section className="py-6 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3">
              <Truck className="text-red-600 w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">Free Shipping</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight mt-1">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3">
              <RotateCcw className="text-red-600 w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">Easy Returns</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight mt-1">Hassle free returns</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3">
              <ShieldCheck className="text-red-600 w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">Secure Payment</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight mt-1">100% secure checkout</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-2 sm:gap-3">
              <HeadphonesIcon className="text-red-600 w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">24/7 Support</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight mt-1">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">Shop by Category</h2>
            <Link to="/categories" className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          
          {/* Mobile: 4-column grid, Desktop: Flex row */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 md:flex md:flex-row md:justify-between">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">Featured Products</h2>
            <Link to="/products" className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Reels Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">Watch Our Latest Reels</h2>
            <a href="#" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
              Follow Us @asinlifestyle
            </a>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar snap-x">
            {reels.map((reel) => (
              <div key={reel.id} className="snap-start">
                <ReelCard reel={reel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Promotional Banner */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-900 rounded-xl overflow-hidden relative flex flex-col md:flex-row items-center p-6 md:p-12 shadow-lg min-h-[250px]">
            <div className="z-10 w-full md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Big Savings on<br/>Premium T-Shirts</h2>
              <p className="text-blue-200 text-sm md:text-base mb-6">Top Fits | Best Quality | Limited Time Offers</p>
              <Link to="/offers" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-full transition-colors shadow-md">
                Shop the Collection →
              </Link>
            </div>
            
            <div className="absolute right-0 bottom-0 md:top-0 h-full w-full md:w-1/2 opacity-20 md:opacity-100 flex justify-end">
              <img 
                src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=400&fit=crop" 
                alt="T-Shirts" 
                className="h-full object-cover rounded-xl mix-blend-screen"
                style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
              />
            </div>
            
            <div className="absolute top-6 right-6 md:top-auto md:bottom-12 md:right-12 z-20 bg-red-600 text-white rounded-full w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center font-bold text-lg md:text-xl shadow-xl rotate-12 transform hover:scale-110 transition-transform">
              <span>UP TO</span>
              <span>50%</span>
              <span className="text-sm">OFF</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-12 bg-blue-900 border-t border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-blue-200 text-sm">Get the latest updates, offers and more directly to your inbox.</p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-3 rounded-md whitespace-nowrap transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
