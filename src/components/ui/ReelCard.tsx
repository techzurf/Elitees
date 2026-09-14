import React from 'react';
import { Play } from 'lucide-react';
import { Reel } from '../../types';

interface ReelCardProps {
  reel: Reel;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel }) => {
  return (
    <div className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[9/16] min-w-[140px] md:min-w-[180px] flex-shrink-0 bg-gray-900 shadow-sm border border-gray-200">
      <img 
        src={reel.thumbnail} 
        alt={reel.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 md:p-4">
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
             <Play fill="white" className="text-white ml-1 w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        <h4 className="text-white font-medium text-xs md:text-sm relative z-10 line-clamp-2 shadow-sm">
          {reel.title}
        </h4>
      </div>
    </div>
  );
};
