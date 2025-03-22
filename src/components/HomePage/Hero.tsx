import React from 'react';
import {ArrowRight} from 'lucide-react';

export default function Hero({
                                 title,
                                 subtitle,
                                 bg_img,
                                 main_btn_text,
                                 main_btn_link,
                                 secondary_btn_text,
                                 secondary_btn_link
                             }) {
    return (
        <div className="relative bg-blue-600 h-screen flex items-center justify-center">
            <div className="absolute inset-0">
                <img
                    src={bg_img}
                    alt="Students studying"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    {title}
                </h1>
                <p className="text-xl text-white mb-12 max-w-3xl">
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    {main_btn_link && main_btn_text ? <a
                        href={main_btn_link}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                    >
                        {main_btn_text}
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </a> : ''}
                    {secondary_btn_link && secondary_btn_text ?
                    <a
                        href={secondary_btn_link}
                        className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
                    >
                        {secondary_btn_text}
                    </a> : ''}
                </div>
            </div>
        </div>
    );
}