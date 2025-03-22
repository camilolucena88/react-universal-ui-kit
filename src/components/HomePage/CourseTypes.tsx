import React from "react";
import * as Icons from "lucide-react";

export default function CourseTypes({
                                        courses = [],
                                        title = 'Available Courses',
                                        description = 'Choose the best course for you.',
                                        priceLabel = 'From',
                                        currencySymbol = '€',
                                        perDurationLabel = '/week',
                                        reviewsText = 'reviews'
}) {
    const renderStars = (rating) => {
        const fiveStarRating = (rating / 10) * 5;
        const fullStars = Math.floor(fiveStarRating);
        const partialStar = fiveStarRating % 1;
        const emptyStars = 5 - Math.ceil(fiveStarRating);

        return (
            <div className="flex items-center">
                {/* Full stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <Icons.Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}

                {/* Partial star */}
                {partialStar > 0 && (
                    <div className="relative w-5 h-5">
                        <Icons.Star className="absolute w-5 h-5 text-gray-300 fill-current" />
                        <div className="absolute overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
                            <Icons.Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </div>
                    </div>
                )}

                {/* Empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <Icons.Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                ))}
            </div>
        );
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-xl text-gray-600">{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                        >
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>

                                <div className="flex items-center mb-4">
                                    {renderStars(course.rating)}
                                    <span className="ml-2 text-gray-600">
                    {course.rating}/10 ({course.reviews} {reviewsText})
                  </span>
                                </div>

                                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {priceLabel} {course.pricePerWeek}{currencySymbol}
                  </span>
                                    <span className="text-gray-600">/{perDurationLabel}</span>
                                </div>

                                <p className="text-gray-600 mb-6">{course.description}</p>

                                <div className="space-y-4">
                                    {course.features.map((feature, featureIndex) => {
                                        const Icon = Icons[feature.icon]; // Dynamically resolve icon
                                        return (
                                            <div key={featureIndex} className="flex items-center text-gray-700">
                                                {Icon ? <Icon className="w-5 h-5" /> : null}
                                                <span className="ml-3">{feature.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {course.ctaLink && course.ctaText ? <div className="mt-8">
                                <a href={course.ctaLink} className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                                    {course.ctaText}
                                </a>
                            </div> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
