'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Energy Saving',
    description: 'Designed to consume minimal power, reducing your electricity bills without compromising performance.',
    image: '/images/misc/s1.webp',
    bgColor: 'bg-primary',
  },
  {
    id: 2,
    title: 'Quiet Operation',
    description: 'Operates at a low noise level, ensuring a peaceful environment for work or rest.',
    image: '/images/misc/s2.webp',
    bgColor: 'bg-primary',
  },
  {
    id: 3,
    title: 'Smart Wi-Fi',
    description: 'Allows users to control the AC remotely using a smartphone app or voice assistants like Alexa.',
    image: '/images/misc/s3.webp',
    bgColor: 'bg-secondary',
  },
  {
    id: 4,
    title: 'Turbo Cooling',
    description: 'Instant cooling by operating the AC at maximum capacity for a short period, Cools the room quickly.',
    image: '/images/misc/s4.webp',
    bgColor: 'bg-secondary',
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const statsTimer = setTimeout(() => setIsStatsVisible(true), 800);
    return () => clearTimeout(statsTimer);
  }, []);

  return (
    <section id="section-intro" className=" bg-gray-50 ">
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 ">

          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`group relative overflow-hidden ${feature.bgColor} text-white transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] cursor-pointer transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-4 left-4 text-2xl font-bold opacity-20 transition-all duration-500 group-hover:opacity-60 group-hover:scale-125 group-hover:rotate-12">
                0{feature.id}
              </div>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-500 group-hover:transform group-hover:translate-x-3">
                  <h3 className="text-2xl font-bold mb-4 transition-all duration-500 group-hover:scale-110 group-hover:text-yellow-100">{feature.title}</h3>
                  <p className="opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:transform group-hover:translate-x-2">{feature.description}</p>
                </div>
                
                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-115 group-hover:rotate-2"
                  />
                  {/* Overlay effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
              
              <motion.div 
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/25 group-hover:scale-125 group-hover:rotate-45 cursor-pointer"
                whileHover={{ scale: 1.3, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-1000 transform ${
          isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '50+', label: 'Expert Team' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-2"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-primary mb-2 transition-all duration-500 group-hover:scale-125 group-hover:text-secondary group-hover:drop-shadow-lg">{stat.number}</div>
              <p className="text-gray-600 transition-all duration-500 group-hover:text-gray-800 group-hover:transform group-hover:-translate-y-1 group-hover:font-medium">{stat.label}</p>
              {/* Pulse effect */}
              <div className="w-16 h-1 bg-primary/20 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:w-24 group-hover:h-1.5 group-hover:shadow-lg"></div>
            </div>
          ))}
        </div>
      
    </section>
  );
}
