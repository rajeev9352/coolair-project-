"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Stagger the projects animation
    const projectsTimer = setTimeout(() => setIsProjectsVisible(true), 600);
    
    return () => {
      clearTimeout(projectsTimer);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Home HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/1.jpg",
      link: "#"
    },
    {
      id: 2,
      title: "Office HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/2.jpg",
      link: "#"
    },
    {
      id: 3,
      title: "Shop HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/3.jpg",
      link: "#"
    },
    {
      id: 4,
      title: "Healthcare HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/4.jpg",
      link: "#"
    },
    {
      id: 5,
      title: "Restaurant HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/5.jpg",
      link: "#"
    },
    {
      id: 6,
      title: "School HVAC Solution",
      location: "New York, USA",
      image: "/images/projects/6.jpg",
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background/11.webp"
            alt="Projects background"
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
                Our Projects
              </h1>
              <nav className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link href="/" className="hover:text-blue-300 transition-colors duration-300 hover:scale-105">
                  Home
                </Link>
                <span>/</span>
                <span className="text-blue-300">Projects</span>
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
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`text-center group transition-all duration-700 transform ${
                  isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 150}ms` }}
              >
                <Link href={project.link} className="block group">
                  <div className="relative overflow-hidden rounded-3xl mb-6 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Overlay with Plus Icon */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 z-10 flex items-center justify-center">
                      <div className="transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {project.location}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
