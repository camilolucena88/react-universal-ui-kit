import React from 'react';
import { Menu, Globe, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">GlobalEnglish</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="@/src/components/HomePage/Navbar#destinations" className="text-gray-600 hover:text-blue-600">Destinations</a>
            <a href="@/src/components/HomePage/Navbar#courses" className="text-gray-600 hover:text-blue-600">Courses</a>
            <a href="@/src/components/HomePage/Navbar#services" className="text-gray-600 hover:text-blue-600">Services</a>
            <a href="@/src/components/HomePage/Navbar#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Contact Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="@/src/components/HomePage/Navbar#destinations" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
              Destinations
            </a>
            <a href="@/src/components/HomePage/Navbar#courses" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
              Courses
            </a>
            <a href="@/src/components/HomePage/Navbar#services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
              Services
            </a>
            <a href="@/src/components/HomePage/Navbar#contact" className="block px-3 py-2 text-blue-600 font-medium">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}