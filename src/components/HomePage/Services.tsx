import React from 'react';

import * as Icons from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: JSX.Element; // ✅ Allow JSX Elements
}

interface ServicesProps {
  title: string;
  description: string;
  services: Service[];
}

export default function Services({
        title,
        description,
        services
    }: ServicesProps) {
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

                <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const Icon = Icons[service.icon]; // Dynamically fetch the icon component
                        return <div
                            key={index}
                            className="relative group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <div className="text-blue-600 mb-4">
                                {Icon ? <Icon className="h-8 w-8" /> : null} {/* Render the icon if it exists */}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                            <p className="mt-2 text-gray-500">{service.description}</p>
                        </div>
                    })}
                </div>
            </div>
        </section>
    );
}