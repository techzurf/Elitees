import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">About ShopMart</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop" 
            alt="About ShopMart" 
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2023, ShopMart started with a simple vision: to make quality groceries and daily essentials accessible to everyone. We believe that shopping for your home should be easy, reliable, and affordable.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to deliver the freshest products directly to your doorstep while ensuring exceptional customer service. We work closely with local farmers and trusted brands to maintain the highest quality standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="font-bold text-blue-900 text-xl mb-2">10K+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <h3 className="font-bold text-yellow-600 text-xl mb-2">5000+</h3>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <h3 className="font-bold text-red-600 text-xl mb-2">100%</h3>
                <p className="text-gray-600">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
