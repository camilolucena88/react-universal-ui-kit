import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  from: string;
  image: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title: string;
  description: string;
}

export default function Testimonials({testimonials, title, description}: TestimonialsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="absolute -top-4 -left-4">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.from}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{testimonial.text}</p>
              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}