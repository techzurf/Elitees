import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 0,
    type: 'full-banner',
    image: "https://res.cloudinary.com/dv16a8l1l/image/upload/v1789369161/ChatGPT_Image_Sep_14_2026_12_28_36_PM_l9d1y7.png",
    bgColor: "bg-[#111]"
  },
  {
    id: 1,
    type: 'full-banner',
    image: "https://res.cloudinary.com/dv16a8l1l/image/upload/v1789369801/ChatGPT_Image_Sep_14_2026_12_39_51_PM_px9wfr.png",
    bgColor: "bg-[#111]"
  },
  {
    id: 2,
    type: 'text-overlay',
    title: "New Season. New Fits.",
    description: "Built for Everyday Style. Shop our latest oversized and premium tees.",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&h=400&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=600&fit=crop",
    badge: "UP TO 50% OFF",
    bgColor: "bg-amber-50"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden w-full bg-white">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-[350px] md:h-[400px] lg:h-[450px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`w-full h-full flex-shrink-0 flex items-center relative ${slide.bgColor}`}
          >
            {slide.type === 'full-banner' ? (
              <Link to="/products" className="w-full h-full block">
                <img 
                  src={slide.image} 
                  alt="Special Promotion"
                  loading={slide.id === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-contain object-center"
                />
              </Link>
            ) : (
              <>
                {/* Background Images */}
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  loading={slide.id === 0 ? "eager" : "lazy"}
                  className="hidden md:block absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                />
                <img 
                  src={slide.mobileImage} 
                  alt={slide.title} 
                  loading={slide.id === 0 ? "eager" : "lazy"}
                  className="md:hidden absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                />
                
                {/* Content Container */}
                <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center">
                  
                  <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center items-start">
                    <div className="md:hidden w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-center leading-tight mb-4 shadow-lg p-2 text-xs">
                      {slide.badge?.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-4 tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-gray-700 text-sm md:text-xl mb-6 md:mb-8 font-medium max-w-md">
                      {slide.description}
                    </p>
                    <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 rounded-md font-bold text-sm md:text-base flex items-center transition-colors">
                      Shop Now <span className="ml-2">→</span>
                    </Link>
                  </div>

                  {/* Badge for Desktop */}
                  <div className="hidden md:flex absolute top-12 right-12 lg:right-24 bg-red-600 text-white rounded-full w-28 h-28 lg:w-32 lg:h-32 items-center justify-center font-bold text-xl lg:text-2xl flex-col text-center shadow-xl rotate-12 transform hover:scale-110 transition-transform">
                     {slide.badge?.split(' ').map((word, i) => (
                        <span key={i} className={i === 0 ? "text-sm lg:text-base" : ""}>{word}</span>
                     ))}
                  </div>

                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-2 rounded-full shadow-md z-20 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-2 rounded-full shadow-md z-20 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === idx ? 'bg-blue-900 w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
