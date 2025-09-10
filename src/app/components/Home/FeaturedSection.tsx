'use client';

import React, { useState, useEffect, useRef } from 'react';

// TypeScript interfaces
export interface Brand {
  name: string;
  logo: string;
  description: string;
}

export interface Quote {
  text: string;
  type: 'partnership' | 'testimonial' | 'achievement';
  icon?: string;
  details?: string;
}

export interface FeaturedSectionProps {
  heading: string;
  imageSrc: string;
  brands: Brand[];
  quotes: Quote[];
}

export const EnhancedFeaturedSection: React.FC<FeaturedSectionProps> = ({
  heading,
  imageSrc,
  brands,
  quotes
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [hoveredQuote, setHoveredQuote] = useState<number | null>(null);
  const [flippedQuote, setFlippedQuote] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      const sections = ['hero', 'brands', 'achievements'];
      const sectionHeight = window.innerHeight / sections.length;
      const currentSection = Math.floor(scrollY / sectionHeight);
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 200,
        y: (e.clientY - window.innerHeight / 2) / 200
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AwardIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  const TrophyIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
      <path d="M9 8H15V10H9V8ZM9 12H13V14H9V12Z"/>
    </svg>
  );

  // Enhanced brand logos with actual company data
  const defaultBrands = brands.length ? brands : [
    { 
      name: "Microsoft", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23 23'%3E%3Cpath fill='%23f3f3f3' d='M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z'/%3E%3C/svg%3E", 
      description: "Cloud & Enterprise Solutions" 
    },
    { 
      name: "Google", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E", 
      description: "Search & AI Technology" 
    },
    { 
      name: "Meta", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%231877F2' d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E", 
      description: "VR & Social Innovation" 
    },
    { 
      name: "Amazon", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF9900' d='M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.143.615-4.777.615-3.457 0-6.695-.735-9.726-2.203-1.62-.785-3.14-1.813-4.56-3.088-.244-.22-.224-.42.076-.593z'/%3E%3Cpath fill='%23FF9900' d='M18.78 16.2c-.36-.43-.97-.64-1.82-.64-.47 0-.92.15-1.35.45-.43.3-.64.67-.64 1.1 0 .52.2.94.6 1.24.4.3.95.45 1.65.45.76 0 1.38-.22 1.85-.65.48-.43.72-.98.72-1.64v-.35zm2.5-7.4c0 1.07-.23 1.96-.68 2.68-.44.72-1.1 1.23-1.98 1.53l2.14 2.5c.16.18.24.37.24.58 0 .2-.08.38-.24.54-.16.17-.35.25-.58.25-.18 0-.37-.08-.56-.25l-2.3-2.69c-.42.12-.87.18-1.34.18-1.61 0-2.89-.45-3.84-1.34-.95-.9-1.43-2.1-1.43-3.61s.47-2.68 1.4-3.55c.93-.87 2.2-1.3 3.8-1.3 1.61 0 2.89.43 3.84 1.28.95.85 1.43 2.03 1.43 3.55z'/%3E%3C/svg%3E", 
      description: "Cloud Computing Leader" 
    },
    { 
      name: "Apple", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'/%3E%3C/svg%3E", 
      description: "Consumer Technology" 
    },
    { 
      name: "NVIDIA", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2376B900' d='M12.1 2.1C6.4 2.1 1.8 6.7 1.8 12.4s4.6 10.3 10.3 10.3 10.3-4.6 10.3-10.3S17.8 2.1 12.1 2.1zm4.8 7.8l-2.8 4.8c-.3.5-.8.8-1.4.8s-1.1-.3-1.4-.8L8.5 9.9c-.3-.5-.3-1.1 0-1.6s.8-.8 1.4-.8h5.6c.6 0 1.1.3 1.4.8s.3 1.1 0 1.6z'/%3E%3C/svg%3E", 
      description: "AI & Graphics Computing" 
    },
    { 
      name: "Tesla", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23E31937' d='M12 0L3.26 7.83l2.57 3.09L12 4.06l6.17 6.86 2.57-3.09L12 0zM7.83 12l2.57 3.09L12 13.94v8.06l8.74-9.17-2.57-3.09L12 16.06l-6.17-6.86L7.83 12z'/%3E%3C/svg%3E", 
      description: "Electric Vehicles & Energy" 
    },
    { 
      name: "Adobe", 
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF0000' d='M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z'/%3E%3C/svg%3E", 
      description: "Creative Software Solutions" 
    }
  ];

  const defaultQuotes = quotes.length ? quotes : [
    {
      text: "Revolutionary partnership delivering next-gen immersive experiences that transform how people interact with technology",
      type: 'partnership' as const,
      details: "Strategic collaboration with Ministry of Technology for nationwide digital transformation, impacting over 10 million users across 50+ cities with cutting-edge AR/VR solutions."
    },
    {
      text: "Outstanding innovation in AR/VR solutions. Exceptional 5-star excellence in user experience and technical implementation!",
      type: 'testimonial' as const,
      details: "Recognized by industry leaders for breakthrough achievements in immersive technology, receiving the 'Innovation Excellence Award' from the Global Tech Council for three consecutive years."
    },
    {
      text: "Award-winning immersive solutions provider since 2016, continuously pushing boundaries toward infinity and beyond!",
      type: 'achievement' as const,
      details: "Multiple international awards including 'Best VR Solution 2023', 'Innovation Pioneer Award', and recognition from UNESCO for educational technology advancement."
    }
  ];

  return (
    <div className="relative">
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmerGreen {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(64, 237, 112, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(64, 237, 112, 0.6);
          }
        }
        
        .animate-float { animation: gentleFloat 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(64, 237, 112, 0.4), transparent);
          background-size: 200px 100%;
          animation: shimmerGreen 2s infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
        .delay-700 { animation-delay: 0.7s; opacity: 0; }
        .delay-800 { animation-delay: 0.8s; opacity: 0; }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-3d:hover {
          transform: translateY(-12px) rotateX(5deg) rotateY(5deg);
        }
        
        .glass-card {
          background: rgba(30, 30, 30, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(64, 237, 112, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          background: rgba(30, 30, 30, 0.8);
          border-color: rgba(64, 237, 112, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .brand-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .brand-hover:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 35px rgba(64, 237, 112, 0.25);
        }
        
        .achievement-card {
          transition: all 0.4s ease;
          cursor: pointer;
        }
        
        .achievement-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }
        
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .tooltip {
          position: absolute;
          z-index: 1000;
          transition: all 0.3s ease;
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(64, 237, 112, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(64, 237, 112, 0.2) 0%, transparent 50%)
            `
          }} />
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(64, 237, 112, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 237, 112, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Progress Indicator */}
        <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 space-y-3">
          {['Hero', 'Partners', 'Awards'].map((section, index) => (
            <div key={section} className="group relative">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeSection >= index 
                    ? 'bg-green-400 scale-125 animate-pulse-glow' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {section}
              </div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-24">
            <div
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
                  {heading || "EXCELLENCE"}
                </span>
              </h1>
              
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <AwardIcon/>
                <div className="h-px w-32 bg-gradient-to-l from-transparent via-green-400 to-transparent"></div>
              </div>
              
              <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Pioneering Excellence in Immersive Technology Solutions
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            {/* Enhanced Image Section */}
            <div
              className={`relative ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              }}
            >
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/50 to-green-600/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                {/* Main image container */}
                <div className="relative glass-card rounded-3xl overflow-hidden">
                  <img
                    src={imageSrc || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"}
                    alt="Featured content"
                    className="w-full h-96 md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Enhanced overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    {/* IGNITE Program Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="glass-card px-4 py-3 rounded-full">
                        <div className="flex items-center space-x-2">
                          <TrophyIcon/>
                          <span className="text-white font-semibold text-sm">IGNITE Program</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-white font-bold text-2xl mb-3">Excellence in Innovation</h3>
                        <p className="text-gray-200 text-base leading-relaxed">
                          Transforming industries through cutting-edge technology solutions and immersive experiences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Brands Section */}
            <div className={`${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Trusted Partners
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">Industry leaders who trust our expertise</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {defaultBrands.map((brand, index) => (
                  <div
                    key={brand.name}
                    className={`relative brand-hover glass-card rounded-2xl p-6 h-28 flex items-center justify-center cursor-pointer group animate-scale-in delay-${(index + 1) * 100}`}
                    onMouseEnter={() => setHoveredBrand(brand.name)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    {/* Brand Logo */}
                    <div className="text-center w-full">
                      {brand.logo.startsWith('data:') ? (
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="w-12 h-12 mx-auto mb-2 transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {brand.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-white font-medium text-sm group-hover:text-green-400 transition-colors duration-300">
                        {brand.name}
                      </div>
                    </div>
                    
                    {/* Enhanced Tooltip - Fixed positioning */}
                    {hoveredBrand === brand.name && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50">
                        <div className="bg-gray-900 border border-green-400/30 px-4 py-3 rounded-xl shadow-2xl animate-fade-in-up">
                          <div className="text-white font-semibold text-sm mb-1">{brand.name}</div>
                          <div className="text-green-400 text-xs">{brand.description}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Achievements Section */}
     <div
  className={`${isVisible ? 'animate-fade-in-up delay-500 ease-out duration-700' : 'opacity-0'}`}
  role="region"
  aria-label="Our Achievements Section"
>
  <div className="text-center mb-16 px-4 md:px-0">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
      <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Our Achievements
      </span>
    </h2>
    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
      Recognition and partnerships that define our success
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 md:px-0">
    {defaultQuotes.map((quote, index) => (
      <div
        key={index}
        tabIndex={0}
        role="button"
        aria-pressed={flippedQuote === index}
        aria-label={`Achievement card: ${quote.text}`}
        className={`flip-card h-80 animate-scale-in delay-${(index + 6) * 100} cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg`}
        onMouseEnter={() => setHoveredQuote(index)}
        onMouseLeave={() => setHoveredQuote(null)}
        onClick={() => setFlippedQuote(flippedQuote === index ? null : index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlippedQuote(flippedQuote === index ? null : index);
          }
        }}
      >
        <div className={`flip-card-inner ${flippedQuote === index ? 'flipped' : ''}`}>
          {/* Front of card */}
          <div className="flip-card-front rounded-lg overflow-hidden">
            <div
              className={`glass-card h-full p-8 achievement-card transition-border duration-300 ${
                hoveredQuote === index ? 'border-green-400/70' : 'border-transparent'
              } border-2 rounded-lg flex flex-col justify-center text-center space-y-6`}
            >
              {/* Icon Section */}
              <div className="flex justify-center mb-4 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 animate-pulse delay-${i * 100}`}
                    style={{ color: `rgb(${255 - i * 30}, ${204 - i * 20}, 0)` }} // Gradient from light yellow (#FFFF00) to darker yellow (#CC9900)
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <div className="flex-1 flex items-center">
                <p className="text-white text-lg leading-relaxed font-medium select-text">
                  {quote.text}
                </p>
              </div>

              {/* Action Hint */}
              <div className="text-green-400 text-sm font-medium flex items-center justify-center space-x-2 select-none">
                <span>Click to learn more</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="flip-card-back rounded-lg overflow-hidden">
            <div className="glass-card h-full p-8 border-green-400/40 border-2 rounded-lg flex flex-col justify-center text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-green-400 font-bold text-2xl select-none">Details</h3>

              <p className="text-white text-base leading-relaxed flex-1 flex items-center select-text">
                {quote.details}
              </p>

              <div className="text-gray-400 text-sm font-medium flex items-center justify-center space-x-2 select-none">
                <span>Click to go back</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

        {/* Enhanced Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-2xl z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 animate-float group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>
    </div>
  );
};

// Demo component with sample data
export default function App() {
  const sampleData = {
    heading: "EXCELLENCE",
    imageSrc: "/images/img2.png",
    brands: [],
    quotes: []
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <EnhancedFeaturedSection {...sampleData} />
    </div>
  );
}