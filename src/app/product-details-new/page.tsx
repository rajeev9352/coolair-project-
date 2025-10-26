"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailsNewPage() {
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background/11.webp"
            alt="Product Details background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className={`inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 transition-all duration-700 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Product Details
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Product Details New
              </h1>
              <nav className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Home
                </Link>
                <span>/</span>
                <Link href="/all-products" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Products
                </Link>
                <span>/</span>
                <span className="text-blue-300">Product Details New</span>
              </nav>
            </div>
            <div className="lg:w-1/2 text-right">
              <div className={`text-xl font-semibold transition-all duration-700 delay-600 transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                Air Conditioning and Heating Specialists
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </section>

      {/* Decorative Icon */}
      <div className="relative bg-blue-600 z-20 -mt-10 mb-10">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-1000 delay-800 transform hover:scale-110 hover:rotate-12 hover:shadow-2xl ${
            isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
          }`}>
            <svg className="w-8 h-8 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 transform ${
            isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Product Details New Page
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              This is the new product details page. Here you can display detailed information about 
              specific products, including specifications, features, images, and purchasing options.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/all-products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Products
                </span>
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}