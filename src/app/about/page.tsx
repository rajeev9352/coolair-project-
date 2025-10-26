"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const [isValuesVisible, setIsValuesVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Stagger the content animations
    const contentTimer = setTimeout(() => setIsContentVisible(true), 300);
    const statsTimer = setTimeout(() => setIsStatsVisible(true), 600);
    const teamTimer = setTimeout(() => setIsTeamVisible(true), 900);
    const valuesTimer = setTimeout(() => setIsValuesVisible(true), 1200);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(statsTimer);
      clearTimeout(teamTimer);
      clearTimeout(valuesTimer);
    };
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience", icon: "⭐" },
    { number: "500+", label: "Projects Completed", icon: "🏢" },
    { number: "24/7", label: "Emergency Service", icon: "🚨" },
    { number: "100%", label: "Customer Satisfaction", icon: "😊" }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Dinesh Smith",
      position: "CEO & Founder",
      image: "/images/team/dinesh.jpg",
      // image: "/images/team/1.webp",
      experience: "20+ years"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Operations Manager",
      image: "/images/team/2.webp",
      experience: "15+ years"
    },
    {
      id: 3,
      name: "Rajeev Davis",
      position: "Lead Technician",
      
      image: "/images/team/rajeev.jpg",
      experience: "15+ years"
    },
    {
      id: 4,
      name: "Lisa Wilson",
      position: "Customer Service",
      image: "/images/team/4.webp",
      experience: "8+ years"
    }
  ];

  const values = [
    {
      title: "Quality Service",
      description: "We deliver top-notch HVAC solutions with attention to detail and commitment to excellence.",
      icon: "🎯"
    },
    {
      title: "Customer First",
      description: "Your comfort and satisfaction are our primary goals. We listen, understand, and deliver.",
      icon: "❤️"
    },
    {
      title: "Innovation",
      description: "We stay ahead with the latest technology and energy-efficient solutions for modern homes.",
      icon: "💡"
    },
    {
      title: "Reliability",
      description: "Count on us for timely service, transparent pricing, and long-lasting HVAC solutions.",
      icon: "🛡️"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background/11.webp"
            alt="About us background"
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
                Learn More
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                About Us
              </h1>
              <nav className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Home
                </Link>
                <span>/</span>
                <span className="text-blue-300">About Us</span>
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
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 transform ${
            isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Your Comfort is Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For over 15 years, CoolAir has been the trusted choice for residential and commercial HVAC solutions in New York. We specialize in providing top-quality heating, ventilation, and air conditioning services that ensure your comfort year-round.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our skilled technicians are dedicated to delivering reliable solutions that enhance your comfort and satisfaction. From emergency repairs to complete system installations, we handle every project with precision and care.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We pride ourselves on using cutting-edge technology and energy-efficient solutions that not only keep you comfortable but also help reduce your energy costs. Your satisfaction is our primary goal, and we work tirelessly to exceed your expectations.
              </p>
            </div>
            <div className="relative group">
              <Image
                src="/images/misc/handy-man.webp"
                alt="HVAC technician at work"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 rounded-xl ${
                  isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are committed to delivering exceptional HVAC services with expertise and care.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white rounded-2xl overflow-hidden ${
                  isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {member.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and ensure we deliver the best possible service to our customers.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            isValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center group hover:bg-white hover:shadow-lg hover:scale-105 hover:-translate-y-2 transition-all duration-500 p-8 rounded-xl ${
                  isValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${1000 + index * 150}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
            isValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Experience Superior HVAC Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us today for a free consultation and let us help you create the perfect indoor climate for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center gap-2 justify-center">
                  Get Free Quote
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <a
                href="tel:+929-333-9296"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
