import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const slug = category.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
  return (
    <Link to={`/category/${slug}`} className="flex flex-col items-center group">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100 p-2 md:p-3 mb-2 group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-50">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <span className="text-xs md:text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-blue-700 transition-colors">
        {category.name}
      </span>
    </Link>
  );
};
