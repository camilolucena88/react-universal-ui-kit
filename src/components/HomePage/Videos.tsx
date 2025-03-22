import React from 'react';
import { Play } from 'lucide-react';



export default function Videos({videos, title, description}) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/90 p-4 rounded-full group-hover:bg-white transition-colors">
                      <Play className="h-8 w-8 text-blue-600" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
                  {video.duration}
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{video.title}</h3>
              <p className="mt-2 text-gray-600">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}