'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

// Dynamically import components with no SSR
const Hero = dynamic(() => import('@/app/Hero'), { ssr: false });
const Features = dynamic(() => import('@/app/Features'), { ssr: false });
const WhyChooseUs = dynamic(() => import('@/app/WhyChooseUs'), { ssr: false });
const ProductShowcase = dynamic(() => import('@/app/ProductShowcase'), { ssr: false });
const Specifications = dynamic(() => import('@/app/Specifications'), { ssr: false });

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>      
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" >
          <Hero />
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50">
          <Features />
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us">
          <WhyChooseUs />
        </section>

        {/* Product Showcase */}
        <section id="products" className="bg-gray-50">
          <ProductShowcase />
        </section>

        {/* Specifications */}
        <section id="specifications">
          <Specifications />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn('up', 0.2)}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Experience the Future of Cooling?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust CoolAir for their cooling needs. 
                Get in touch with us today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="#contact" 
                  className="bg-white text-primary font-medium px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Get a Free Quote
                </a>
                <a 
                  href="tel:+11234567890" 
                  className="bg-transparent border-2 border-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
                >
                  Call Us Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>      
    </Suspense>
  );
}