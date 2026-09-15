import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-20 md:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-2 rounded flex items-center">
                 <ShoppingBagLogo />
                 <span className="text-blue-900 font-bold text-2xl tracking-tight">Asin Lifestyle</span>
              </div>
            </Link>
            <p className="text-blue-100 mb-6 max-w-sm">
              Your destination for premium, comfortable, and stylish T-shirts. We provide high-quality everyday essentials designed to fit perfectly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-3 text-blue-100">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors inline-flex items-center gap-1">⚙ Admin</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Customer Service</h3>
            <ul className="space-y-3 text-blue-100">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Contact Us</h3>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <span>support@asinlifestyle.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>123, Anna Salai,<br />Chennai - 600002</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm gap-4">
          <p>© {new Date().getFullYear()} Asin Lifestyle. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-current" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

const ShoppingBagLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M16 6V5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5V6" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.82475 7.6329C3.91684 6.71183 4.69466 6 5.62058 6H18.3794C19.3053 6 20.0832 6.71183 20.1753 7.6329L21.3753 19.6329C21.4826 20.7061 20.6393 21.6667 19.5606 21.6667H4.43944C3.36074 21.6667 2.51744 20.7061 2.62475 19.6329L3.82475 7.6329Z" fill="#003366"/>
    <circle cx="15.5" cy="11.5" r="2.5" fill="#DC2626"/>
  </svg>
);
