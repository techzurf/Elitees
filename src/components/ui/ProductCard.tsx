import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useStore();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden relative group">
      
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs font-bold text-white rounded shadow-sm ${
          product.badge.includes('OFF') ? 'bg-red-600' : 
          product.badge === 'Best Seller' ? 'bg-yellow-500' : 'bg-green-500'
        }`}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative pt-[100%] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
        />
      </Link>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="mb-1 block">
          <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 leading-tight min-h-[2.5rem] hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" className="text-gray-300" />
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Sizes and Colors */}
        <div className="mt-1 flex flex-col gap-1">
          <span className="text-xs text-gray-500">Sizes: {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).join(', ')}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1">Colors: 
            {product.colors ? (
               product.colors.map(color => {
                 let bgColor = color.toLowerCase().replace(' ', '');
                 if (bgColor === 'olivegreen') bgColor = '#556b2f';
                 if (bgColor === 'heathergrey') bgColor = '#9e9e9e';
                 if (bgColor === 'navyblue') bgColor = 'navy';
                 
                 return (
                   <span key={color} className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: bgColor }} title={color}></span>
                 );
               })
            ) : (
               <>
                 <span className="w-3 h-3 rounded-full bg-black border border-gray-300"></span>
                 <span className="w-3 h-3 rounded-full bg-white border border-gray-300"></span>
                 <span className="w-3 h-3 rounded-full bg-blue-900 border border-gray-300"></span>
               </>
            )}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <span className="text-lg md:text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`w-full mt-3 py-2 rounded-md font-medium text-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-1 ${
            added ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};
