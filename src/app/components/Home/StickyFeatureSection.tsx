'use client'
import React, { useState, useEffect, useRef } from 'react';

// --- Data for the feature cards ---
const features = [
  {
    title: "Real Estate",
    description: "Hyperlink indexes and tracks your local files and folders in real time. Every update is searchable immediately. Integrations with Google Drive and OneDrive coming soon.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#connect-files-locally"
  },
  {
    title: "Events & Entertainment",
    description: "Every answer includes clickable citations, instantly revealing the original source alongside full context. Trust AI answer by verifying insights directly.",
    imageUrl: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#trace-every-ai-answer"
  },
  {
    title: "Education & Training",
    description: "Target specific projects or documents effortlessly using @folder and @document. Seamlessly switch context within your workflow for pinpoint accuracy.",
    imageUrl: "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#focus-searches-precisely"
  },
  {
    title: "Healthcare",
    description: "Hyperlink transforms text from images into searchable insights. Your visual references—screenshots, photos, and visual notes—become fully accessible.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#search-text-within-images"
  },{
    title: "Defense & Security",
    description: "Hyperlink transforms text from images into searchable insights. Your visual references—screenshots, photos, and visual notes—become fully accessible.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#search-text-within-images"
  },{
    title: "Tourism & Hospitality",
    description: "Hyperlink transforms text from images into searchable insights. Your visual references—screenshots, photos, and visual notes—become fully accessible.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq2cwHPJu1C3cOIsDLBUmo20YzzRqEJCoFw&s",
    link: "#search-text-within-images"
  },{
    title: "Marketing & Ad Creative",
    description: "Hyperlink transforms text from images into searchable insights. Your visual references—screenshots, photos, and visual notes—become fully accessible.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#search-text-within-images"
  },
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

// --- Header Component ---
const AnimatedHeader = () => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();

    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
                ref={headerRef}
                className={`text-4xl md:text-5xl font-bold transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                    transformStyle: 'preserve-3d',
                    color: '#141414'
                }}
            >
               Industries We Serve

            </h2>
            <p 
                ref={pRef}
                className={`text-lg mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                    transformStyle: 'preserve-3d',
                    color: '#666666'
                }}
            >
              We have a proven track record of delivering transformative projects across a range of key industries.

            </p>
        </div>
    );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection() {
  return (
    <div className="font-sans" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="px-[5%]">
            <div className="max-w-7xl mx-auto">
                <section className="py-24 md:p flex flex-col items-center">
                    
                    <AnimatedHeader />

                    <div className="w-full">
                        {features.map((feature, index) => (
                            <a
                                key={index}
                                href={feature.link}
                                className="block mb-16 sticky transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                style={{ top: '200px' }}
                            >
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl cursor-pointer"
                                    style={{ 
                                        backgroundColor: index % 2 === 0 ? '#40ED70' : '#141414',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div className="flex flex-col justify-center">
                                        <h3 
                                            className="text-2xl md:text-3xl font-bold mb-4"
                                            style={{ 
                                                color: index % 2 === 0 ? '#141414' : '#ffffff'
                                            }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p 
                                            className="text-base leading-relaxed"
                                            style={{ 
                                                color: index % 2 === 0 ? '#333333' : '#e0e0e0'
                                            }}
                                        >
                                            {feature.description}
                                        </p>
                                        <div className="mt-4 flex items-center">
                                            <span 
                                                className="text-sm font-medium mr-2"
                                                style={{ 
                                                    color: index % 2 === 0 ? '#141414' : '#40ED70'
                                                }}
                                            >
                                                Learn more
                                            </span>
                                            <svg 
                                                className="w-4 h-4" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                                style={{ 
                                                    color: index % 2 === 0 ? '#141414' : '#40ED70'
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="image-wrapper mt-8 md:mt-0">
                                        <img 
                                            src={feature.imageUrl} 
                                            alt={feature.title}
                                            loading="lazy"
                                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                                            onError={(e) => { 
                                                e.target.onerror = null; 
                                                e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; 
                                            }}
                                        />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
}