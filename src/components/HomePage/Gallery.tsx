import React from 'react';
import ImageSlider from './ImageSlider';

export default function Gallery({images, title, description, autoPlayInterval = 5000}) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <ImageSlider images={images} autoPlayInterval={autoPlayInterval} />
      </div>
    </section>
  );
}