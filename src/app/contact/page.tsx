"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOfficeVisible, setIsOfficeVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Stagger the form and office animations
    const formTimer = setTimeout(() => setIsFormVisible(true), 300);
    const officeTimer = setTimeout(() => setIsOfficeVisible(true), 600);
    
    return () => {
      clearTimeout(formTimer);
      clearTimeout(officeTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Send to backend PostgreSQL database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for your message! We will get back to you soon.'
        });
        
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background/11.webp"
            alt="Contact background"
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
                Our Service
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Get In Touch
              </h1>
              <nav className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Home
                </Link>
                <span>/</span>
                <span className="text-blue-300">Contact Us</span>
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
            <svg className="w-8 h-8 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`max-w-2xl transition-all duration-1000 transform ${
                isFormVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please fill out the form below with your details and message, and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Message */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] hover:shadow-md focus:shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] hover:shadow-md focus:shadow-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] hover:shadow-md focus:shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] hover:shadow-md focus:shadow-lg resize-vertical"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isSubmitting ? 'bg-blue-400' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Office Information */}
            <div className="lg:col-span-1">
              <div className={`bg-gray-50 rounded-2xl overflow-hidden transition-all duration-1000 transform hover:shadow-xl hover:-translate-y-2 ${
                isOfficeVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <h3 className="text-xl font-bold mb-6 p-6 pb-0">Our Office</h3>
                
                {/* Office Image */}
                <div className="relative h-48 mx-6 mb-6 rounded-lg overflow-hidden group">
                  <Image
                    src="/images/background/19.webp"
                    alt="Office building"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white font-semibold transition-all duration-300 group-hover:translate-y-[-4px]">
                    Mon - Fri 08:00 - 18:00
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-6">
                  {/* Office Location */}
                  <div className="flex items-start space-x-3 group hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300 p-3 rounded-lg hover:-translate-y-1">
                    <div className="w-5 h-5 mt-1 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Location</h4>
                      <p className="text-gray-600">100 S Main St, New York, NY</p>
                    </div>
                  </div>

                  {/* Send Message */}
                  <div className="flex items-start space-x-3 group hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300 p-3 rounded-lg hover:-translate-y-1">
                    <div className="w-5 h-5 mt-1 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Send a Message</h4>
                      <a href="mailto:contact@coolair.com" className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105">
                        contact@coolair.com
                      </a>
                    </div>
                  </div>

                  {/* Call Directly */}
                  <div className="flex items-start space-x-3 group hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300 p-3 rounded-lg hover:-translate-y-1">
                    <div className="w-5 h-5 mt-1 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Call Us Directly</h4>
                      <a href="tel:+929-333-9296" className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105 font-mono">
                        +929 333 9296
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
