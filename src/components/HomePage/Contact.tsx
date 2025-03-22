import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Have questions? We're here to help you start your journey
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-6 w-6 mr-3" />
              <span>contact@globalenglish.com</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-6 w-6 mr-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="h-6 w-6 mr-3" />
              <span>Live chat available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}