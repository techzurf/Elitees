import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, ChevronDown, MapPin, Phone, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { cartCount, wishlist } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Desktop Only */}
      <div className="hidden md:flex bg-blue-900 text-white text-sm py-2 px-6 justify-between items-center">
        <div>Free Shipping on Orders Above ₹999</div>
        <div className="flex space-x-6">
          <Link to="/track-order" className="hover:text-yellow-400 transition-colors">Track Order</Link>
          <Link to="/help" className="hover:text-yellow-400 transition-colors">Help</Link>
          <Link to="/account/wishlist" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Heart size={14} /> Wishlist
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 gap-3 md:gap-0">
        
        <div className="flex justify-between items-center w-full md:w-auto">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-blue-900 font-bold text-2xl md:text-3xl tracking-tight flex items-center">
               <ShoppingBagLogo />
               TeeMart
            </div>
          </Link>

          {/* Mobile Icons (Wishlist, Cart) */}
          <div className="flex md:hidden items-center space-x-4 text-gray-700">
             <Link to="/account/wishlist" className="relative">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar - Desktop & Mobile */}
        <div className="w-full md:flex-1 md:max-w-2xl md:px-8 order-3 md:order-2">
          <form onSubmit={handleSearch} className="relative flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories, brands..."
              className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-2 rounded-r-md transition-colors flex items-center justify-center">
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6 order-2 md:order-3 text-gray-700">
          <Link to="/login" className="flex flex-col items-center hover:text-blue-900 transition-colors">
            <User size={24} />
            <span className="text-xs font-medium mt-1">Login</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center hover:text-blue-900 transition-colors relative">
            <div className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium mt-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar - Desktop Only */}
      <nav className="hidden md:flex bg-blue-800 text-white">
        <div className="flex items-center pl-6">
          <div className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 flex items-center cursor-pointer hover:bg-yellow-500 transition-colors">
            <Menu size={20} className="mr-2" />
            All Categories
            <ChevronDown size={16} className="ml-2" />
          </div>
        </div>
        <ul className="flex items-center space-x-8 px-8 font-medium">
          <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-yellow-400 transition-colors">Products</Link></li>
          <li><Link to="/offers" className="hover:text-yellow-400 transition-colors">Offers</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
        </ul>
        <div className="ml-auto bg-red-600 text-white px-6 py-3 font-bold cursor-pointer flex items-center hover:bg-red-700 transition-colors">
          Special Deals ⚡
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Simplified) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-50 shadow-lg">
          <ul className="py-2">
            <li><Link to="/" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Products</Link></li>
            <li><Link to="/offers" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Offers</Link></li>
            <li><Link to="/about" className="block px-4 py-3 text-gray-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

const ShoppingBagLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M16 6V5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5V6" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.82475 7.6329C3.91684 6.71183 4.69466 6 5.62058 6H18.3794C19.3053 6 20.0832 6.71183 20.1753 7.6329L21.3753 19.6329C21.4826 20.7061 20.6393 21.6667 19.5606 21.6667H4.43944C3.36074 21.6667 2.51744 20.7061 2.62475 19.6329L3.82475 7.6329Z" fill="#003366"/>
    <circle cx="15.5" cy="11.5" r="2.5" fill="#DC2626"/>
  </svg>
);
