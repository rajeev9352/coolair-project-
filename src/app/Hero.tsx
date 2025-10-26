'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const imageTimer = setTimeout(() => setIsImageVisible(true), 600);
    return () => clearTimeout(imageTimer);
  }, []);

  return (
    <section className="relative overflow-hidden h-100 h-[120vh] flex items-center justify-center">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 bg-cover bg-center">
        {/* Background Image */}
        <Image
          src="/images/background/19.webp"
          alt="Cool Air Background"
          fill
          className="object-cover mb-20"
          priority
        />

        {/* Sky Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-sky-900 to-sky-900 opacity-50 mix-blend-overlay"></div>
      </div>
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content */}
      <div className="container relative z-10 py-32">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-lg font-medium text-white bg-primary/20 px-4 py-1.5 rounded-full">
                CoolAir X1000
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stay Cool, Stay Comfortable
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Engineered for modern living, it combines powerful performance, energy efficiency, and smart technology.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="#section-intro" 
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-500 ease-out rounded-full"></div>
              </a>
              <a 
                href="#" 
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border-2 border-transparent hover:border-primary/20"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Buy Now
                </span>
                {/* Pulse effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Product Image */}
        <div className={`mt-20 text-center transition-all duration-1000 transform ${
          isImageVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="relative inline-block group cursor-pointer">
            <Image
              src="/images/misc/15.webp"
              alt="CoolAir X1000"
              width={800}
              height={600}
              className="max-w-full h-auto transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-2xl group-hover:shadow-primary/20"
              priority
            />

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-8 -left-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-500 group-hover:bg-white/30 group-hover:scale-125 group-hover:rotate-45 cursor-pointer"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              whileHover={{ scale: 1.3, rotate: 90 }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-400/20 rounded-full transition-all duration-500 group-hover:bg-yellow-400/60 group-hover:scale-150 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              whileHover={{ scale: 1.8, rotate: -45 }}
            />
            <motion.div 
              className="absolute top-1/2 -right-8 w-8 h-8 bg-primary/20 rounded-full transition-all duration-500 group-hover:bg-primary/40 group-hover:scale-150 cursor-pointer"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              whileHover={{ scale: 2, rotate: 180 }}
            />
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl transform scale-110 group-hover:scale-125"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
