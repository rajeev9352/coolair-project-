'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaWifi, FaSnowflake, FaShieldAlt, FaRobot, FaTools } from 'react-icons/fa';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCTAVisible, setIsCTAVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const ctaTimer = setTimeout(() => setIsCTAVisible(true), 1000);
    return () => clearTimeout(ctaTimer);
  }, []);

  const features = [
    {
      icon: <FaSnowflake className="text-4xl mb-4 text-primary" />,
      title: 'Smart Schedules',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    },
    {
      icon: <FaTools className="text-4xl mb-4 text-secondary" />,
      title: 'Self-Cleaning System',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    },
    {
      icon: <FaShieldAlt className="text-4xl mb-4 text-primary" />,
      title: 'Child Lock Safety',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    },
    {
      icon: <FaWifi className="text-4xl mb-4 text-secondary" />,
      title: 'Voice Control',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    },
    {
      icon: <FaRobot className="text-4xl mb-4 text-primary" />,
      title: 'Auto Diagnostic System',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    },
    {
      icon: <FaCheck className="text-4xl mb-4 text-secondary" />,
      title: 'Adaptive Sleep Mode',
      description: 'Trust us to deliver reliable solutions and exceptional service, and peace of mind for your HVAC needs.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b gray-50">  
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Why Choose CoolAir</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 group cursor-pointer ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className="inline-block p-4 bg-gray-50 rounded-full transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-125 group-hover:rotate-12">
                  <div className="transition-all duration-500 group-hover:scale-125">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3 transition-all duration-500 group-hover:text-primary group-hover:transform group-hover:-translate-y-1">{feature.title}</h3>
                <p className="text-gray-600 transition-all duration-500 group-hover:text-gray-800">{feature.description}</p>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-10 text-center text-white relative overflow-hidden transition-all duration-1000 transform hover:scale-[1.02] hover:shadow-2xl group ${
          isCTAVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/background/20.webp')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6 transition-all duration-500 group-hover:scale-105">Ready to experience the future of cooling?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto transition-all duration-500 group-hover:transform group-hover:translate-y-1">Join thousands of satisfied customers who trust CoolAir for their cooling needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group/btn">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out rounded-full"></div>
              </button>
              <button className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:shadow-xl">
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
