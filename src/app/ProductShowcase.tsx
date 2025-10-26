'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductShowcase() {
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    const infoTimer = setTimeout(() => setIsInfoVisible(true), 400);
    return () => clearTimeout(infoTimer);
  }, []);
  
  const productImages = [
    '/images/products/1.webp',
    '/images/misc/9.webp',
    '/images/misc/11.webp',
    '/images/misc/8.webp',
    '/images/misc/13.webp',
  ];

  const capacities = ['1 PK', '2 PK', '3 PK'];
  const [selectedCapacity, setSelectedCapacity] = useState(capacities[0]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Product Gallery */}
          <div className={`w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-10 transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="group relative overflow-hidden rounded-2xl bg-gray-50 p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] hover:bg-gray-100">
              <div className="relative h-96 w-full">
                <Image
                  src={productImages[activeImage]}
                  alt={`Product View ${activeImage + 1}`}
                  fill
                  className="object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  priority
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-sm"></div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="mt-6 flex space-x-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:rotate-3 ${
                      activeImage === index ? 'border-primary scale-125 shadow-xl rotate-3' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full transition-all duration-500 hover:scale-125 hover:rotate-6"
                    />
                  </button>
                ))}
              </div>
              
              {/* Video Play Button */}
              <div className="absolute top-4 right-4">
                <button className="group/btn bg-white/80 backdrop-blur-sm p-3 rounded-full text-primary hover:bg-white transition-all duration-500 hover:scale-125 hover:shadow-xl hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-500 group-hover/btn:scale-125" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-2xl"></div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className={`w-full lg:w-1/2 lg:pl-10 transition-all duration-1000 transform ${
            isInfoVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div>
              <h2 className="text-4xl font-bold mb-6">CoolAir X1000</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Experience unparalleled comfort and efficiency with our state-of-the-art Air Conditioning Unit. 
                Engineered with the latest technology, our air conditioner ensures optimal cooling while 
                maintaining energy efficiency.
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Choose Capacity</h3>
                <div className="flex flex-wrap gap-3">
                  {capacities.map((capacity) => (
                    <button
                      key={capacity}
                      onClick={() => setSelectedCapacity(capacity)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:rotate-1 ${
                        selectedCapacity === capacity
                          ? 'bg-primary text-white shadow-xl scale-110 rotate-1'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8 transition-all duration-500 hover:bg-gray-100 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary">$899.99</span>
                  <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">In Stock</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Free shipping on all orders over $50. 30-day return policy.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/50 hover:scale-105">
                    <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all duration-500 hover:bg-primary hover:text-white hover:scale-110">
                      -
                    </button>
                    <span className="px-6 py-3">1</span>
                    <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all duration-500 hover:bg-primary hover:text-white hover:scale-110">
                      +
                    </button>
                  </div>
                  
                  <button className="group flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-500 font-medium transform hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden">
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <svg className="w-5 h-5 transition-all duration-500 group-hover:rotate-45 group-hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 text-sm text-gray-600">
                {[
                  'Energy Star Certified for efficiency',
                  'Smart Wi-Fi enabled for remote control',
                  'Ultra-quiet operation at just 22dB'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start group cursor-pointer transition-all duration-500 hover:transform hover:translate-x-3 hover:scale-105">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:text-green-600 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="transition-all duration-500 group-hover:text-gray-800 group-hover:font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
