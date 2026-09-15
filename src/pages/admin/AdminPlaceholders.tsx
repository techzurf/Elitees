import React from 'react';

const PlaceholderPage: React.FC<{ title: string, description: string }> = ({ title, description }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium transition-colors">
        Add New
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Management</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

export const AdminCategories = () => <PlaceholderPage title="Categories" description="Manage your product categories, subcategories, and hierarchy." />;
export const AdminCustomers = () => <PlaceholderPage title="Customers" description="View customer details, order history, and manage accounts." />;
export const AdminOffers = () => <PlaceholderPage title="Offers & Coupons" description="Create discount codes, set minimum values, and expiry dates." />;
export const AdminBanners = () => <PlaceholderPage title="Banners" description="Upload and reorder homepage hero banners." />;
export const AdminReviews = () => <PlaceholderPage title="Reviews" description="Approve, hide, or delete customer product reviews." />;
export const AdminSettings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
      <h3 className="text-lg font-bold border-b pb-4 mb-4">Store Configuration</h3>
      <form className="space-y-4">
        <div><label className="block text-sm font-medium mb-1">Store Name</label><input type="text" defaultValue="Asin Lifestyle" className="w-full p-2 border rounded" /></div>
        <div><label className="block text-sm font-medium mb-1">Contact Email</label><input type="email" defaultValue="support@asinlifestyle.com" className="w-full p-2 border rounded" /></div>
        <div><label className="block text-sm font-medium mb-1">Currency</label><input type="text" defaultValue="INR ₹" className="w-full p-2 border rounded bg-gray-50" readOnly /></div>
        <button type="button" className="bg-blue-900 text-white px-4 py-2 rounded">Save Settings</button>
      </form>
    </div>
  </div>
);
