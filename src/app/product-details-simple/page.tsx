"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailsSimplePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Stagger the content animation
    const contentTimer = setTimeout(() => setIsContentVisible(true), 600);
    
    return () => {
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className={`inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Our Product
            </div>
            <h1 className={`text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-700 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              AeroChill
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className={`transition-all duration-1000 transform ${
              isContentVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}>
              <div className="bg-gray-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500 group">
                <div className="relative h-80 mb-6">
                  <Image
                    src="/images/products/1.webp"
                    alt="AeroChill Air Conditioner"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">AeroChill</h4>
              </div>
            </div>

            {/* Product Details */}
            <div className={`transition-all duration-1000 transform ${
              isContentVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              {/* Specifications Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '12,000 BTU', label: 'Cooling Capacity' },
                  { value: '30 dB(A)', label: 'Noise Level' },
                  { value: '35 x 12 x 10', label: 'Dimensions' }
                ].map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`bg-blue-600 text-white rounded-lg p-4 h-full transition-all duration-700 transform hover:scale-105 hover:shadow-lg ${
                      isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="font-bold text-lg">{spec.value}</div>
                    <div className="text-sm text-blue-100">{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* Product Description */}
              <div className={`mb-8 transition-all duration-1000 transform ${
                isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '600ms' }}>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Experience unparalleled comfort and efficiency with our state-of-the-art Air Conditioning Unit. 
                  Engineered with the latest technology, our air conditioner ensures optimal cooling while maintaining 
                  energy efficiency. Perfect for both residential and commercial spaces, it offers a seamless blend 
                  of performance, durability, and sleek design.
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                
                <ol className="space-y-4 text-gray-600">
                  {[
                    {
                      title: 'Efficient Cooling:',
                      description: 'Rapidly cools your space, providing immediate relief from heat.'
                    },
                    {
                      title: 'Energy Saving:',
                      description: 'Designed to consume minimal power, reducing your electricity bills without compromising performance.'
                    },
                    {
                      title: 'Quiet Operation:',
                      description: 'Operates at a low noise level, ensuring a peaceful environment for work or rest.'
                    }
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className={`flex transition-all duration-700 transform ${
                        isContentVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900 mr-2">{feature.title}</span>
                        {feature.description}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contact Button */}
              <div className={`transition-all duration-1000 transform ${
                isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '1000ms' }}>
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-block group transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    Contact Us
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}