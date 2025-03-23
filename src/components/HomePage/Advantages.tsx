import React from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface AdvantagesProps {
  advantages: Advantage[];
  title: string;
  description: string;
}

export default function Advantages({ advantages, title, description }: AdvantagesProps) {
  return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
          {advantages.map((advantage, index) => {
            const Icon = Icons[advantage.icon]; // Dynamically fetch the icon component
            return (
              <div
                key={index}
                className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600 mb-4">
                  {Icon ? <Icon className="h-8 w-8" /> : null} {/* Render the icon if it exists */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {advantage.description}
                </p>
                {advantage.ctaLink && advantage.ctaText ? <div className="mt-auto">
                  <a
                      href={advantage.ctaLink}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    {advantage.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div> : ''}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
