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
    type: 'full-banner',
    image: "https://res.cloudinary.com/dv16a8l1l/image/upload/v1789370277/ChatGPT_Image_Sep_14_2026_12_46_18_PM_unp41p.png",
    bgColor: "bg-[#111]"
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
    <div className="relative w-full bg-white group">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out aspect-[16/6] md:aspect-auto md:h-[400px] lg:h-[450px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`w-full h-full flex-shrink-0 flex items-center relative ${slide.bgColor} overflow-hidden`}
          >
            {slide.type === 'full-banner' ? (
              <Link to="/products" className="w-full h-full block">
                <img 
                  src={slide.image} 
                  alt="Special Promotion"
                  loading={slide.id === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-contain md:object-cover object-center"
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
                <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center h-full">
                  
                  <div className="w-full md:w-1/2 flex flex-col justify-center items-start h-full">
                    {/* Badge for Mobile */}
                    <div className="md:hidden absolute top-2 right-2 sm:right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-center leading-none shadow-lg p-1 text-[8px] flex-col rotate-12">
                      {slide.badge?.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                    </div>

                    <h1 className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-1 sm:mb-4 tracking-tight max-w-[75%] md:max-w-full">
                      {slide.title}
                    </h1>
                    <p className="text-gray-800 text-[10px] sm:text-sm md:text-xl mb-2 sm:mb-8 font-medium max-w-[70%] md:max-w-md leading-snug">
                      {slide.description}
                    </p>
                    <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-8 md:py-3 rounded-md font-bold text-[10px] md:text-base flex items-center transition-colors">
                      Shop Now <span className="ml-1 md:ml-2">→</span>
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
        className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-1.5 md:p-2 rounded-full shadow-md z-20 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-1.5 md:p-2 rounded-full shadow-md z-20 transition-colors"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 md:space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-colors ${
              currentSlide === idx ? 'bg-blue-900 w-4 h-1.5 md:w-6 md:h-2.5' : 'bg-gray-300 w-1.5 h-1.5 md:w-2.5 md:h-2.5'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
