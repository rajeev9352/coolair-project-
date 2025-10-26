"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'AeroChill',
    image: '/images/products/1.webp',
    badge: { text: 'Best Seller', color: 'bg-blue-600' },
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  },
  {
    id: 2,
    name: 'ClimaComfort',
    image: '/images/products/2.webp',
    badge: { text: '20% OFF', color: 'bg-red-600' },
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  },
  {
    id: 3,
    name: 'AeroChill',
    image: '/images/products/3.webp',
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  },
  {
    id: 4,
    name: 'FrostWave',
    image: '/images/products/4.webp',
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  },
  {
    id: 5,
    name: 'ZephyrCool',
    image: '/images/products/5.webp',
    badge: { text: 'Best Seller', color: 'bg-blue-600' },
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  },
  {
    id: 6,
    name: 'PolarAir',
    image: '/images/products/6.webp',
    badge: { text: '20% OFF', color: 'bg-red-600' },
    description: 'Non ullamco magna qui non dolore sit ut proident quis ad ex nisi in esse sed occaecat dolore consectetur tempor nostrud sit laboris in nostrud sed cillum mollit irure excepteur nulla magna cupidatat magna officia eiusmod dolore.'
  }
];

export default function AllProductsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isProductsVisible, setIsProductsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Stagger the products animation
    const productsTimer = setTimeout(() => setIsProductsVisible(true), 600);
    
    return () => {
      clearTimeout(productsTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background/11.webp"
            alt="Products background"
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
                Discover
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Products
              </h1>
              <nav className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Home
                </Link>
                <span>/</span>
                <span className="text-blue-300">Products</span>
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
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c0-1.1-.9-2-2-2s-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${
            isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`group bg-gray-100 rounded-lg overflow-hidden relative hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 ${
                  isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${800 + index * 150}ms`
                }}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  <h4 className="text-xl font-bold mb-4 text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">{product.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center group/btn transform hover:scale-105 w-fit">
                    <span className="flex items-center gap-2">
                      View Details
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
                
                {/* Product Content */}
                <div className="text-center py-6 relative z-10">
                  {/* Product Badge */}
                  {product.badge && (
                    <div className={`absolute top-4 right-4 ${product.badge.color} text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {product.badge.text}
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain mx-auto w-4/5 h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Product Name */}
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h4>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-lg transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* Spacer */}
          <div className="h-20"></div>
        </div>
      </section>

      {/* Product Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 transform ${
              isProductsVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`} style={{ transitionDelay: '1400ms' }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Powerful Cooling, Smart Savings – Comfort All Year Round!
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Experience unparalleled comfort and efficiency with our state-of-the-art Air Conditioning Unit. 
                Engineered with the latest technology, our air conditioner ensures optimal cooling while maintaining 
                energy efficiency. Perfect for both residential and commercial spaces, it offers a seamless blend 
                of performance, durability, and sleek design.
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Choose Capacity</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['1 PK', '2 PK', '3 PK'].map((capacity, index) => (
                    <button
                      key={capacity}
                      className={`bg-gray-100 hover:bg-blue-50 hover:border-blue-300 text-gray-800 hover:text-blue-600 text-center py-4 lg:py-6 px-4 rounded-lg border-2 border-transparent font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
                        isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${1600 + index * 100}ms` }}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`mb-12 transition-all duration-1000 transform ${
            isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '1800ms' }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '/images/products/icons/bulb.png',
                title: 'Energy Saving',
                description: 'Designed to consume minimal power, reducing your electricity bills without compromising performance.'
              },
              {
                icon: '/images/products/icons/silence.png',
                title: 'Quiet Operation',
                description: 'Operates at a low noise level, ensuring a peaceful environment for work or rest.'
              },
              {
                icon: '/images/products/icons/wifi.png',
                title: 'Smart Wi-Fi',
                description: 'Allows users to control the AC remotely using a smartphone app or voice assistants like Alexa.'
              },
              {
                icon: '/images/products/icons/speedometer.png',
                title: 'Turbo Cooling',
                description: 'Instant cooling by operating the AC at maximum capacity for a short period, Cools the room quickly.'
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center group transition-all duration-700 transform hover:-translate-y-2 hover:shadow-lg bg-white p-6 rounded-lg ${
                  isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${2000 + index * 150}ms` }}
              >
                <div className="mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section 1 */}
      <section className="relative overflow-hidden bg-gray-100">
        <div className="container-fluid relative">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-64 lg:h-96">
              <Image
                src="/images/misc/11.webp"
                alt="Air conditioning comfort"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
              <div className={`max-w-lg transition-all duration-1000 transform ${
                isProductsVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`} style={{ transitionDelay: '2200ms' }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed">
                  Stay cool and comfortable year-round with energy-efficient, smart air conditioning designed 
                  for ultimate performance, reliability, and effortless climate control.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`mb-12 transition-all duration-1000 transform ${
            isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '2400ms' }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Specifications</h2>
          </div>
          
          <div className="max-w-4xl">
            <div className="space-y-4">
              {[
                {
                  title: 'Cooling Performance',
                  items: [
                    'Cooling Capacity: 18,000 BTU/h',
                    'Cooling Area Coverage: Up to 180 sq. ft.',
                    'Compressor Type: Rotary/Inverter',
                    'Cooling Technology: Fast Cooling, Turbo Mode'
                  ]
                },
                {
                  title: 'Power & Energy Efficiency',
                  items: [
                    'Power Supply: 220-240V, 50Hz',
                    'Rated Power Input: 1500W',
                    'Energy Efficiency Ratio (EER): 3.5',
                    'Star Rating: 5-Star (BEE Certified)',
                    'Annual Power Consumption: 1200 kWh'
                  ]
                },
                {
                  title: 'Dimensions & Weight',
                  items: [
                    'Indoor Unit Dimensions (WxHxD): 900 x 300 x 220 mm',
                    'Outdoor Unit Dimensions (WxHxD): 850 x 550 x 300 mm',
                    'Weight (Indoor/Outdoor): 12 kg / 35 kg'
                  ]
                },
                {
                  title: 'Additional Information',
                  items: [
                    'Warranty: 1 Year on Product, 10 Years on Compressor',
                    'Included Accessories: Remote, Installation Kit, User Manual',
                    'Country of Manufacture: Japan/China/India'
                  ]
                }
              ].map((spec, index) => {
                const [isOpen, setIsOpen] = useState(index === 0);
                
                return (
                  <div
                    key={spec.title}
                    className={`border border-gray-200 rounded-lg transition-all duration-700 transform ${
                      isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${2600 + index * 100}ms` }}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full text-left p-6 font-semibold text-lg text-gray-900 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      {spec.title}
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <ul className="space-y-2">
                          {spec.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-600 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Image Section 2 */}
      <section className="relative overflow-hidden bg-gray-100">
        <div className="container-fluid relative">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
              <div className={`max-w-lg transition-all duration-1000 transform ${
                isProductsVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`} style={{ transitionDelay: '2800ms' }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed">
                  Bringing happiness and comfort to every customer with top-tier air conditioning solutions 
                  designed for ultimate cooling satisfaction.
                </h3>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-64 lg:h-96 order-1 lg:order-2">
              <Image
                src="/images/misc/10.webp"
                alt="Customer satisfaction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Reviews Header */}
            <div className="lg:col-span-12">
              <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-8 transition-all duration-1000 transform ${
                isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '1400ms' }}>
                Reviews
              </h2>
            </div>

            {/* Rating Bars */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {[
                  { stars: '5 stars', value: 50, count: 50 },
                  { stars: '4 stars', value: 70, count: 70 },
                  { stars: '3 stars', value: 30, count: 30 },
                  { stars: '2 stars', value: 10, count: 10 },
                  { stars: '1 star', value: 20, count: 20 }
                ].map((rating, index) => (
                  <div key={rating.stars} className={`flex items-center gap-4 transition-all duration-700 transform ${
                    isProductsVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`} style={{ transitionDelay: `${1600 + index * 100}ms` }}>
                    <div className="w-16 text-sm text-gray-600">{rating.stars}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isProductsVisible ? `${rating.value}%` : '0%',
                          transitionDelay: `${1800 + index * 100}ms`
                        }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-gray-600">{rating.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="lg:col-span-6">
              <div className={`flex items-start gap-4 transition-all duration-1000 transform ${
                isProductsVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`} style={{ transitionDelay: '1600ms' }}>
                <div className="text-6xl font-bold text-gray-900">7.5</div>
                <div className="pt-2">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">180 reviews</div>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="lg:col-span-12 mt-8">
              <div className="space-y-6">
                {[
                  {
                    avatar: '/images/testimonial/1.jpg',
                    rating: 5,
                    title: 'Excellent product!',
                    review: 'This AC is powerful, quiet, and smart—perfect for anyone who wants cooling with convenience. Highly recommend!',
                    author: 'John Smith'
                  },
                  {
                    avatar: '/images/testimonial/2.jpg',
                    rating: 4,
                    title: 'Powerful, quiet, and smart AC!',
                    review: 'I love this air conditioner! It cools fast, runs quietly, and saves energy. The Wi-Fi control is super handy, letting me adjust settings from my phone.',
                    author: 'Chantell Bastic'
                  },
                  {
                    avatar: '/images/testimonial/3.jpg',
                    rating: 3,
                    title: 'It could be better!',
                    review: 'It cools quickly, runs quietly, and saves energy, making it a solid upgrade from my old AC.',
                    author: 'Leopoldo Amis'
                  }
                ].map((review, index) => (
                  <div key={review.author} className={`flex gap-4 p-6 bg-gray-50 rounded-lg transition-all duration-700 transform hover:shadow-md hover:-translate-y-1 ${
                    isProductsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`} style={{ transitionDelay: `${2000 + index * 150}ms` }}>
                    <div className="flex-shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={70}
                        height={70}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600 mb-2 leading-relaxed">{review.review}</p>
                      <div className="text-sm font-semibold text-gray-800">{review.author}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}