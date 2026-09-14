import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { storeConfig } from '../config/store';

export const ContactUs: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-10">We're here to help and answer any question you might have.</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-full text-blue-900">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm">Mon-Sat from 9am to 6pm.</p>
                <p className="text-blue-900 font-medium mt-2">{storeConfig.whatsappNumber}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-full text-blue-900">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm">We'll respond within 24 hours.</p>
                <p className="text-blue-900 font-medium mt-2">support@shopmart.com</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-full text-blue-900">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  123 Market Street, <br />
                  Tech Park, Block B,<br />
                  Mumbai, 400001
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="button" className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};
