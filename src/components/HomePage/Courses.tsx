import React from 'react';
import { Clock, Users, Signal, ShoppingCart } from 'lucide-react';
import { useCart } from './context/CartContext';

interface Course {
  id: string | number;  // Allow both string and number
  title: string;
  type: string;
  duration: string;
  level: string;
  description: string;
  price: number;
  rating?: number;   // ✅ Optional
  reviews?: number;  // ✅ Optional
  pricePerWeek?: number; // ✅ Optional
  features?: { icon: string; text: string }[]; // ✅ Optional
  ctaLink?: string;
  ctaText?: string;
}

interface CourseTypesProps {
  courses: Course[];
  title: string;
  description: string;
}

export default function Courses({courses, title, description}:CourseTypesProps) {
  const { addItem } = useCart();

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {course.title}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Signal className="h-5 w-5 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${course.price}
                </span>
              </div>
              <button
                onClick={() => addItem({
                  id: course.id,
                  name: course.title,
                  price: course.price,
                  duration: course.duration
                })}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}