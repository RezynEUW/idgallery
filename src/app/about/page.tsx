// src/app/about/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRan = useRef(false);
  
  useEffect(() => {
    if (containerRef.current && !animationRan.current) {
      const sections = containerRef.current.querySelectorAll('.animate-section');
      
      gsap.from(sections, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      animationRan.current = true;
    }
  }, []);
  
  return (
    <div ref={containerRef} className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About Civilingenjör Interaktion och Design</h1>
      
      <div className="animate-section bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Programme Information</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Interaction Design and Engineering programme at Umeå University combines technical 
          expertise with design skills to create graduates who excel at creating user-centered 
          digital products and services.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Students in the programme develop expertise in both technical implementation and 
          design methodology, allowing them to bridge the gap between design and development.
        </p>
      </div>
      
      <div className="animate-section bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">About This Portfolio Showcase</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This platform showcases the work of students from the Interaction Design and Engineering 
          programme, highlighting their skills in design and development.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          The showcase features work from students in classes ID01 through ID24, giving visitors 
          a glimpse into the innovative projects and skills developed throughout the programme.
        </p>
      </div>
    </div>
  );
}