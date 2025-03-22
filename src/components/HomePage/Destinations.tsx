import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Destinations({destinations, title, description}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Responsive itemsPerPage
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
      return 4; // desktop
    }
    return 4; // default for SSR
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % (destinations.length - itemsPerPage + 1)
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      Math.max(0, prevIndex - 1)
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(destinations.length - itemsPerPage, prevIndex + 1)
    );
    setIsAutoPlaying(false);
  };

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="destinations" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            {visibleDestinations.map((destination, index) => (
              <div
                key={currentIndex + index}
                className="w-full md:w-1/2 lg:w-1/4 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <div className="flex items-center text-white mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                    </div>
                    <p className="text-white/90 text-sm">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 p-2 rounded-full shadow-lg transition-opacity ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= destinations.length - itemsPerPage}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 p-2 rounded-full shadow-lg transition-opacity ${
              currentIndex >= destinations.length - itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
            }`}
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(destinations.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index * itemsPerPage);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-blue-600 w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}