import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';

// Layouts
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Account } from './pages/Account';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { LegalPage } from './pages/LegalPage';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';

// Placeholder for remaining simple pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
  </div>
);

const legalContent = {
  privacy: (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Information We Collect</h2>
      <p>We collect information to provide better services to all our users. We use the information we collect from all our services to provide, maintain, protect and improve them.</p>
    </>
  ),
  terms: (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Terms of Service</h2>
      <p>By using our Services, you are agreeing to these terms. Please read them carefully.</p>
    </>
  ),
  faq: (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Frequently Asked Questions</h2>
      <p>How do I place an order? Simply add items to your cart and checkout using WhatsApp.</p>
    </>
  ),
  shipping: (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Shipping Policy</h2>
      <p>We aim to deliver all orders within 2-3 business days. Free shipping on orders above ₹999.</p>
    </>
  ),
  refund: (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Refund Policy</h2>
      <p>We offer a 7-day no-questions-asked return policy for unused products in original packaging.</p>
    </>
  )
};

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
        {/* Main Storefront Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="category/:categoryName" element={<Products />} />
          <Route path="offers" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="account" element={<Account />}>
             <Route path="orders" element={<Account />} />
             <Route path="wishlist" element={<Account />} />
          </Route>
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<LegalPage title="FAQ" content={legalContent.faq} />} />
          <Route path="privacy-policy" element={<LegalPage title="Privacy Policy" content={legalContent.privacy} />} />
          <Route path="terms" element={<LegalPage title="Terms & Conditions" content={legalContent.terms} />} />
          <Route path="shipping" element={<LegalPage title="Shipping Policy" content={legalContent.shipping} />} />
          <Route path="refund-policy" element={<LegalPage title="Refund Policy" content={legalContent.refund} />} />
          <Route path="track-order" element={<Account />} /> {/* Placeholder to use Account page */}
          <Route path="help" element={<ContactUs />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<Placeholder title="Admin Products" />} />
          <Route path="categories" element={<Placeholder title="Admin Categories" />} />
          <Route path="orders" element={<Placeholder title="Admin Orders" />} />
          <Route path="customers" element={<Placeholder title="Admin Customers" />} />
          <Route path="banners" element={<Placeholder title="Admin Banners" />} />
          <Route path="settings" element={<Placeholder title="Admin Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </StoreProvider>
  );
}

