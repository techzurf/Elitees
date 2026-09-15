import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Grid3x3, List, Search } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { useData } from '../context/DataContext';

export const Products: React.FC = () => {
  const { products, categories } = useData();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { categoryName } = useParams<{ categoryName: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const isOffersPage = location.pathname.includes('/offers');

  let displayProducts = [...products, ...products]; // Duplicating for UI fullness
  if (searchQuery) {
    displayProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (displayProducts.length > 0 && displayProducts.length < 4) {
       displayProducts = [...displayProducts, ...displayProducts, ...displayProducts];
    }
  } else if (categoryName) {
    // Basic mock filter based on category string matching
    displayProducts = products.filter(p => 
      p.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-') === categoryName.toLowerCase()
    );
    // If not found, show all
    if (displayProducts.length === 0) displayProducts = products;
    // Duplicate to fill grid for preview
    if (displayProducts.length < 4) displayProducts = [...displayProducts, ...displayProducts, ...displayProducts];
  } else if (isOffersPage) {
    displayProducts = products.filter(p => p.originalPrice > p.price || p.badge);
    if (displayProducts.length < 4) displayProducts = [...displayProducts, ...displayProducts, ...displayProducts];
  }

  const title = searchQuery ? `Search Results for "${searchQuery}"` : isOffersPage ? 'Special Offers' : categoryName ? categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Products';

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-900">Home</Link> <span className="mx-2">/</span> 
          {categoryName ? (
            <>
              <Link to="/products" className="hover:text-blue-900">Products</Link> <span className="mx-2">/</span>
              <span className="text-blue-900 font-medium">{title}</span>
            </>
          ) : (
            <span className="text-blue-900 font-medium">{title}</span>
          )}
        </div>

        {categoryName && (
          <div className="bg-blue-900 text-white p-8 rounded-xl mb-6 shadow-sm flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-blue-200">Explore our finest selection of {title.toLowerCase()}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between mb-4">
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-md shadow-sm font-medium text-gray-700"
            >
              <Filter size={18} /> Filters
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-md shadow-sm font-medium text-gray-700">
              Sort By <ChevronDown size={18} />
            </div>
          </div>

          {/* Left Sidebar - Filters */}
          <div className={`w-full md:w-1/4 lg:w-1/5 bg-white p-4 rounded-lg border border-gray-100 shadow-sm h-fit ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="font-bold text-lg text-blue-900">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500">✕</button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 text-sm hover:text-blue-900 transition-colors">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Price</h3>
              <div className="space-y-3">
                {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'].map((range, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 text-sm hover:text-blue-900 transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Rating</h3>
              <div className="space-y-3">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 text-sm hover:text-blue-900 transition-colors">{rating} Stars & Above</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-blue-900 text-white py-2 rounded-md font-medium mt-4 md:hidden">Apply Filters</button>
          </div>

          {/* Right Content - Product Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Top Bar */}
            <div className="hidden md:flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
              <p className="text-gray-600 font-medium">Showing <span className="text-blue-900 font-bold">{products.length}</span> products</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm font-medium">Sort by:</span>
                  <select className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  <button className="p-1.5 bg-gray-100 text-blue-900 hover:bg-gray-200"><Grid3x3 size={18} /></button>
                  <button className="p-1.5 text-gray-400 hover:bg-gray-100"><List size={18} /></button>
                </div>
              </div>
            </div>

            {/* Product Grid - 2 per row mobile, 4 per row desktop */}
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {displayProducts.map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-20 text-center">
                <div className="bg-white p-8 rounded-full shadow-sm mb-4">
                  <Search size={48} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500 max-w-md">We couldn't find anything matching your search. Try adjusting your filters or search term.</p>
                <Link to="/products" className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
                  Clear Search
                </Link>
              </div>
            )}

            {/* Pagination */}
            {displayProducts.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">«</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-900 text-white font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">3</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">»</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
