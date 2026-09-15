import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ui/ProductCard';

export const Account: React.FC = () => {
  const { orders } = useData();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');
  
  const { wishlist } = useStore();

  useEffect(() => {
    if (location.pathname.includes('wishlist')) {
      setActiveTab('wishlist');
    } else if (location.pathname.includes('orders') || location.pathname.includes('track-order')) {
      setActiveTab('orders');
    }
  }, [location]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-xl">
                  JD
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">John Doe</h2>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <div className="p-2">
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3"><User size={18} /> Profile</div>
                    <ChevronRight size={16} className={activeTab === 'profile' ? 'text-blue-900' : 'text-gray-400'} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3"><Package size={18} /> My Orders</div>
                    <ChevronRight size={16} className={activeTab === 'orders' ? 'text-blue-900' : 'text-gray-400'} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3"><MapPin size={18} /> Saved Addresses</div>
                    <ChevronRight size={16} className={activeTab === 'addresses' ? 'text-blue-900' : 'text-gray-400'} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'wishlist' ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3"><Heart size={18} /> Wishlist</div>
                    <ChevronRight size={16} className={activeTab === 'wishlist' ? 'text-blue-900' : 'text-gray-400'} />
                  </button>
                </nav>
              </div>
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-gray-900">{order.id}</span>
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                          <div className="text-left md:text-right">
                            <p className="text-lg font-bold text-gray-900">₹{order.amount}</p>
                            <p className="text-sm text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                          <p className="text-sm text-gray-600">
                            Payment: <span className={order.paymentStatus === 'Paid' ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>{order.paymentStatus}</span>
                          </p>
                          <div className="flex w-full sm:w-auto gap-3">
                            <button className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-4 py-2 rounded font-medium text-sm hover:bg-gray-50">View Details</button>
                            {order.status === 'Delivered' && (
                              <button className="flex-1 sm:flex-none bg-blue-900 text-white px-4 py-2 rounded font-medium text-sm hover:bg-blue-800">Reorder</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  <div className="max-w-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" defaultValue="John" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" defaultValue="Doe" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" defaultValue="+91 9876543210" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <button className="bg-blue-900 text-white font-bold px-6 py-2 rounded-md mt-4">Save Changes</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <Heart size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</p>
                      <p className="text-sm">Save items you like to your wishlist to easily find them later.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                  <p className="text-lg">This section is currently under development.</p>
                  <p className="text-sm">Mock UI will be available soon.</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
