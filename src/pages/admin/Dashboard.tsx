import React from 'react';
import { IndianRupee, ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import { orders, products, customers } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  
  // Calculate mock stats
  const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const statCards = [
    { title: 'Total Sales', value: `₹${totalSales.toLocaleString()}`, icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12.5%' },
    { title: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+5.2%' },
    { title: 'Total Products', value: totalProducts, icon: Package, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+0.0%' },
    { title: 'Total Customers', value: totalCustomers, icon: Users, color: 'text-amber-600', bg: 'bg-amber-100', trend: '+18.1%' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-xs font-medium flex items-center text-green-600">
                <TrendingUp size={14} className="mr-1" /> {stat.trend} from last month
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Recent Orders</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-blue-900">{order.id}</td>
                    <td className="p-4 text-gray-700">{order.customerName}</td>
                    <td className="p-4 text-gray-500">{order.date}</td>
                    <td className="p-4 font-medium text-gray-900">₹{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg">Best Selling Products</h3>
          </div>
          <div className="p-4 space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded border border-gray-100 bg-gray-50 p-1 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                  <p className="text-xs text-gray-500">₹{product.price} • {product.stock} in stock</p>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {Math.floor(Math.random() * 50) + 10} sold
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
