import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, Reel, Order, Customer } from '../types';
import * as mockData from '../data/mockData';

interface StoreSettings {
  storeName: string;
  contactEmail: string;
  currency: string;
  whatsappNumber: string;
}

interface DataContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  reels: Reel[];
  banners: Reel[];
  settings: StoreSettings;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateSettings: (settings: StoreSettings) => void;
  addReel: (reel: Reel) => void;
  updateReel: (reel: Reel) => void;
  deleteReel: (id: string) => void;
  addBanner: (banner: Reel) => void;
  updateBanner: (banner: Reel) => void;
  deleteBanner: (id: string) => void;
}

const defaultSettings: StoreSettings = {
  storeName: 'Asin Lifestyle',
  contactEmail: 'support@asinlifestyle.com',
  currency: '₹',
  whatsappNumber: '1234567890'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('asin_lifestyle_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse DB', e);
      }
    }
    return {
      products: mockData.products,
      categories: mockData.categories,
      orders: mockData.orders,
      customers: mockData.customers,
      reels: mockData.reels,
      banners: mockData.banners,
      settings: defaultSettings,
    };
  });

  useEffect(() => {
    localStorage.setItem('asin_lifestyle_db', JSON.stringify(data));
  }, [data]);

  const addProduct = (product: Product) => setData((prev: any) => ({ ...prev, products: [...prev.products, product] }));
  const updateProduct = (product: Product) => setData((prev: any) => ({ ...prev, products: prev.products.map((p: Product) => p.id === product.id ? product : p) }));
  const deleteProduct = (id: string) => setData((prev: any) => ({ ...prev, products: prev.products.filter((p: Product) => p.id !== id) }));

  const addCategory = (category: Category) => setData((prev: any) => ({ ...prev, categories: [...prev.categories, category] }));
  const updateCategory = (category: Category) => setData((prev: any) => ({ ...prev, categories: prev.categories.map((c: Category) => c.id === category.id ? category : c) }));
  const deleteCategory = (id: string) => setData((prev: any) => ({ ...prev, categories: prev.categories.filter((c: Category) => c.id !== id) }));

  const updateOrderStatus = (id: string, status: Order['status']) => setData((prev: any) => ({ ...prev, orders: prev.orders.map((o: Order) => o.id === id ? { ...o, status } : o) }));
  const updateSettings = (settings: StoreSettings) => setData((prev: any) => ({ ...prev, settings }));
  
  const addReel = (reel: Reel) => setData((prev: any) => ({ ...prev, reels: [...prev.reels, reel] }));
  const updateReel = (reel: Reel) => setData((prev: any) => ({ ...prev, reels: prev.reels.map((r: Reel) => r.id === reel.id ? reel : r) }));
  const deleteReel = (id: string) => setData((prev: any) => ({ ...prev, reels: prev.reels.filter((r: Reel) => r.id !== id) }));

  const addBanner = (banner: Reel) => setData((prev: any) => ({ ...prev, banners: [...(prev.banners || []), banner] }));
  const updateBanner = (banner: Reel) => setData((prev: any) => ({ ...prev, banners: (prev.banners || []).map((b: Reel) => b.id === banner.id ? banner : b) }));
  const deleteBanner = (id: string) => setData((prev: any) => ({ ...prev, banners: (prev.banners || []).filter((b: Reel) => b.id !== id) }));

  return (
    <DataContext.Provider value={{
      ...data,
      addProduct, updateProduct, deleteProduct,
      addCategory, updateCategory, deleteCategory,
      updateOrderStatus, updateSettings,
      addReel, updateReel, deleteReel,
      addBanner, updateBanner, deleteBanner
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
