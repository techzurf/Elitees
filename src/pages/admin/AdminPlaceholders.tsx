import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Edit, Trash2, Plus, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Category, Reel } from '../../types';

export const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const handleOpenAdd = () => { setFormData({ name: '', image: '' }); setEditingCategory(null); setIsModalOpen(true); };
  const handleOpenEdit = (cat: Category) => { setFormData({ name: cat.name, image: cat.image }); setEditingCategory(cat); setIsModalOpen(true); };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory({ ...editingCategory, ...formData });
    } else {
      addCategory({ id: `c${Date.now()}`, ...formData });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button onClick={handleOpenAdd} className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"><Plus size={18}/> Add Category</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-3 font-medium">Image</th>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="py-3"><img src={c.image} alt={c.name} className="w-12 h-12 rounded object-cover" /></td>
                <td className="py-3 font-medium text-gray-900">{c.name}</td>
                <td className="py-3 text-right">
                  <button onClick={() => handleOpenEdit(c)} className="text-indigo-600 p-2"><Edit size={18}/></button>
                  <button onClick={() => { if(window.confirm('Delete category?')) deleteCategory(c.id); }} className="text-red-600 p-2"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminBanners = () => {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Reel | null>(null);
  const [formData, setFormData] = useState({ title: '', thumbnail: '' });

  const handleOpenAdd = () => { setFormData({ title: '', thumbnail: '' }); setEditingBanner(null); setIsModalOpen(true); };
  const handleOpenEdit = (banner: Reel) => { setFormData({ title: banner.title, thumbnail: banner.thumbnail }); setEditingBanner(banner); setIsModalOpen(true); };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) updateBanner({ ...editingBanner, ...formData });
    else addBanner({ id: `b${Date.now()}`, ...formData });
    setIsModalOpen(false);
  };

  const moveBanner = (index: number, direction: 'up'|'down') => {
    const list = banners || [];
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === list.length - 1)) return;
    alert('Reordering requires backend array update. Delete and Add instead for now.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Banners</h2>
        <button onClick={handleOpenAdd} className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"><Plus size={18}/> Add Banner</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-3 font-medium w-32">Image</th>
              <th className="pb-3 font-medium">Title/Link</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(banners || []).map((r, i) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="py-3"><img src={r.thumbnail} alt={r.title} className="w-24 h-12 rounded object-cover" /></td>
                <td className="py-3 font-medium text-gray-900">{r.title}</td>
                <td className="py-3 text-right">
                  <button onClick={() => moveBanner(i, 'up')} className="text-gray-400 p-1"><ArrowUp size={16}/></button>
                  <button onClick={() => moveBanner(i, 'down')} className="text-gray-400 p-1"><ArrowDown size={16}/></button>
                  <button onClick={() => handleOpenEdit(r)} className="text-indigo-600 p-2"><Edit size={18}/></button>
                  <button onClick={() => { if(window.confirm('Delete banner?')) deleteBanner(r.id); }} className="text-red-600 p-2"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{editingBanner ? 'Edit Banner' : 'Add Banner'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input required type="text" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminSettings = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <h3 className="text-lg font-bold border-b pb-4 mb-4">Store Configuration</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Store Name</label><input type="text" value={formData.storeName} onChange={e=>setFormData({...formData, storeName: e.target.value})} className="w-full p-2 border rounded" /></div>
          <div><label className="block text-sm font-medium mb-1">Contact Email</label><input type="email" value={formData.contactEmail} onChange={e=>setFormData({...formData, contactEmail: e.target.value})} className="w-full p-2 border rounded" /></div>
          <div><label className="block text-sm font-medium mb-1">WhatsApp Number</label><input type="text" value={formData.whatsappNumber} onChange={e=>setFormData({...formData, whatsappNumber: e.target.value})} className="w-full p-2 border rounded" /></div>
          <div><label className="block text-sm font-medium mb-1">Currency</label><input type="text" value={formData.currency} onChange={e=>setFormData({...formData, currency: e.target.value})} className="w-full p-2 border rounded bg-gray-50" readOnly /></div>
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export const AdminCustomers = () => {
  const { customers } = useData();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium text-right">Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="py-3 font-medium text-gray-900">{c.name}</td>
                <td className="py-3 text-gray-600">{c.email}</td>
                <td className="py-3 text-gray-600">{c.totalOrders}</td>
                <td className="py-3 text-right font-medium">₹{c.totalSpending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminOffers = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-900">Offers & Coupons</h2><button className="bg-blue-900 text-white px-4 py-2 rounded-md font-medium" onClick={() => alert('Add Coupon functionality not implemented yet.')}>Add New</button></div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">No active coupons. Click Add New to create one.</div>
  </div>
);

export const AdminReviews = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">No pending reviews to moderate.</div>
  </div>
);
