import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  ShoppingCart, 
  Users, 
  Image as ImageIcon, 
  Settings,
  LogOut,
  Menu,
  X,
  Tag,
  Star
} from 'lucide-react';
import { useAdminAuth } from '../../pages/admin/AdminAuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isAuthenticated, logout } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (route: string) => path === route || path.startsWith(`${route}/`);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, route: '/admin' },
    { name: 'Products', icon: Package, route: '/admin/products' },
    { name: 'Categories', icon: Grid, route: '/admin/categories' },
    { name: 'Orders', icon: ShoppingCart, route: '/admin/orders' },
    { name: 'Customers', icon: Users, route: '/admin/customers' },
    { name: 'Offers / Coupons', icon: Tag, route: '/admin/offers' },
    { name: 'Banners', icon: ImageIcon, route: '/admin/banners' },
    { name: 'Reviews', icon: Star, route: '/admin/reviews' },
    { name: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-blue-900 text-white flex flex-col shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center">
            <div className="bg-white p-1.5 rounded mr-3">
              <ShoppingBagLogo />
            </div>
            <span className="font-bold text-xl tracking-wide">Admin Panel</span>
          </div>
          <button 
            className="md:hidden p-1 hover:bg-blue-800 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 hide-scrollbar">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.route) && (item.route !== '/admin' || path === '/admin') 
                      ? 'bg-blue-800 text-yellow-400 font-medium' 
                      : 'text-blue-100 hover:bg-blue-800/50'
                  }`}
                >
                  <item.icon size={20} className={isActive(item.route) && (item.route !== '/admin' || path === '/admin') ? 'text-yellow-400' : 'text-blue-200'} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-800/50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Top Header - Responsive */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              {navItems.find(item => isActive(item.route) && (item.route !== '/admin' || path === '/admin'))?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm font-medium text-gray-600">Admin User</span>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-sm md:text-base">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const ShoppingBagLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6V5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5V6" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.82475 7.6329C3.91684 6.71183 4.69466 6 5.62058 6H18.3794C19.3053 6 20.0832 6.71183 20.1753 7.6329L21.3753 19.6329C21.4826 20.7061 20.6393 21.6667 19.5606 21.6667H4.43944C3.36074 21.6667 2.51744 20.7061 2.62475 19.6329L3.82475 7.6329Z" fill="#003366"/>
  </svg>
);
