import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Tag, ShoppingCart, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { cartCount } = useStore();

  const isActive = (route: string) => {
    if (route === '/' && path === '/') return true;
    if (route !== '/' && path.startsWith(route)) return true;
    return false;
  };

  const navItems = [
    { name: 'Home', icon: Home, route: '/' },
    { name: 'Categories', icon: Grid, route: '/categories' },
    { name: 'Offers', icon: Tag, route: '/offers' },
    { name: 'Cart', icon: ShoppingCart, route: '/cart', badge: cartCount },
    { name: 'Account', icon: User, route: '/account' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-2 py-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.route);
        return (
          <Link
            key={item.name}
            to={item.route}
            className={`flex flex-col items-center p-2 min-w-[64px] ${active ? 'text-blue-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? 'text-blue-900' : ''} />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${active ? 'text-blue-900 font-bold' : ''}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
