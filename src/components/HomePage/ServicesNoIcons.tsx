import React, { useState } from 'react';

export default function ServicesNoIcons({services, title, description, showBtn = "Show", hideBtn = "Hide", featuresBtn = "Features"}) {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.shortDescription}
                </p>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedService === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">
                      {service.fullDescription}
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">{featuresBtn}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-600">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleService(index)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                >
                  {expandedService === index ? hideBtn : showBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}